import React, { useState } from "react";
import { Button } from "./ui/Button";
import { FaGithub } from "react-icons/fa";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../helpers/firebase.js";
import { showToast } from "@/helpers/showToast";
import { useNavigate } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { RouteIndex } from "@/helpers/RouteName";
import { setUser } from "@/redux/user/user.slice";
import { useDispatch } from "react-redux";

const GithubLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGithubLogin = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const githubProvider = new GithubAuthProvider();

      const githubResponse = await signInWithPopup(auth, githubProvider);

      const user = githubResponse.user;

      const bodyData = {
        name: user.displayName || "GitHub User",
        email: user.email,
        avatar: user.photoURL,
      };

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/backend/auth/github-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(bodyData),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        return showToast(data.message || "GitHub login failed!", "error");
      }

      dispatch(setUser(data.user));
      navigate(RouteIndex);

      showToast(data.message || "GitHub login successful!", "success");
    } catch (error) {
      console.error("GitHub login error:", error);

      showToast(error.message || "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGithubLogin}
      disabled={loading}
      className="github-login-button w-full"
    >
      <FaGithub />
      <span>{loading ? "Signing in..." : "Continue with GitHub"}</span>
    </Button>
  );
};

export default GithubLogin;
