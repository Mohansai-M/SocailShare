import Header from "../header/Header";
import MainPage from "./MainPage";
import Personal from "./Personal";
import UserSuggestions from "./UserSuggestions";
import { useEffect, useState } from "react";

function WebPage() {
  const cards = [
    { title: "Card 1", content: "This is the content for Card 1." },
    { title: "Card 2", content: "This is the content for Card 2." },
    { title: "Card 3", content: "This is the content for Card 3." },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4  transition: width 1s ease-in-out">
      <div className="mx-auto">
        <div className="flex flex-wrap justify-center space-x-20 item-center">
          {/* 1st Card - Shown on all screen sizes */}
          <div className="w-full lg:w-fit h-40">
            <div className="bg-white rounded-lg shadow-lg p-4 m-4">
              <Personal></Personal>
            </div>
          </div>

          {/* 2nd Card - Shown on all screen sizes */}
          <div className="w-full lg:w-[35rem]">
            <div className="p-4 m-4">
              <MainPage></MainPage>
            </div>
          </div>

          {/* 3rd Card - Hidden on screens smaller than lg */}
          <div className="hidden lg:w-72 lg:block">
            <div className="bg-white rounded-lg shadow-lg p-4 m-4">
              <UserSuggestions></UserSuggestions>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebPage;
