"use strict";

const { Router } = require("express");
const tripRouter = new Router();
const routeGuard = require("./../middleware/route-guard");

const Trip = require("./../models/trip");

tripRouter.get("/:id", (req, res, next) => {
  res.json({ type: "success", data: { title: "Show All trips" } });
  //find by id >>>
});

tripRouter.get("/:id/:tripId/new", (req, res, next) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  const { id, tripId } = req.params;
  //console.log(req.params);
  Trip.findById(tripId) // Find this trip MongoDb
    .then((result) => {
      console.log(result.allDays);
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
      console.log("new", result);
      res.json({ result });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

tripRouter.get("/:id/:tripId/", (req, res, next) => {
  console.log(" old >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
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

module.exports = tripRouter;
