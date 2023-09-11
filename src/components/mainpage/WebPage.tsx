import MainPage from "./MainPage";
import Personal from "./Personal";
import UserSuggestions from "./UserSuggestions";
import React, { useContext, useEffect, useState } from "react";
function WebPage() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isHidden, setIsHidden] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const hideDivs = () => {
    if (window.innerWidth <= 1000) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    window.addEventListener("resize", hideDivs);
    return () => window.removeEventListener("resize", hideDivs);
  }, []);

  return (
    <div className="container mx-auto mt-4">
      <div className="flex items-center justify-center">
        {/*<div className= "grid grid-cols-3 p-8 gap-8 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6">*/}
        <div className="grid grid-cols-4 grid-rows-0 gap-4 border-solid">
          <div
            className={
              isHidden
                ? "hidden"
                : "rounded-xl border bg-white shadow-lg flex justify-center h-1/4"
            }
            onClick={toggleHidden}
          >
            <Personal></Personal>
          </div>
          <div className="mainPage col-span-2 rounded-xl border h-30 bg-white">
            <MainPage></MainPage>
          </div>
          <div
            className={
              isHidden
                ? "hidden"
                : "col-start-4 rounded-xl border bg-white shadow-lg flex justify-center h-1/4"
            }
            onClick={toggleHidden}
          >
            <UserSuggestions></UserSuggestions>
          </div>
        </div>
      </div>
      <button onClick={hideDivs}>Hide divs</button>
    </div>
  );
}

export default WebPage;
