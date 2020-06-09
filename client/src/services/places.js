import axios from "axios";

const basePlace = axios.create({
  baseURL: "/api/place"
});

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
export { getAllPlacesFromApi };
