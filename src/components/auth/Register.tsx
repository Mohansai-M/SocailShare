
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import TextField from "@mui/material/TextField";
import { app } from "../../server/FireBase";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import Button from "@mui/material/Button";
function Register() {
  const auth = getAuth(app);
  const database = getDatabase(app);
   const history =  useNavigate();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
      setUserName(e.target.value);
  }

  const LoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );
    const userId = userCredential.user.uid;

    // Create a reference to the user's database node
    const userRef = ref(database, `users/${userId}`);
    await set(userRef, {
      userId:userId,
      userName:userName,
      followers:{},
      following:{},
      friendRequest:{}
    });
    history("/");
  };
  return (
    <div className="login-page flex items-center justify-center mt-20">
      <form
        onSubmit={LoginSubmit}
        className="w-full max-w-screen-sm bg-white border-solid border-2 border-grey-100 rounded-lg p-4 mb-4 flex justify-center"
      >
        <div className="md:flex md:items-center mb-2 mt-4">
          <div className="flex flex-wrap items-center justify-center">
            <div className="flex flex-col w-full px-3">
              <label
                className="block text-base text-gray-700 font-semibold mb-2"
                htmlFor="grid-password"
              >
                UserName
              </label>
              <TextField
                type="text"
                id="fullWidth outlined-required"
                label="Required"
                name="userName"
                required
                placeholder="UserName"
                value={userName}
                onChange={handleNameChange}
              />
            </div>
            <div className="flex flex-col w-full px-3">
              <label
                className="block text-base text-gray-700 font-semibold mb-2"
                htmlFor="grid-password"
              >
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
                className="block text-base text-gray-700 font-semibold mb-2"
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
                  Register
                </Button>
                <Button variant="contained">
                  <Link to="/Login" className="navlink">
                    Login
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

export default Register;
