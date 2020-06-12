import axios from "axios";

const baseApi = axios.create({
  baseURL: "/api"
});

const getSingleTrip = (body) => {
  const { id, tripID } = body;
  return baseApi
    .get(`/user/${id}/${tripID}/`)
    .then((document) => {
      const trip = document.data.result; //????;
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
    .then((document) => {
      const trips = document.data.result;
      return Promise.resolve(trips);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const serviceDeleteTrip = (tripId) => {
  console.log(tripId);
  return axios
    .post(`/api/trip/delete/`, { tripId })
    .then((result) => {
      const trip = result.data;
      return Promise.resolve(trip);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const serviceUpdateTripName = (body) => {
  return axios
    .post(`/api/trip/update-name/`, body)
    .then((result) => {
      const trip = result.data;
      return Promise.resolve(trip);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export { getSingleTrip, createTrip, getAllTripsFromUser, serviceDeleteTrip, serviceUpdateTripName };
