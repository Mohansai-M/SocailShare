import "./Login.css";
import React, { useContext, useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../server/FireBase";
import { Link, useNavigate } from "react-router-dom";
import { AuthorizationContext } from "../../ContextAPI";
import "./Login.css";
import { Button, TextField } from "@mui/material";

function Login() {
  const auth = getAuth(app);
  const { LoggedIn } = useContext(AuthorizationContext);
  const [userEmail, setUserEmail] = useState<string>("");
  const Navigate = useNavigate();
  const [userPassword, setUserPassword] = useState<string>("");

  useEffect(() => {
    if (LoggedIn) {
      Navigate("/");
    }
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };

  const loginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((value) => console.log(value))
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-page flex items-center justify-center mt-20">
      <form
        onSubmit={loginSubmit}
        className="bg-slate-100 w-full max-w-prose shadow-md rounded px-8 pt-6 pb-3 mb-4"
      >
        <div className="md:flex md:items-center mb-2 mt-4">
          <div className="flex flex-wrap items-center justify-center">
            <div className="flex flex-col w-full px-3">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                Email
              </label>
              <TextField
                type="email"
                id="fullWidth outlined-required"
                label="Required"
                name="email"
                required
                placeholder="Email"
                value={userEmail}
                onChange={handleEmailChange}
              />
            </div>
            <div className="flex flex-col w-full px-3">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Password
              </label>
              <TextField
                type="password"
                name="password"
                id="fullWidth outlined-required"
                label="Required"
                required
                autoComplete="on"
                placeholder="Password"
                value={userPassword}
                onChange={handlePasswordChange}
              />
              <p className="text-gray-600 text-xs italic">Case Sensitive</p>
            </div>
            <div className="mt-5">
              <div className="flex space-x-4">
                <Button variant="contained" type="submit">
                  Login
                </Button>
                <Button variant="contained">
                  <Link to="/Register" className="navlink">
                    Register
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
