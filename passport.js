const passport = require('passport');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcrypt');

const jwt_secret = require('./config').jwt_secret;

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const User = require('./models/User');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function(email, password, cb) {
      User.findOne({
        email: email,
      })
        .then(user => {
          if (!user) {
            return cb(false, false, {
              message: 'Incorrect email or password.',
            });
          }
          bcrypt.compare(password, user.password).then(
            result => {
              console.log('success');
              return cb(
                null,
                {
                  _id: user._id,
                  email,
                },
                {
                  message: 'Logged In Successfully',
                }
              );
            },
            err => {
              console.log('wrong');
              return cb(true, false, {
                message: 'something went wrong',
              });
            }
          );
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwt_secret,
    },
    function(jwtPayload, cb) {
      return User.findById(jwtPayload._id)
        .then(user => {
          return cb(null, {
            _id: user._id,
            email: user.email,
          });
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);
