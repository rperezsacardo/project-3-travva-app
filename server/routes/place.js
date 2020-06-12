"use strict";

const { Router } = require("express");
const placeRouter = new Router();
const routeGuard = require("../middleware/route-guard");

const axios = require("axios");

const Place = require("./../models/place");
const googlePlaceKey = process.env.GOOGLE_PLACES_API_KEY;
const openTripKey = process.env.OPEN_TRIP_MAP_API_KEY;

placeRouter.get("/search", routeGuard, (req, res, next) => {
  const { city } = req.query;
  let results;
  let places;
  let googleMapsPlaceIds;
  // Make the call to open map api

  axios
    .get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${openTripKey}`)
    .then((response) => {
      const data = response.data;
      const latitude = data.lat;
      const longitude = data.lon;
      //  Search at google api>>>>>>
      const radius = 15000;
      const type = "tourist_attraction";
      const lang = "en";
      return axios.get(
        // `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&types=${type}&name=harbour&key=${googlePlaceKey}`
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${city}&radius=${radius}&language=${lang}&types=${type}&key=${googlePlaceKey}`
      );
    })
    .then((response) => {
      //Find in our database this placeID

      const data = response.data;
      results = data.results;
      console.log(results[0].place_id);
      googleMapsPlaceIds = results.map((result) => result.place_id);
      console.log(googleMapsPlaceIds);
      return Place.find({ placeId: googleMapsPlaceIds });
    })
    .then((documents) => {
      //If this result do not exist in our database we will request this info from google api
      places = documents;

      const filteredResults = results.filter((result) => {
        return !documents.filter((document) => document.placeId === result.place_id).length;
      });

      // Now we are saving photo as string, we can use virtuals to solve it
      const formatedResults = filteredResults.map((result) => {
        let photo;

        if (result.photos) {
          const maxwidth = 1400;
          const reference = result.photos[0].photo_reference.toString();
          photo = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photoreference=${reference}&key=`;
        }
        return {
          placeId: result.place_id,
          name: result.name,
          detail: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${result.place_id}&key=`,
          photo: photo,
          rating: result.rating
        };
      });
      return Place.create(formatedResults);
    })
    .then((newlyCreatedPlaces) => {
      if (newlyCreatedPlaces) {
        res.json({
          places: [...places, ...newlyCreatedPlaces]
        });
      } else {
        res.json({
          places: [...places]
        });
      }
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

placeRouter.post("/single-place", (req, res, next) => {
  const { placeId } = req.body;

  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${googlePlaceKey}`
    )

    .then((document) => {
      const placeInfo = document.data.result;

      return Place.findOne({ placeId: placeId }).then((placeDocument) => {
        res.json({ placeInfo, placeDocument });
      });
    })
    .catch((error) => next(error));
});

module.exports = placeRouter;
