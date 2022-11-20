import { setUser } from "../../../redux/reducers/userSlice";
import { AuthService } from "../../../services/auth/AuthService";

export const user = AuthService.user;

export const authenticate = (action, provider, payload, dispatch, navigate) => {
  AuthService.authenticate(action, provider, payload)
    .then(() => {
      if (action === "login" || action === "register") {
        dispatch(
          setUser({
            id: AuthService.User.uid,
            email: AuthService.User.email,
            username: AuthService.User.email.split("@")[0],
            photoURL: AuthService.User.photoURL,
          })
        );
        navigate("/home");
      }
      if (action === "logout") {
        navigate("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
