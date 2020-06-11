"use strict";

const { Router } = require("express");
const tripRouter = new Router();
const routeGuard = require("./../middleware/route-guard");
const mongoose = require("mongoose");

const Trip = require("./../models/trip");
const Place = require("./../models/place");

tripRouter.delete("/delete/", (req, res, next) => {
  const { tripId } = req.body;

  console.log("Delete trip", tripId);

  Trip.findOneAndDelete(tripId)
    .then((result) => {
      res.json({ type: "trip Deleted", data: { title: tripId } });
      console.log(result);
    })
    .catch((error) => next(error));
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

tripRouter.post("/new-place", (req, res, next) => {
  const { placeId, tripId, day } = req.body;
  const dayIndex = Number(day) - 1;

  let trip, place, dayArray;
  Trip.findOne({ _id: tripId }) // Find this trip MongoDb
    .then((result) => {
      trip = result;

      return Place.findOne({ placeId });
    })
    .then((placeResult) => {
      place = placeResult;
      dayArray = trip.allDays[dayIndex].dayPlan;
      dayArray.push(place);
      const newAllDays = [...trip.allDays];
      newAllDays[dayIndex].dayPlan = dayArray;

      return Trip.findOneAndUpdate({ _id: tripId }, { allDays: newAllDays }, { new: true });
    })
    .then((result) => {
      console.log(result);
      res.json({ result });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

tripRouter.post("/remove-place", (req, res, next) => {
  const { placeId, tripId, day } = req.body;
  const dayIndex = Number(day) - 1;
  // console.log("here", req.body);

  let trip, place, dayArray;
  Trip.findOne({ _id: tripId }) // Find this trip MongoDb
    .then((result) => {
      trip = result;
      console.log("second result", result);
      dayArray = trip.allDays[dayIndex].dayPlan;
      const newAllDays = [...trip.allDays];
      const updateDayArray = dayArray.filter((item) => !(item.placeId === placeId));
      newAllDays[dayIndex].dayPlan = updateDayArray;
      return Trip.findOneAndUpdate({ _id: tripId }, { allDays: newAllDays }, { new: true });
    })
    .then((result) => {
      console.log(result);
      res.json({ result });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

tripRouter.post("/update-name", (req, res, next) => {
  const { tripId, tripName } = req.body;

  console.log("here", tripId);

  Trip.findOneAndUpdate({ _id: tripId }, { name: tripName }, { new: true }) // Find this trip MongoDb
    .then((result) => {
      console.log("second result", result);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

module.exports = tripRouter;
