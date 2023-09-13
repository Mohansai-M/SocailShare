import React, { useContext, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { AuthorizationContext } from "../../ContextAPI";
import { app } from "../../server/FireBase";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@mui/material";

function Header(props: any) {
  const {
    userEmail,
    loading,
    Followers,
    Following,
    FriendRequests,
    FriendRequestsReceived,
    FriendRequestsSent,
  } = useContext(AuthorizationContext);
  /// Inside the Navbar component

  // Function to open the menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  // Function to close the menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const handleBurgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseClick = (event: any) => {
    setIsMenuOpen(false);
  };

  const auth = getAuth(app);
  const LogoutSubmit = async (e: React.FormEvent) => {
    signOut(auth)
      .then(() => {
        alert("LoggedOut Successfully");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className={`bg-blue-500 ${isMenuOpen ? "overflow-hidden" : ""}`}>
      <nav className="relative px-4 py-4 grid lg:justify-items-center justify-items-auto grid-cols-2 items-center bg-white">
        <Link to="/">
          <h1 className="font-extrabold text-3xl text-black ">SocialShare</h1>
        </Link>
        <div className="lg:hidden justify-self-end">
          <button
            className="navbar-burger  text-blue-600 p-3 m"
            onClick={handleBurgerClick}
          >
            <svg
              className="block h-4 w-4 fill-current ml-50"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <Link
              className="text-sm text-gray-400 hover:text-gray-500"
              to="/Following"
            >
              Search
            </Link>
          </li>
          <li>
            <span>
              <Link
                className="text-sm text-gray-400 hover:text-gray-500"
                to="/FriendRequestsReceived"
              >
                Requests Received
              </Link>
              <span className="bg-rose-600 hover:bg-rose-800 text-lg text-white rounded-full  px-2 h-24 w-24">
                {Object.keys(FriendRequestsReceived).length}
              </span>
            </span>
          </li>
          <li>
            <span>
              <Link
                className="text-sm text-gray-400 hover:text-gray-500"
                to="/FriendRequestSent"
              >
                Requests Sent
              </Link>
              <span className="bg-rose-600 hover:bg-rose-800 text-lg text-white rounded-full  px-2 h-24 w-24">
                {Object.keys(FriendRequestsSent).length}
              </span>
            </span>
          </li>
        </ul>
        {loading ? (
          <li>
            <p>Loading...</p>
          </li>
        ) : userEmail ? (
          <span>
            <Link
              className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
              to="#"
            >
              {userEmail}
            </Link>
            <Link
              className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
              to="#"
              onClick={LogoutSubmit}
            >
              Logout
            </Link>
          </span>
        ) : (
          <span>
            <Link
              className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
              to="/Login"
            >
              Login
            </Link>
            <Link
              className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
              to="/Register"
            >
              Register
            </Link>
          </span>
        )}
      </nav>
      {isMenuOpen ? (
        <div className="navbar-menu relative z-50">
          <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
            <div className="mb-8 grid lg:justify-items-center justify-items-auto grid-cols-2 items-center">
              <Link to="/">
                <h1 className="font-extrabold text-3xl text-black">
                  SocialShare
                </h1>
              </Link>
              <button
                className="navbar-close  justify-self-end"
                onClick={handleCloseClick}
              >
                <svg
                  className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div>
              <ul>
                <li className="mb-1">
                  <Link
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded-xl"
                    to="/Following"
                  >
                    Search
                  </Link>
                </li>
                <li className="mb-1">
                  <span className="flex items-center hover:bg-blue-50 hover:text-blue-600 rounded-xl">
                    <Link
                      className="block p-4 text-sm font-semibold text-gray-400 rounded-xl"
                      to="/FriendRequestSent"
                    >
                      Requests Received
                    </Link>
                    <span className="bg-rose-600 text-lg text-white rounded-full  px-2 h-7 w-7">
                      {Object.keys(FriendRequestsReceived).length}{" "}
                    </span>
                  </span>
                </li>
                <li className="mb-1">
                  <span className="flex items-center hover:bg-blue-50 hover:text-blue-600 rounded-xl">
                    <Link
                      className="block p-4 text-sm font-semibold text-gray-400  rounded-xl"
                      to="/FriendRequestSent"
                    >
                      Requests Sent
                    </Link>
                    <span className="bg-rose-600 text-lg text-white rounded-full px-2 h-7 w-7">
                      {Object.keys(FriendRequestsSent).length}
                    </span>
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-auto">
              <div className="pt-6">
                {loading ? (
                  <p>Loading...</p>
                ) : userEmail ? (
                  <span>
                    <Link
                      className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl transition duration-200"
                      to="#"
                    >
                      {userEmail}
                    </Link>
                    <Link
                      className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl transition duration-200"
                      to="#"
                      onClick={LogoutSubmit}
                    >
                      Logout
                    </Link>
                  </span>
                ) : (
                  <span>
                    <Link
                      className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl rounded-xl transition duration-200"
                      to="/Login"
                    >
                      Login
                    </Link>
                    <Link
                      className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl transition duration-200"
                      to="/Register"
                    >
                      Register
                    </Link>
                  </span>
                )}
              </div>
            </div>
          </nav>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Header;
