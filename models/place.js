const mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
  nickname: String,
  name: String,
  latitude: Number,
  longitude: Number,
});

const placeModel = mongoose.model("places", placeSchema);

module.exports = placeModel;
