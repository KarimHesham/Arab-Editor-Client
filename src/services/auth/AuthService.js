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

class AuthenticationService {
  User = {
    uid: null,
    email: null,
    username: null,
    photoURL: null,
  };

  // Actions available in auth service
  Action = {
    SignIn: "login",
    Register: "register",
    Reset: "reset",
    SignOut: "logout",
  };

  // Helper method
  setUser = (user) => {
    this.User.uid = user.uid;
    this.User.email = user.email;
    this.User.username = user.email.split("@")[0];
    this.User.photoURL = user.photoURL;
  };

  // Wrapper method for accessing auth services
  authenticate = async (action, provider, payload) => {
    if (
      (action === this.Action.SignIn || action === this.Action.Register) &&
      provider === "google"
    ) {
      return this.googleSignIn();
    }
    switch (action) {
      case this.Action.SignIn:
        return this.signIn(payload);
      case this.Action.Register:
        return this.register(payload);
      case this.Action.Reset:
        return this.reset(payload);
      case this.Action.SignOut:
        return this.signOut();
      default:
        console.log("Invalid Action");
        break;
    }
  };

  // Firebase SDK auth apis
  googleSignIn = async () => {
    const res = await signInWithPopup(auth, googleProvider);

    this.setUser(res.user);
    return res;
  };

  signIn = async (payload) => {
    const res = await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );

    this.setUser(res.user);
    return res;
  };

  register = async (payload) => {
    const res = await createUserWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );

    this.setUser(res.user);
    return res;
  };

  reset = async (payload) => {
    const res = await sendPasswordResetEmail(auth, payload.email);

    return res;
  };

  signOut = async () => {
    const res = await signOut(auth);

    return res;
  };
}

export const AuthService = new AuthenticationService();
