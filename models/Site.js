const mongoose = require('mongoose');

const siteInfoSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  gps: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    altitude: {
      type: Number,
      required: true,
    },
    precision: {
      type: Number,
      required: true,
    }
  },
  _gps_latitude: {
    type: Number,
    required: true,
  },
  _gps_longitude: {
    type: Number,
    required: true,
  },
  _gps_altitude: {
    type: Number,
    required: true,
  },
  _gps_precision: {
    type: Number,
    required: true,
  }
});

const Site = mongoose.model('Site', siteInfoSchema);

module.exports = Site;
