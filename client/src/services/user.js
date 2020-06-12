import axios from "axios";

const baseUser = axios.create({
  baseURL: "/api/user/"
});

const getUser = () => {
  return baseUser
    .get("/:id")
    .then((result) => {     
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
      const trips = result.data;
      return Promise.resolve(trips);
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

export { getUser, getTrips };
