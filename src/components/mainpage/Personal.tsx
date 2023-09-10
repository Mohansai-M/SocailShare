import { useContext } from "react";
import { AuthorizationContext } from "../../ContextAPI";
import { Link } from "react-router-dom";

function Personal() {

 const { userId ,userEmail, loading, Followers, Following, FriendRequests } =
     useContext(AuthorizationContext);



    return (
      <div className="col-span-2 rounded-xl shadow border h-30 bg-gray-50 flex justify-center">
        <div className="mt-4 justify-center">
          <div className="flex justify-center">
            <h1 className="hidden lg:inline-block py-4 px-10 bg-gray-200 hover:bg-gray-300 text-lg text-gray-900 font-bold  rounded-xl transition duration-200">
              Personal
            </h1>
          </div>
          <div className="mt-4 flex flex-col justify-center">
            <h1 className="text-sm text-gray-900 font-bold ">{userId}</h1>
            <span className="border-solid border-1 border-gray-300 mb-1 hidden lg:inline-block py-3 px-6 bg-gray-100 hover:bg-gray-300 rounded-xl transition duration-200">
            <Link className="py-3 px-6 text-sm text-gray-900 font-bold" to="/Followers">
            Liked Posts</Link>
            <span className="bg-slate-600 hover:bg-slate-800 text-lg text-white rounded-full  px-2 h-24 w-24">{3}</span>
            </span>
            <span className="border-solid border-1 border-gray-300 mb-1 hidden lg:inline-block  py-3 px-6 bg-gray-100 hover:bg-gray-300 rounded-xl  transition duration-200">
            <Link className="py-3 px-6 text-sm text-gray-900 font-bold " to="/Followers">
            Followers</Link>
            <span className="bg-slate-600 hover:bg-slate-800 text-lg text-white rounded-full  px-2 h-24 w-24">{Object.keys(Followers).length}</span>
            </span>
              <span className="border-solid border-1 border-gray-300 mb-1hidden lg:inline-block py-3 px-6 bg-gray-100 hover:bg-gray-300 rounded-xl  transition duration-200">
            <Link className="py-3 px-6 text-sm text-gray-900 font-bold transition duration-200" to="/Followers">
            Following</Link>
            <span className="bg-slate-600 hover:bg-slate-800 text-lg text-white rounded-full  px-2 h-24 w-24">
            {Object.keys(Following).length}</span>
            </span>
          </div>
        </div>
      </div>
    );
}

export default Personal;