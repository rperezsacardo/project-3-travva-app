import axios from "axios";

const basePlace = axios.create({
  baseURL: "api/place"
});

const getAllPlacesFromApi = (term) => {
  //console.log(`term: ${term}`); error here <<
  return (
    basePlace
      //.get(`/search`, { query: { city: term } })
      .get("/search?city=lisbon")
      .then((result) => {
        const places = result.data;
        return Promise.resolve(places);
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      })
  );
};
export { getAllPlacesFromApi };
