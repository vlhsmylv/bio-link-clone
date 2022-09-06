import Head from "next/head";
import { useState } from "react";
import Logo from "../svg/Logo.svg";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebase.config";
import { useRouter } from "next/router";
import axios from "axios";
import { root } from "../../config/api.config";

const AuthForm = ({ updateAuth }: any) => {
  const [authType, setAuthType] = useState<string>("signIn");

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleSignIn = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.reload();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSignUp = (e: any) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const { user }: any = userCredential;
        const { uid }: any = user;
        const { data }: any = await axios.post("/api/auth/create", {
          uid: uid,
          username: username,
          email: email,
        });
        if (data.status) {
          router.reload();
        } else {
          setError(data.err);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const forms: any = {
    signIn: (
      <form className="d-flex gap-3 flex-column" onSubmit={handleSignIn}>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email address"
            className="form-control rounded-pill"
          />
        </div>
        <div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="form-control rounded-pill"
          />
        </div>
        <div className="text-center">
          New here?{" "}
          <a
            onClick={() => setAuthType("signUp")}
            className="text-dark text-decoration-underline fw-bold"
            style={{
              cursor: "pointer",
            }}
          >
            Sign up
          </a>
        </div>
        <div className="text-danger fw-bold text-center">{error}</div>
        <div>
          <input
            type="submit"
            value="Sign in"
            className="btn btn-dark border rounded-pill w-100"
          />
        </div>
      </form>
    ),
    signUp: (
      <form className="d-flex gap-3 flex-column" onSubmit={handleSignUp}>
        <div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter your username"
            className="form-control rounded-pill"
            autoComplete="off"
          />
        </div>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email address"
            className="form-control rounded-pill"
            autoComplete="off"
          />
        </div>
        <div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="form-control rounded-pill"
            autoComplete="off"
          />
        </div>
        <div className="text-center">
          Has an account?{" "}
          <a
            onClick={() => setAuthType("signIn")}
            className="text-dark text-decoration-underline fw-bold"
            style={{
              cursor: "pointer",
            }}
          >
            Sign in
          </a>
        </div>
        <div className="text-danger fw-bold text-center">{error}</div>
        <div>
          <input
            type="submit"
            value="Sign up"
            className="btn btn-dark border rounded-pill w-100"
          />
        </div>
      </form>
    ),
  };

  return (
    <div
      className="d-flex gap-3 flex-column align-items-center justify-content-center"
      style={{
        height: "100vh",
      }}
    >
      <div>
        <Logo />
      </div>
      {forms[authType]}
    </div>
  );
};

export default AuthForm;
