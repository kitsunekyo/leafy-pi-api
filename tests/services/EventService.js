const Event = require('./../models/Event');

const EventService = {
    create: (body) => {
      return new Promise((resolve, reject) => {
        Event.create(
          {
            level: body.level,
            event: body.event,
            note: body.note,
            timestamp: new Date()
          },
          (error, probe) => {
            if (error) {
              reject('Could not create Event');
            }
            resolve(probe);
          }
        );
      });
    }
};
module.exports = EventService;
