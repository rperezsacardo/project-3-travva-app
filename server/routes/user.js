"use strict";

const { Router } = require("express");
const userRouter = new Router();
const routeGuard = require("./../middleware/route-guard");
const User = require("./../models/user");
const Trip = require("./../models/trip");

userRouter.get("/:id", (req, res, next) => {
  //Show all trips from user
  const { id } = req.params;
  Trip.find({ userId: id })
    .then((result) => res.json({ result }))
    .catch((error) => next(error));
});

userRouter.post("/:id", (req, res, next) => {
  //Show all trips from user
  const { id } = req.params;
  Trip.create({
    name: "My New Trip",
    userId: id,
    allDays: []
  })
    .then((trip) => res.json({ trip }))
    .catch((error) => next(error));
});

userRouter.get("/:id/:tripId", (req, res, next) => {
  //Show one trip from user

  res.json({ type: "success", data: { title: "One trip" } });
});

userRouter.get("/private", routeGuard, (req, res, next) => {
  res.json({});
});

//------------------------------------------------------------------
//View / Edit day

userRouter.get("/:id/:tripId/:day", (req, res, next) => {
  // show one day from trip
  const { id, tripId, day } = req.params;
  console.log(id, tripId, day);
  res.json({ type: "success", data: { title: "Day n" } });
});
userRouter.post("/:id/:tripId/:day", (req, res, next) => {
  // show one day from trip
  const { id, tripId, day } = req.params;

  console.log(id, tripId, day);

  res.redirect(`/user/${id}/${tripId}/${day}`);
});

userRouter.delete("/:id/:tripId/:day", (req, res, next) => {
  // show one day from trip
  const { id, tripId } = req.params;
  res.redirect(`/user/${id}/${tripId}`);
});

//------------------------------------------------------------------

//Edit a Trip

userRouter.get("/:id/:tripId/edit", (req, res, next) => {
  //get edit trip info
  res.json({ type: "success", data: { title: "edit trip" } });
});

userRouter.delete("/:id/:tripId/edit", (req, res, next) => {
  //delete trip

  const { id, tripId } = req.params;
  res.redirect(`/user/${id}/${tripId}`);
});
userRouter.patch("/:id/:trip_id/edit", (req, res, next) => {
  //edit trip info
});

userRouter.post("/:id/:tripId/edit/:day", (req, res, next) => {
  // Slice this day from the array obj, then returns to edit page (mapping again).
  // day 3 => 2, day 4 => 3, day 5 => 4...

  const { id, tripId, day } = req.params;

  res.redirect(`/user/${id}/${tripId}/edit`);
});
//------------------------------------------------------------------

userRouter.get("/:id/:tripId/:day/:place", (req, res, next) => {
  // Show place from google api

  res.json({ type: "success", data: { title: "Show Place from API" } });
});

module.exports = userRouter;
