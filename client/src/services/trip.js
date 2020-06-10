import axios from "axios";

const baseApi = axios.create({
  baseURL: "/api"
});

const getSingleTrip = (body) => {
  const { user, tripID } = body;
  return baseApi
    .get(`/user/${user}/${tripID}/`)
    .then((result) => {
      console.log("service >>>>", result.data);
      const trip = result.data;
      return Promise.resolve(trip);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const createTrip = (id) => {
  // const { id } = body;
  return baseApi
    .post(`/user/${id}`)
    .then((result) => {
      console.log(result.data);
      const trip = result.data;
      return Promise.resolve(trip);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const getAllTripsFromUser = (body) => {
  const { user } = body;
  return baseApi
    .get(`/user/${user}`)
    .then((result) => {
      const trips = result.data;
      return Promise.resolve(trips);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export { getSingleTrip, createTrip, getAllTripsFromUser };
