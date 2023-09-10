import { useContext, useEffect, useState } from "react";
import { AuthorizationContext } from "../../ContextAPI";

function FriendRequestSent() {
  const { userId, HandleFriendRequestSent,FriendRequestsSent } = useContext(AuthorizationContext);
const[LocalReceived,setLocalReceived] = useState([]);

  useEffect(() => {
    HandleFriendRequestSent(userId);
    setLocalReceived(FriendRequestsSent);
  });
  return (
    <div className="col-span-2 rounded-xl shadow border h-30">
      <h1>FriendRequests</h1>
    </div>
  );
}

export default FriendRequestSent;
