import { AuthService } from "../../../services/auth/AuthService";

export const user = AuthService.user;

export const authenticate = (action, provider, payload) => {
  AuthService.authenticate(action, provider, payload)
    .then(() => {
      console.log(AuthService.User);
    })
    .catch((err) => {
      console.log(err);
    });
};
