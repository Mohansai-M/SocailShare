import { useContext, useEffect } from "react";
import { AuthorizationContext } from "../../ContextAPI";

function FriendRequestReceived() {
  const { userId, HanldeFriendReceived,FriendRequestsReceived,AcceptRequestHandler} = useContext(AuthorizationContext);

  
  useEffect(() => {
    HanldeFriendReceived(userId);
  });

  return (
    <div className="col-span-2 rounded-xl shadow border h-30">
      <h1>FriendRequests</h1>
      <h1>
        {Object.keys(FriendRequestsReceived).map((Id) => (
          <span>
            <li key={Id}> {FriendRequestsReceived[Id]}</li>
            <button
              key={FriendRequestsReceived[Id]}
              onClick={() => AcceptRequestHandler(FriendRequestsReceived[Id])}
              value={userId}
            >
              Accept
            </button>
            <button>Reject</button>
          </span>
        ))}
      </h1>
    </div>
  );
}

export default FriendRequestReceived;
