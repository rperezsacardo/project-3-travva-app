import axios from "axios";

const newDay = (body) => {
  const { id, tripId } = body;
  console.log(tripId);
  return axios
    .get(`/api/trip/${id}/${tripId}/new`)
    .then((document) => {
      const trip = document.data.result; //.result //????;
      console.log(trip);
      return Promise.resolve(trip);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const getDays = (body) => {
  const { id, tripId } = body;
  console.log(tripId);
  return axios
    .get(`/api/trip/${id}/${tripId}/`)
    .then((document) => {
      const trip = document.data.result; //.result //????;
      console.log(trip);
      return Promise.resolve(trip);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export { newDay, getDays };
