"use strict";

const { Router } = require("express");
const tripRouter = new Router();
const routeGuard = require("./../middleware/route-guard");
const mongoose = require("mongoose");

const Trip = require("./../models/trip");
const Place = require("./../models/place");

tripRouter.get("/:id", (req, res, next) => {
  res.json({ type: "success", data: { title: "Show All trips" } });
  //find by id >>>
});

tripRouter.get("/:id/:tripId/new", (req, res, next) => {
  const { id, tripId } = req.params;
  //console.log(req.params);
  Trip.findById(tripId) // Find this trip MongoDb
    .then((result) => {
      const newDayToAdd = [{ dayPlan: [] }]; // Create a new day Array and Obj
      let updateDays;
      if (result.allDays) {
        // Check it if the Trip already have day, if true spread both(new days and the already created)
        updateDays = [...result.allDays, ...newDayToAdd];
      } else {
        //else create
        updateDays = [...newDayToAdd];
      }
      // console.log("trip founded", updateDays);
      const ResultId = result._id;
      return Trip.findOneAndUpdate({ _id: ResultId }, { allDays: updateDays }, { new: true });
    })
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

tripRouter.get("/:id/:tripId/", (req, res, next) => {
  const { id, tripId } = req.params;
  //console.log(req.params);
  Trip.findById(tripId) // Find this trip MongoDb
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

tripRouter.get("/private", routeGuard, (req, res, next) => {
  res.json({});
});

//View / Edit day

tripRouter.get("/:id/:tripId/:day", (req, res, next) => {
  // show one day from trip
  const { id, tripId, day } = req.params;

  Trip.findById(tripId) // Find this trip MongoDb
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

tripRouter.post("/:id/:tripId/:day/", (req, res, next) => {
  // show one day from trip
  const { id, day } = req.params;
  //console.log(typeof tripId);
  const { placeId, tripId } = req.body;
  console.log(req.body);

  res.json({ placeId });
  // const convertedId = mongoose.Types.ObjectId(placeId);

  // console.log(placeId);
  // console.log("type of", typeof tripId);
  // Trip.findById(tripId) // Find this trip MongoDb
  //   .then((result) => {
  //     console.log("here", result);
  //     return Place.findById(placeId);
  //   })
  //   .then((place) => {
  //     console.log("place", place);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     next(error);
  //   });
});

tripRouter.delete("/:id/:tripId/:day", (req, res, next) => {
  // show one day from trip
  console.log("working");
  const { id, tripId } = req.params;
  res.redirect(`/user/${id}/${tripId}`);
});

module.exports = tripRouter;
