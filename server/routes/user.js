"use strict";

const { Router } = require("express");
const userRouter = new Router();
const routeGuard = require("./../middleware/route-guard");
const Trip = require("./../models/trip");

userRouter.get("/:id", routeGuard, (req, res, next) => {
  const id = req.params.id;
  Trip.find({ userId: id })
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => next(error));
});

userRouter.post("/:id", routeGuard, (req, res, next) => {
  //Show all trips from user
  const { id } = req.params;
  Trip.create({
    name: "My New Trip",
    userId: id,
    allDays: []
  })
    .then((trip) => {
      res.json({ trip });
    })
    .catch((error) => next(error));
});

userRouter.get("/:id/:tripId", routeGuard, (req, res) => {
  res.json({ type: "success", data: { title: "One trip" } });
});

userRouter.get("/private", routeGuard, (req, res) => {
  res.json({});
});

userRouter.get("/:id/:tripId/:day/:place", (req, res) => {
  // Show place from google api

  res.json({ type: "success", data: { title: "Show Place from API" } });
});

module.exports = userRouter;
