const User = require('./../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwt_secret = require('./../config').jwt_secret;

const authController = {
  login(req, res, next) {
    passport.authenticate('local', {
        session: false
      }, (err, user, info) => {
        console.log(err);
        if (err || !user) {
          return res.status(400).json({
            message: info ? info.message : 'Login failed',
            user: user
          });
        }

        req.login(user, {
          session: false
        }, (err) => {
          if (err) {
            res.send(err);
          }

          const token = jwt.sign(user, jwt_secret);

          return res.json({
            user,
            token
          });
        });
      })
      (req, res, next);
  },

  logout(req, res, next) {},
}

module.exports = authController;