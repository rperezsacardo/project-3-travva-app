import axios from "axios";

const baseAuthentication = axios.create({
  baseURL: "/api/authentication"
});

const signUp = (body) => {
  console.log(body);
  return baseAuthentication
    .post("/sign-up", body)
    .then((response) => {
      const data = response.data;
      const user = data.user;
      return Promise.resolve(user);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
const signIn = (body) => {
  return baseAuthentication
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

export { signUp, signIn };
