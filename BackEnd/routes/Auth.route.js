import express from "express";
import {
  GoolgleLogin,
  GithubFirebaseLogin,
  Login,
  Logout,
  Register,
} from "../controllers/Auth.controller.js";

const AuthRoute = express.Router();

AuthRoute.post("/register", Register);
AuthRoute.post("/login", Login);
AuthRoute.post("/google-login", GoolgleLogin);
AuthRoute.post("/github-login", GithubFirebaseLogin);

AuthRoute.get("/logout", Logout);

export default AuthRoute;
