import axios from "axios";

const newDay = (body) => {
  const { id, tripId } = body;
  return axios
    .get(`/api/trip/${id}/${tripId}/new`)
    .then((document) => {
      const trip = document.data.result; //.result //????;
      return Promise.resolve(trip);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const getDays = (body) => {
  const { id, tripId } = body;
  return axios
    .get(`/api/trip/${id}/${tripId}/`)
    .then((document) => {
      const trip = document.data.result; //.result //????;
      return Promise.resolve(trip);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const getDayPlaces = (body) => {
  const { id, tripId, day } = body;
  return axios
    .get(`/api/trip/${id}/${tripId}/${day}`)
    .then((document) => {
      const trip = document.data.result.allDays[day - 1]; // send just the day Obj;
      return Promise.resolve(trip);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const newPlace = (body) => {
  const { id, tripId, day, placeId } = body;

  return axios
    .post(`/api/trip/new-place`, body)
    .then((document) => {
      const day = document.data.result;
      return Promise.resolve(day);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const removePlace = (body) => {
  const { id, tripId, day, placeId } = body;
  return axios
    .post(`/api/trip/remove-place`, body)
    .then((document) => {
      const day = document.data.result;
      return Promise.resolve(day);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export { newDay, getDays, getDayPlaces, newPlace, removePlace };
