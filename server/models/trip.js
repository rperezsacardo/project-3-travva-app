"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  userId: {
    type: String //mongoose.Schema.Types.ObjectId,
    // ref: "User"
  },

  allDays: [
    {
      dayPlan: [
        // {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: "Place" //
        // }
      ]
    }
  ]
});

module.exports = mongoose.model("Trip", schema);
