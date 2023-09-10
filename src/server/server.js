import { app } from "./FireBase";
import { getDatabase ,ref,set} from "firebase/database";
function Server() {

  const db = getDatabase(app);

  const putData = () => {
    set(ref(db, "users/piyush"),
    {
        id:1,
        name:"Piyush",
        age:21,
    });
  };
return { putData };
}

export  {Server};

