const User = require('./../models/User');

const userController = {
  getProfile(req, res, next) {
    res.json({
      user: req.user
    });
  },
  create(req, res, next) {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      const user = new User({
        email,
        password
      });
      user.save((err) => {
        if (err) {
          res.json({
            error: err.message,
            data: null,
          }, 500);
        } else {
          res.json({
            data: `user ${user.email} created`
          });
        }
      });
    }
  },
  delete(req, res, next) {
    if (req.body._id) {
      const id = req.body._id;
      User.findByIdAndRemove({
        '_id': id
      }).then((data) => {
        if (!data) {
          res.json({
            error: `user _id ${id} not found`,
            data: null,
          });
        } else {
          res.json({
            data: `user _id ${id} deleted`,
          });
        }
      }, (err) => {
        res.json({
          error: err.message,
          data: null,
        }, 500);
      });
    }
  },
}

module.exports = userController;