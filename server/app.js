const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();

const port = process.env.PORT || 5000;

// Handshake login
const route = require('./routes');

// Set up CORS to allow us to accept requests from our client
app.use(cors());

app.use(
  require('express-session')({
    secret: 'keybroad cat',
    resave: false,
    saveUninitialized: false
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser());

// Route
app.use('/', route);

// Clean up `uploads` directory
if (fs.existsSync('uploads/')) fs.rmdirSync('uploads/', { recursive: true });
fs.mkdir('uploads/', { recursive: false }, error => {
  if (error) throw error;
});

app.listen(port, error => {
  if (error) throw error;

  console.log(`Server is running on port ${port}.`);
});

module.exports = app;
