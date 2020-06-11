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

const getDayPlaces = (body) => {
  const { id, tripId, day } = body;
  console.log(tripId);
  return axios
    .get(`/api/trip/${id}/${tripId}/${day}`)
    .then((document) => {
      const trip = document.data.result.allDays[day - 1]; // send just the day Obj;
      // console.log(trip.allDays[day - 1]);
      return Promise.resolve(trip);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const newPlace = (body) => {
  const { id, tripId, day, placeId } = body;
  console.log(tripId);
  return axios
    .post(`/api/trip/${id}/${tripId}/${day}`, body)
    .then((document) => {
      const day = document.data.result; //.result //????;
      console.log(day);
      return Promise.resolve(day);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export { newDay, getDays, getDayPlaces, newPlace };
