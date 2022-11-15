import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../config";

const googleProvider = new GoogleAuthProvider();

class AuthService {
  Action = {
    SignIn: "login",
    Register: "register",
    Reset: "reset",
    SignOut: "signout",
  };

  authenticate = async (action, provider, payload) => {
    switch (action) {
      case this.Action.SignIn:
        this.signIn(provider, payload);
        break;
      case this.Action.Register:
        this.register(provider, payload);
        break;
      case this.Action.Reset:
        this.reset(payload);
        break;
      case this.Action.SignOut:
        this.signOut(auth);
        break;
      default:
        console.log("Invalid Action");
        break;
    }
  };

  signIn = async (provider, payload) => {
    switch (provider) {
      case "local":
        try {
          await signInWithEmailAndPassword(
            auth,
            payload.email,
            payload.password
          );
        } catch (err) {
          console.log(err);
        }
        break;
      case "google":
        try {
          await signInWithPopup(auth, googleProvider);
        } catch (err) {
          console.log(err);
        }
        break;
      default:
        console.log("Invalid Auth Provided");
        break;
    }
  };

  register = async (provider, payload) => {};
  reset = async (payload) => {};
  signOut = async (payload) => {};
}
