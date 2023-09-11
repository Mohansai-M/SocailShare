import { useContext } from "react";
import { AuthorizationContext } from "../../ContextAPI";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";

function UserSuggestions() {
   const { userIds,HanldeAddFriend } = useContext(AuthorizationContext);

       return (
           <div className="mt-4 mb-4 justify-center">
             <div className="flex justify-center">
               <h1 className="text-sm text-gray-900 font-bold ">
                 User Suggestions
               </h1>
             </div>
             <div className="grid grid-cols-1 gap-2">
               {userIds.map((userId: any) => (
                 <div className="flex justify-center">
                   <div className="w-11/12 flex items-center border-solid border-1 border-gray-300 py-1 px-2  bg-gray-100 rounded-xl">
                     <div className="w-full h-10 truncate">
                       <Link className="text-gray-900" to="#">
                         {" "}
                         {userId}{" "}
                       </Link>
                     </div>
                     <div className="ml-2">
                       <button
                         className="rounded-lg bg-slate-500 hover:bg-slate-600"
                         key={userId}
                         onClick={() => HanldeAddFriend(userId)}
                         value={userId}
                       >
                         Add Friend
                       </button>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
       );
}

export default UserSuggestions;
