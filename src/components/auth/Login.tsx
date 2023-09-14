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
 const history = useNavigate();
  const loginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((value) => console.log(value))
      .catch((err) => console.log(err));
      history("/");
  };

  return (
    <div className="login-page flex items-center justify-center mt-20">
      <form
        onSubmit={loginSubmit}
        className="w-full max-w-screen-sm bg-white border-solid border-2 border-grey-100 rounded-lg p-4 mb-4 flex justify-center"
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
                <button className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" type="submit">
                  Login
                </button>
                <button className="hidden lg:inline-block py-2 px-6 bg-gray-900 hover:bg-gray-600 text-sm text-white font-bold rounded-xl transition duration-200">
                  <Link to="/Register" className="navlink">
                    Register
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
