import axios from "axios";
import { response } from "express";

const baseAuthentication = axios.create({
  baseURL: "/api/authentication"
});

const signUp = (body) => {
  baseAuthentication
    .post("/sign-up")
    .then((response) => {
      const data = response.data;
      const user = data.user;
      return new Promise.resolve(user);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
const signIn = (body) => {
  baseAuthentication
    .post("/sign-in")
    .then((response) => {
      const data = response.data;
      const user = data.user;
      return new Promise.resolve(user);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
