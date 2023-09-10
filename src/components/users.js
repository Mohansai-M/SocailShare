
import React, { useContext, useState } from "react";
import { AuthorizationContext } from "../ContextAPI";
const UserList = () => {

  const { userIds, HanldeAddFriend } = useContext(AuthorizationContext);


  const [sortBy, setSortBy] = useState("name");
  const [sortedUsers, setSortedUsers] = useState(userIds);

  const sortUsers = (criteria) => {
    const sorted = [...userIds];
    if (criteria === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === "dob") {
      sorted.sort((a, b) => new Date(a.dob) - new Date(b.dob));
    }
    setSortBy(criteria);
    setSortedUsers(sorted);
  };

  return (
    <div>
      <h2>User List</h2>
      <div>
        <label>Sort by:</label>
        <select onChange={(e) => sortUsers(e.target.value)} value={sortBy}>
          <option value="name">Name</option>
          <option value="dob">Date of Birth</option>
        </select>
      </div>
      <ul>
        <span>
          {userIds.map((userId) => (
            <li key={userId}>
              {userId}
              <button
                key={userId}
                onClick={() => HanldeAddFriend(userId)}
                value={userId}
              >
                Add Friend
              </button>
            </li>
          ))}
        </span>
      </ul>
    </div>
  );
};

export default UserList;
