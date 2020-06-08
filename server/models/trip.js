"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  allDays: [
    {
      dayPlan: [
        {
          type: String // id from Places
        }
      ]
    }
  ]
});

module.exports = mongoose.model("Trip", schema);
