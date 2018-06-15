const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const CONFIG = require('./config');

const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');

require('./passport');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Access Control Middleware
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors({
  origin: true,
  credentials: true,
}));

mongoose.connect('mongodb://localhost/leafy');

app.get('/', function (req, res) {
  res.json({
    message: 'Express is up!',
  });
});
app.use('/auth', authRouter);
app.use(
  '/api',
  passport.authenticate('jwt', {
    session: false,
  }),
  apiRouter
);

app.listen(CONFIG.port, () => {
  console.log(`Server listening on port ${CONFIG.port}!`);
  console.log(`Running in ${process.env.NODE_ENV} mode`);
});