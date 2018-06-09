const RelaisFactory = process.env.NODE_ENV === 'production' ? require('./../services/RelaisFactory') : require('./../tests/services/RelaisFactory');
const pump = RelaisFactory(27);

const pumpController = {
  start: function (req, res, next) {
    pump.on().then(() => {
      res.json({
        data: 'pump started'
      });
    }, (err) => {
      //
    });
  },
  stop: function (req, res, next) {
    pump.off().then(() => {
      res.json({
        data: 'pump stopped'
      });
    }, (err) => {
      //
    });
  },
  water: function (req, res, next) {
    const duration = 10000;
    pump.for(duration).then(() => {
      res.json({
        data: {
          watering: duration,
        },
      });
    }, (err) => {
      pump.off().then(() => {
        res.json({
          data: 'pump stopped'
        });
      }, (err) => {
        //
      });
    });
  },
}
module.exports = pumpController;