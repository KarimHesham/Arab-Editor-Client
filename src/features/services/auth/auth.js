import { setUser } from "../../../redux/reducers/userSlice";
import { AuthService } from "../../../services/auth/AuthService";
import { UsersService } from "../../../services/db/DatabaseService";

export const authenticate = (action, provider, payload, dispatch, navigate) => {
  AuthService.authenticate(action, provider, payload)
    .then(() => {
      if (action === "login" || action === "register") {
        dispatch(
          setUser({
            uid: AuthService.User.uid,
            email: AuthService.User.email,
            username: AuthService.User.email.split("@")[0],
            photoURL: AuthService.User.photoURL,
          })
        );

        UsersService.create({
          authId: AuthService.User.uid,
          email: AuthService.User.email,
          username: AuthService.User.email.split("@")[0],
          pages: [],
        });
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
