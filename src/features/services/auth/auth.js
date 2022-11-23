import { setUser } from "../../../redux/reducers/userSlice";
import { AuthService } from "../../../services/auth/AuthService";
import { UsersService } from "../../../services/db/DatabaseService";

export const authenticate = (action, provider, payload, dispatch, navigate) => {
  AuthService.authenticate(action, provider, payload)
    .then(() => {
      if (action === "login" || action === "register") {
        const user = AuthService.User;
        dispatch(
          setUser({
            user,
          })
        );
        UsersService.create({
          ...user,
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
