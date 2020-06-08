"use strict";

const { Router } = require("express");
const placeRouter = new Router();
const routeGuard = require("../middleware/route-guard");

const axios = require('axios');

const Place = require('./../models/place');

placeRouter.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Place.findById(id).then((place) => {
    res.json({ place });
  });
});

// /api/place/search?city=

placeRouter.get("/search", routeGuard, (req, res, next) => {
  const { city } = req.query;
  let results;
  let places;
  // Make the call to open map api
  const OPEN_TRIP_MAP_API_KEY = '5ae2e3f221c38a28845f05b6d03c9789d9979a9e53e1cbbe709efa34';
  const GOOGLE_PLACES_API_KEY = '';
  axios.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${OPEN_TRIP_MAP_API_KEY}`)
    .then(response => {
      const data = response.data;
      const latitude = data.lat;
      const longitude = data.lon;
      const radius = 5000;
      const type = 'food';
      return axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}types=${type}&name=harbour&key=${GOOGLE_PLACES_API_KEY}`
      );
    })
    .then(response => {
      const data = response.data;
      results = data.results;
      const googleMapsPlaceIds = results.map(result => result.id);
      return Place.find({ placeId: googleMapsPlaceIds });
    })
    .then(documents => {
      places = documents;
      const filteredResults = results.filter(result => {
        return !places.exists(place => place.placeId === result.id);
      });
      const formatedResults = filteredResults.map(result => {
        let photo;
        if (result.photos.length) {
          const reference = result.photos[0].photo_reference;
          photo = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=${GOOGLE_PLACES_API_KEY}`;
        }
        return ({
          placeId: result.id,
          name: result.name,
          photo
        });
      });
      return Place.create(formatedResults);
    })
    .then(newlyCreatedPlaces => {
      res.json({
        places: [
          ...places,
          ...newlyCreatedPlaces
        ]
      });
    })
    .catch (error => {
      console.log(error);
      next(error);
    });
});

module.exports = placeRouter;
