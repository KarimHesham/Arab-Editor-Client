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
  // Actions available in auth service
  Action = {
    SignIn: "login",
    Register: "register",
    Reset: "reset",
    SignOut: "signout",
  };

  // Wrapper method for accessing auth services
  authenticate = async (action, provider, payload) => {
    if (
      (action === this.Action.SignIn || action === this.Action.Register) &&
      provider === "google"
    ) {
      this.googleSignIn(payload);
    }
    switch (action) {
      case this.Action.SignIn:
        this.signIn(payload);
        break;
      case this.Action.Register:
        this.register(payload);
        break;
      case this.Action.Reset:
        this.reset(payload);
        break;
      case this.Action.SignOut:
        this.signOut();
        break;
      default:
        console.log("Invalid Action");
        break;
    }
  };

  googleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };

  signIn = async (payload) => {
    try {
      await signInWithEmailAndPassword(auth, payload.email, payload.password);
    } catch (err) {
      console.log(err);
    }
  };

  register = async (payload) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
    } catch (err) {
      console.log(err);
    }
  };

  reset = async (payload) => {
    try {
      await sendPasswordResetEmail(auth, payload.email);
      console.log("Password reset sent...");
    } catch (err) {
      console.log(err);
    }
  };

  signOut = async () => {
    signOut(auth);
  };
}
