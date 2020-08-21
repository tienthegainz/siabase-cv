import React, { memo, useContext, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { FaCloudUploadAlt } from 'react-icons/fa';

import { toast } from 'react-toastify';

import ModalContext from '../../contexts/ModalContext';
import { useSelector, useDispatch } from '../../contexts/ResumeContext';

import BaseModal from '../BaseModal';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';

const SkynetUploadModal = () => {
  const state = useSelector();
  const {
    id,
    skynet: { isSyncedWithSkynet, skylink }
  } = state;

  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { emitter, events } = useContext(ModalContext);

  const dispatch = useDispatch();

  useEffect(() => {
    const unbind = emitter.on(events.SKYNET_UPLOAD_MODAL, () => setOpen(true));

    return () => unbind();
  }, [emitter, events]);

  const uploadingToast = useRef(null);

  const notifyUploadingToast = () => {
    uploadingToast.current = toast('Uploading...', { autoClose: false });
  };

  const closeUploadingToast = () => {
    toast.dismiss(uploadingToast.current);
  };

  const handleOpenLink = () => {
    if (typeof window !== 'undefined') {
      window && window.open(skylink);
    }
  };

  const handleUpload = async type => {
    setIsUploading(true);
    notifyUploadingToast();

    try {
      setTimeout(
        () =>
          toast.dark(
            'This process takes a while. Feel free play around with our app while waiting'
          ),
        3000
      );

      const response = await fetch(
        `${process.env.SERVER_HOST}/uploadToSkynet`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id, type })
        }
      );

      const { message, skylink: newSkylink } = await response.json();

      if (newSkylink)
        dispatch({
          type: 'on_upload_to_skynet',
          payload: {
            skylink: `https://siasky.net/${newSkylink}`
          }
        });

      if (message) {
        toast(message);
        closeUploadingToast();
      }
    } catch (error) {
      if (error) throw error;

      toast.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <BaseModal
      hideActions
      state={[open, setOpen]}
      title={t('modals.skynetUpload.heading')}
    >
      <div>
        <p className='leading-loose'>
          {t('modals.skynetUpload.text')}
          <br />
          <a href='https://siasky.net/' target='_blank' rel='noreferrer'>
            {t('modals.skynetUpload.learnMore')}
          </a>
        </p>

        <hr className='my-8' />

        {skylink && (
          <div>
            <h5 className='text-xl font-semibold mb-4'>
              {t('modals.skynetUpload.yourResumeOnSkynet')}
            </h5>

            <div>
              <Input type='action' value={skylink} onClick={handleOpenLink} />
            </div>
          </div>
        )}

        {isSyncedWithSkynet ? (
          <p className='leading-loose'>{t('modals.skynetUpload.isSynced')}</p>
        ) : (
          <div>
            <p className='leading-loose'>
              {t('modals.skynetUpload.isNotSynced')}
            </p>
            <Button
              icon={FaCloudUploadAlt}
              className='mt-5'
              isLoading={isUploading}
              onClick={() => handleUpload('single')}
            >
              {t('modals.skynetUpload.button')}
            </Button>
          </div>
        )}
      </div>
    </BaseModal>
  );
};

export default memo(SkynetUploadModal);
