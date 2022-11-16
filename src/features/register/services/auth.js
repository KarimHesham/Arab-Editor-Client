import { AuthService } from "../../../services/auth/AuthService";

export const login = (provider, payload) => {
  AuthService.authenticate("login", provider, payload)
    .then(() => {
      console.log("Logging in...");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const register = (provider, payload) => {
  AuthService.authenticate("register", provider, payload)
    .then(() => {
      console.log("Registering User...");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const resetPassword = (payload) => {
  AuthService.authenticate("reset", "", payload);
};
