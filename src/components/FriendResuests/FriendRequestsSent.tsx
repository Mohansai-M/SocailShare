import { useContext, useEffect, useState } from "react";
import { AuthorizationContext } from "../../ContextAPI";

function FriendRequestSent() {
  const {
    userId,
    HandleFriendRequestSent,
    FriendRequestsSent,
    CancelRequestHandler,
  } = useContext(AuthorizationContext);
  const [LocalSent, setLocalSent] = useState([]);

  useEffect(() => {
    HandleFriendRequestSent(userId);
  }, [userId]);

  const friendRequestsSentLength = Object.keys(FriendRequestsSent).length;

  return (
    <div className="col-span-2 rounded-xl shadow border h-30 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Friend requests sent</h1>

      <div className="grid grid-cols-1 gap-2">
        {friendRequestsSentLength > 0 ? (
          Object.keys(FriendRequestsSent).map((Id) => (
            <div className="flex justify-center">
              <div className="w-11/12 flex items-center border-solid border-1 border-gray-300 py-1 px-2  bg-gray-100 rounded-xl">
                <div className="w-full h-10 truncate">
                  <p className="text-gray-900">{FriendRequestsSent[Id]}</p>
                </div>
                <div className="ml-2">
                  <button
                    className="ml-4 px-4 py-2 rounded-md text-white bg-rose-800"
                    onClick={() => CancelRequestHandler(FriendRequestsSent[Id],userId)}
                    value={userId}
                  >
                    Cancel Request
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Friend requests sent</p>
        )}
      </div>
    </div>
  );
}

export default FriendRequestSent;
