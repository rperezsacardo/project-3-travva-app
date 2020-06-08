'use strict';

const { Router } = require('express');
const userRouter = new Router();
const routeGuard = require('./../middleware/route-guard');

userRouter.get('/', (req, res, next) => {
  res.json({ type: 'success', data: { title: 'User Profile' } });
});

userRouter.get('/private', routeGuard, (req, res, next) => {
  res.json({});
});

module.exports = userRouter;