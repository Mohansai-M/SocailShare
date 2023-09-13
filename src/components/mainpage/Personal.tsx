import { useContext } from "react";
import { AuthorizationContext } from "../../ContextAPI";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
function Personal() {

 const {
   userId,
   userName,userEmail,
   loading,
   Followers,
   Following,
   FriendRequests,
 } = useContext(AuthorizationContext);



    return (
      <div>
        <div className="mt-4 justify-center">
          <div className="flex justify-center">
            <h1 className="hidden lg:inline-block py-4 px-10 bg-gray-200 hover:bg-gray-300 text-lg text-gray-900 font-bold  rounded-xl transition duration-200">
              {userName}
            </h1>
          </div>
          <div className="mt-4 flex flex-col justify-center">
            <span className="border-solid border-1 border-gray-300 mb-1 hidden lg:inline-block py-3 px-6 bg-gray-100 hover:bg-gray-300 rounded-xl transition duration-200">
              <Link
                className="py-3 px-6 text-sm text-gray-900 font-bold"
                to="/Followers"
              >
                Liked Posts
              </Link>
              <span className="bg-slate-600 hover:bg-slate-800 text-lg text-white rounded-full  px-2 h-24 w-24">
                {3}
              </span>
            </span>
            <span className="border-solid border-1 border-gray-300 mb-1 hidden lg:inline-block  py-3 px-6 bg-gray-100 hover:bg-gray-300 rounded-xl  transition duration-200">
              <Link
                className="py-3 px-6 text-sm text-gray-900 font-bold "
                to="/Followers"
              >
                Followers
              </Link>
              <span className="bg-slate-600 hover:bg-slate-800 text-lg text-white rounded-full  px-2 h-24 w-24">
                {Object.hasOwnProperty(Followers) ? (
                  <span className="bg-slate-600 hover:bg-slate-800 text-lg text-white rounded-full px-2 h-24 w-24">
                    {Object.keys(Followers).length}
                  </span>
                ) : null}
              </span>
            </span>
            <span className="border-solid border-1 border-gray-300 mb-1 hidden lg:inline-block py-3 px-6 bg-gray-100 hover:bg-gray-300 rounded-xl  transition duration-200">
              <Link
                className="py-3 px-6 text-sm text-gray-900 font-bold transition duration-200"
                to="/Followers"
              >
                Following
              </Link>
              <span className="bg-slate-600 hover:bg-slate-800 text-lg text-white rounded-full  px-2 h-24 w-24">
                {Object.hasOwnProperty(Following) ? (
                  <span className="bg-slate-600 hover:bg-slate-800 text-lg text-white rounded-full px-2 h-24 w-24">
                    {Object.keys(Following).length}
                  </span>
                ) : null}
              </span>
            </span>
          </div>
        </div>
        <div className="lg:hidden">
          <div className="flex justify-center items-center">
            <div className="lg:hidden grid lg:justify-items-center justify-items-auto grid-cols-4  grid-flow-row gap-9 auto-rows-auto items-center">
              {/* Alternative content (icons) goes here */}
              <AccountCircleIcon style={{ fontSize: "2.5rem"}} className="Icons"/>
              <GroupIcon style={{ fontSize: "2.5rem" }} />
              <PersonAddIcon style={{ fontSize: "2.5rem" }} />
              <FavoriteBorderIcon style={{ fontSize: "2.5rem" }} />
            </div>
          </div>
        </div>
      </div>
    );
}

export default Personal;