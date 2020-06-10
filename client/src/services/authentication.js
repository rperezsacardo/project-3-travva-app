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
  console.log(body);
  return baseAuthentication
    .post("/sign-in", body)
    .then((response) => {
      const data = response.data;
      const user = data.user;
      console.log("service >>>>>>>", user);
      return Promise.resolve(user);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const signOut = (body) => {
  return baseAuthentication
    .post("/sign-out")
    .then((response) => {
      return Promise.resolve();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const loadUserInfo = () => {
  return baseAuthentication
    .get("/me")
    .then((response) => {
      const data = response.data;
      const user = data.user;
      console.log(user);
      return Promise.resolve(user);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export { signUp, signIn, signOut, loadUserInfo };
