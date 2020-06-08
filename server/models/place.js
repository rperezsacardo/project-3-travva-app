"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  photo: {
    type: String
  },
  placeId: {
    type: String
  },
});

module.exports = mongoose.model("Place", schema);
