import axios from "axios";

const baseApi = axios.create({
  baseURL: "/api"
});

const getSingleTrip = (body) => {
  const { user, tripID } = body;
  return baseApi
    .get(`/${user}/${tripID}/`)
    .then((result) => {
      const trip = result.data;
      return Promise.reject(trip);
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
      const trip = result.data;
      return Promise.reject(trip);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const getAllTripsFromUser = (body) => {
  const { user } = body;
  return baseApi
    .get(`/${user}/`)
    .then((result) => {
      const trips = result.data;
      return Promise.reject(trips);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export { getSingleTrip, createTrip, getAllTripsFromUser };
