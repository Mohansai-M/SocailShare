import { useContext, useEffect } from "react";
import { AuthorizationContext } from "../../ContextAPI";

function Following() {
  const { Following } = useContext(AuthorizationContext);

  return (
    <div className="col-span-2 rounded-xl shadow border h-30">
      <h1>FriendRequests</h1>
      <h1>
        {Object.keys(Following).map((Id) => (
          <span>
            <li key={Id}> {Id}</li>
            Accept
          </span>
        ))}
      </h1>
    </div>
  );
}

export default Following;
