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
    let duration = 10000;
    if (req.query.duration) {
      try {
        const queryDuration = parseInt(req.query.duration);
        if (Number.isInteger(queryDuration)) {
          duration = queryDuration;
        } else {
          console.log('duration value is not a number, using default');
        }
      } catch (e) {
        console.log('queryDuration couldnt be parsed');
      }
    }

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