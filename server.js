const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const passport = require('passport');

const CONFIG = require('./config');

const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');

require('./passport');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://localhost/leafy');

app.get('/', function (req, res) {
  res.json({
    message: "Express is up!"
  });
});
app.use('/auth', authRouter);
app.use('/api', passport.authenticate('jwt', {
  session: false
}), apiRouter);

app.listen(CONFIG.port, () => {
  console.log(`Server listening on port ${CONFIG.port}!`);
  console.log(`Running in ${process.env.NODE_ENV} mode`);
});