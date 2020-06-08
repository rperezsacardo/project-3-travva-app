import axios from "axios";

const baseUser = axios.create({
  baseURL: "/api/user"
});

const getUser = () => {
  return baseUser.get("/:id");
};

const getTrips = () => {
  return baseUser.get("/:id/:trips");
};

export { getUser, getTrips };

// const getAllPlacesFromApi = (lat, lon, radius, type) => {
//   axios.get(
//     `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}types=${type}&name=harbour&key=${GOOGLE_PLACES_API_KEY}`
//   );
// };
