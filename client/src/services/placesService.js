import axios from "axios";

const basePlace = axios.create({
  baseURL: "http://localhost:3010/api/place/"
});
const baseUser = axios.create({
  baseURL: "http://localhost:3010/api/user/"
});

const getUser = () => {
  return baseUser
    .get("/:id")
    .then((result) => {
      console.log(result);
      const user = result.data;
      return Promise.resolve(user);
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

const getTrips = () => {
  return baseUser
    .get("/:id/:trips")
    .then((result) => {
      console.log(result);
      const trips = result.data;
      return Promise.resolve(trips);
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

const getAllPlacesFromApi = (term) => {
  basePlace
    .get(`/search?city=${term}`)
    .then((result) => {
      console.log(result);
      const places = result.data;
      return Promise.resolve(places);
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};
export { getUser, getTrips, getAllPlacesFromApi };
