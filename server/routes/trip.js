"use strict";

const { Router } = require("express");
const tripRouter = new Router();
const routeGuard = require("./../middleware/route-guard");

tripRouter.get("/:id", (req, res, next) => {
  res.json({ type: "success", data: { title: "Show All trips" } });
  //find by id >>>
});

tripRouter.get("/private", routeGuard, (req, res, next) => {
  res.json({});
});

module.exports = tripRouter;
