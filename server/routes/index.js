const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
var skynet = require('@nebulous/skynet');

const upload = multer({ dest: 'uploads/' });

const { api, getPdfFromPage } = require('../helper');

const environment = process.env.NODE_ENV || 'development';

const BASE_URL =
  environment === 'development' ? process.env.DEV_CLIENT_HOST : process.env.PROD_CLIENT_HOST;

router.get('/checkNBDomainNameConnection', async (req, res) => {
  const { domain } = req.body;

  try {
    const response = await api('GET', `/api/v0/dns/domains/${domain}`, null);

    res.json(response);
  } catch (error) {
    if (error) throw error;

    res.status(500).json(error);
  }
});

router.post('/mapNBDomainNameToSkylink', async (req, res) => {
  const { skylink, domain } = req.body;

  try {
    const body = `{"records": [{ "type": "TXT", "host": "", "value":"${skylink}","ttl": 0 }] }`;

    const response = await api('PUT', `/api/v0/dns/domains/${domain}`, body);

    res.json(response);
  } catch (error) {
    if (error) throw error;

    res.status(500).json(error);
  }
});

// Upload avatar
router.post('/avatar', upload.single('avatar'), async (req, res) => {
  // MULTER process and assign FILE object to req
  const processedFile = req.file || {};

  // Uploaded file's original name
  let orgName = processedFile.originalname || '';
  orgName = orgName.trim().replace(/ /g, '-');

  // Full path of uploaded file on server
  const fullPathInServer = processedFile.path;

  // Add orignal file extension, as multer name the file without extension by default
  const newFullPath = `${fullPathInServer}.${orgName.split('.').slice(1).pop() || ''}`;

  try {
    fs.renameSync(fullPathInServer, newFullPath);

    let skylink = await skynet.uploadFile(`./${newFullPath}`);

    skylink = skylink.toString().slice(6);

    res.json({
      status: true,
      message: 'Photo uploaded successfully.',
      skylink
    });
  } catch (error) {
    if (error) throw error;

    res.status(500).json(error);
  } finally {
    fs.unlink(`./${newFullPath}`, error => {
      if (error) {
        res.status(500).json(error);

        throw error;
      }
    });
  }
});

router.post('/exportPdf', async (req, res) => {
  const { id, type } = req.body;

  if (!id)
    return res.status(400).json({
      error: 'Invalid argument: The API must be called with argument "id" containing the resume ID.'
    });

  if (!type)
    return res.status(400).json({
      error:
        'Invalid argument: The function must be called with argument "type" containing the type of resume.'
    });

  try {
    const pdf = await getPdfFromPage(`${BASE_URL}/r/${id}`, type);

    res.json({ b64EncodedData: Buffer.from(pdf).toString('base64') });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/uploadToSkynet', async (req, res) => {
  const { id, type } = req.body;

  if (!id)
    return res.status(400).json({
      error: 'Invalid argument: The API must be called with argument "id" containing the resume ID.'
    });

  if (!type)
    return res.status(400).json({
      error:
        'Invalid argument: The function must be called with argument "type" containing the type of resume.'
    });

  try {
    // File location on server
    const path = `./uploads/SiabaseCV-${id}.pdf`;

    await getPdfFromPage(`${BASE_URL}/r/${id}`, type, path);

    let skylink = await skynet.uploadFile(path);

    fs.unlink(path, error => {
      if (error) throw error;
    });

    skylink = skylink.toString().slice(6);

    res.json({
      status: true,
      message: 'Resume uploaded successfully.',
      skylink
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
