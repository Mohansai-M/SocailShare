import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { AuthorizationContext } from "../../ContextAPI";
import { app } from "../../server/FireBase";
import SearchIcon from '@mui/icons-material/Search';
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@mui/material";

function Header(props: any) {
  const {
    userEmail,
    loading,
    Followers,
    Following,
    FriendRequests,
    userName,
    FriendRequestsReceived,
    FriendRequestsSent,
    HandleFriendRequestSent,
    userId
  } = useContext(AuthorizationContext);
  /// Inside the Navbar component

  // Function to open the menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropDownOpen, setsDropDownOpen] = useState(false);

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
  const dropDown = (LocalDrop:boolean) =>
  {
    setsDropDownOpen(!LocalDrop)
  }

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

  useEffect(() => {
    HandleFriendRequestSent(userId);
  }, [userId]);

  return (
<div className="flex sticky top-0   flex-wrap place-items-center z-3">
  <section className="mx-auto">
     {/*navbar */}
    <nav className="flex justify-between bg-white shadow-lg text-black w-screen">
      <div className={`px-5 xl:px-12 py-3 flex w-full items-center ${isMenuOpen ? "overflow-hidden" : ""}`}>
         <Link className="text-3xl font-bold font-heading" to="/">
              <h1 className="font-extrabold text-3xl ">SocialShare</h1>
          </Link>
       {/*Nav Links */}
        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading items-center space-x-12">
         <li>
        <Link className="hover:text-gray-600" to="#">
                {userEmail ?(
        <div className="bg-white items-center justify-between border-solid border-2 border-grey-1000 w-full h-12 flex rounded-lg shadow-lg p-2">
        <input type="text" name="serch" placeholder="Search" className="bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none"/>
        <button type="submit" className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
        <SearchIcon />
             </button>
             </div>
               ):(<></>)}</Link>
               </li>
          <li>
          {userEmail ? (
          <span><Link className="hover:text-gray-600" to="/FriendRequestsReceived">Requests Received</Link>
          &nbsp;
          {
          Object.keys(FriendRequestsReceived).length > 0 ? (
          <span className="bg-pink-600 rounded-full px-1 py-1 h-15 w-15">
          <span className="text-xl left-0 top-0">
          {Object.keys(FriendRequestsReceived).length}</span></span>
          ):(<></>)} </span>) : ( <></>)}</li>

          <li>{userEmail ? (
          <span>
          <Link className="hover:text-gray-600" to="/FriendRequestSent">Requests Sent</Link>
          &nbsp;
          {Object.keys(FriendRequestsSent).length > 0 ? (
          <span className="bg-pink-600 rounded-full px-1 py-1 h-15 w-15">
          <span className="text-lg left-0 top-0">
          {Object.keys(FriendRequestsSent).length}</span>
          </span>
          ):(<></>)} </span>) : ( <></>)}</li>
        </ul>
       
        <div className="hidden xl:flex items-center space-x-5 items-center">
    {loading ? (
          <li>
            <p>Loading...</p>
          </li>
        ) : userEmail ? (
      <div className="relative inline-block text-left">
      <div>
      <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-bold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true"
       onClick={()=>dropDown(isDropDownOpen)}>
       <Link to="#">
      {userName}
      </Link>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
       </button>

      </div>


  {isDropDownOpen ?
   <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
    <div className="py-1" role="none">
      <Link className="text-gray-700 block px-4 py-2 bg-gray-50 hover:bg-gray-900 text-sm text-gray-900 hover:text-white text-sm font-bold w-full transition duration-200"  to="#" tabIndex={-1}> {userEmail} </Link>
      <Link className="text-gray-700 block px-4 py-2  bg-gray-50 hover:bg-gray-900 text-sm text-gray-900 hover:text-white text-sm  font-bold w-full transition duration-200"  to="#" tabIndex={-1} onClick={LogoutSubmit}>
      Logout </Link>
    </div>
  </div> : <></>}
</div>):<></>}
        </div>
      </div>
     {/*Responsive navbar */}
      <a className="navbar-burger self-center mr-12 xl:hidden" href="#" onClick={handleBurgerClick}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
      </a>
    </nav>
  </section>
{ isMenuOpen ? (
<div className="navbar-menu relative z-50">
  <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
  <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
    <div className="mb-8 grid lg:justify-items-center justify-items-auto grid-cols-2 items-center">
    <Link to="/"> <h1 className="font-extrabold text-3xl text-black">SocialShare</h1> </Link>
      <button className="navbar-close  justify-self-end" onClick={handleCloseClick}>
        <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <div>
      <ul>
        <li className="mb-1">
          <Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-gray-600 rounded-xl" to="/Following"> Search </Link>
        </li>
        <li className="mb-1">
          <span className="flex items-center hover:bg-blue-50 hover:text-gray-600 rounded-xl">
            <Link className="block p-4 text-sm font-semibold text-gray-400 rounded-xl" to="/FriendRequestSent"> Requests Received </Link>
            <span className="bg-rose-600 text-lg text-white rounded-full  px-2 h-7 w-7">
              {Object.keys(FriendRequestsReceived).length} </span> </span>
        </li>
        <li className="mb-1">
          <span className="flex items-center hover:bg-blue-50 hover:text-gray-600 rounded-xl">
            <Link className="block p-4 text-sm font-semibold text-gray-400  rounded-xl" to="/FriendRequestSent"> Requests Sent </Link>
            <span className="bg-rose-600 text-lg text-white rounded-full px-2 h-7 w-7">
             {Object.keys(FriendRequestsSent).length} </span> </span>
        </li>
      </ul>
    </div>
    <div className="mt-auto">
      <div className="pt-6">
        {loading ? (
        <p>Loading...</p>
        ) : userEmail ? (
        <span> <Link className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl transition duration-200" to="#">
          {userEmail} </Link>
          <Link className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-gray-600 hover:bg-blue-700  rounded-xl transition duration-200" to="#" onClick={LogoutSubmit}>
          Logout </Link> </span>
        ) : (
        <span> <Link className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl rounded-xl transition duration-200" to="/Login">
        Login </Link>
        <Link className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-gray-600 hover:bg-blue-700  rounded-xl transition duration-200" to="/Register">
        Register </Link> </span>
        )}
      </div>
    </div>
  </nav>
</div>
) : ( <p></p> )}
</div>
  )
}

export default Header;
