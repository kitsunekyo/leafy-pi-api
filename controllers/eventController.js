const Event = require('./../models/Event');
const EventService = require('./../services/EventService');

const eventController = {
  index: function (req, res, next) {
    Event.paginate({}, {
        page: req.query.page || 1,
        limit: 10,
        lean: true,
        sort: {
          timestamp: -1,
        },
      })
      .then(response => {
        res.json(response);
      });
  },
  add: function (req, res, next) {
    EventService.create(req.body).then((probe) => {
      res.status(200).json(probe);
    }, (err) => {
      res.status(400).send(err);
    });
  },
};

module.exports = eventController;