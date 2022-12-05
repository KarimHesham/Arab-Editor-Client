import { setUser } from "../../../redux/reducers/userSlice";
import { AuthService } from "../../../services/auth/AuthService";
import { createUser, getUser } from "../db/db";

export const authenticate = (action, provider, payload, dispatch, navigate) => {
  AuthService.authenticate(action, provider, payload)
    .then(() => {
      if (action === "login" || action === "register") {
        const user = { ...AuthService.User };

        getUser(user.uid).then((res) => {
          if (res.length === 0) {
            createUser(user);
          } else {
            var existingUser = { ...user, pages: res[0].pages };
          }

          dispatch(
            setUser(action === "register" ? { ...user } : { ...existingUser })
          );
        });

        navigate("/home");
      }

      if (action === "logout") {
        navigate("/");
        dispatch(setUser(null));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
