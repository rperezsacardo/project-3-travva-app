import axios from "axios";

const basePlace = axios.create({
  baseURL: "/api/place"
});

const getAllPlacesFromApi = (term) => {
  return basePlace
    .get(`/search?city=${term}`)
    .then((result) => {
      const places = result.data;
      return Promise.resolve(places);
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

const getPlaceInformation = (body) => {
  return basePlace
    .post(`/single-place`, body)
    .then((result) => {
      const place = result.data.placeInfo;
      const placeDocument = result.data.placeDocument;
      return Promise.resolve({ place, placeDocument });
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};
export { getAllPlacesFromApi, getPlaceInformation };
