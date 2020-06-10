"use strict";

const { Router } = require("express");
const placeRouter = new Router();
const routeGuard = require("../middleware/route-guard");

const axios = require("axios");

const Place = require("./../models/place");

// placeRouter.get("/:id", (req, res, next) => {
//   const { id } = req.params;
//   Place.findById(id).then((place) => {
//     res.json({ place });
//   });
// });

placeRouter.get("/search", (req, res, next) => {
  const { city } = req.query;
  let results;
  let places;
  let googleMapsPlaceIds;
  let detail;
  console.log(city);
  // Make the call to open map api
  const openTripKey = process.env.OPEN_TRIP_MAP_API_KEY;
  const googlePlaceKey = process.env.GOOGLE_PLACES_API_KEY;
  axios
    .get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${openTripKey}`)
    .then((response) => {
      //response from maps api>>>>>
      const data = response.data;
      console.log(data);
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
      //console.log(response.data);
      const data = response.data;
      results = data.results;
      googleMapsPlaceIds = results.map((result) => result.id);
      console.log("googleplaces ID", googleMapsPlaceIds);
      return Place.find({ placeId: googleMapsPlaceIds });
    })
    .then((documents) => {
      //If this result do not exist in our database we will request this info from google api
      places = documents;
      //console.log(results)

      const filteredResults = results.filter((result) => {
        // console.log(!documents.filter((document) => document.placeId === result.id).length);
        return !documents.filter((document) => document.placeId === result.id).length;
      });

      // console.log("documents >>>>>", documents);
      // console.log("filter  >>>>>>>>>>>>>>>>>", filteredResults);
      // console.log("places length >>>>>>>>>>>>>>>>>", places.length);
      // console.log("results length >>>>>>>>>>>>>>>>>", results.length);
      // console.log("filter length >>>>>>>>>>>>>>>>>", filteredResults.length);

      // Now we are saving photo as string, we can use virtuals to solve it
      const formatedResults = filteredResults.map((result) => {
        let photo;

        if (result.photos) {
          const reference = result.photos[0].photo_reference.toString();
          photo = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=`;
        }
        return {
          placeId: result.id,
          name: result.name,
          detail: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${result.id}&key=`,
          photo: photo,
          rating: result.rating
        };
      });
      // console.log("formated", formatedResults);
      return Place.create(formatedResults);
    })
    .then((newlyCreatedPlaces) => {
      // console.log("new places", newlyCreatedPlaces);
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

module.exports = placeRouter;
