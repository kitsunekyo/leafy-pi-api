const mongoose = require('mongoose');

const probe = new mongoose.Schema({
  air_temperature: {
    type: Number,
  },
  air_humidity: {
    type: Number,
  },
  soil_status: {
    type: String
  },
  soil_raw_data: {
    type: Number
  },
  timestamp: {
    type: Date
  }
}, {
  collection: 'probes'
});

module.exports = mongoose.model('Probe', probe);
