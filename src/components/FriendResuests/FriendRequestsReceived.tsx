import { useContext, useEffect } from "react";
import { AuthorizationContext } from "../../ContextAPI";

function FriendRequestReceived() {
  const {
    userId,
    HanldeFriendReceived,
    FriendRequestsReceived,
    AcceptRequestHandler,
  } = useContext(AuthorizationContext);

  useEffect(() => {
    HanldeFriendReceived(userId);
  },[userId])
const friendRequestsReceivedLength = Object.keys(FriendRequestsReceived).length;

  return (
    <div className="col-span-2 rounded-xl shadow border h-30 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">FriendRequests Received</h1>
      <div className="grid grid-cols-1 gap-2">
        {Object.hasOwnProperty(FriendRequestsReceived)  ? (
          Object.keys(FriendRequestsReceived).map((Id) => (
            <div className="flex justify-center">
              <div className="w-11/12 flex items-center border-solid border-1 border-gray-300 py-1 px-2  bg-gray-100 rounded-xl">
                <div className="w-full h-10 truncate">
                  <p className="text-gray-900">{FriendRequestsReceived[Id]}</p>
                </div>
                <div className="ml-2">
                  <button
                    className="ml-4 px-4 py-2 rounded-md text-white bg-blue-800"
                    onClick={() =>
                      AcceptRequestHandler(FriendRequestsReceived[Id])
                    }
                    value={userId}
                  >
                    Cancel Request
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Friend requests received</p>
        )}
      </div>
    </div>
  );
}

export default FriendRequestReceived;
