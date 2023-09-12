import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./server/FireBase";
import {
  getDatabase,
  ref as Ref,
  get,
  onValue,
  update,
} from "firebase/database";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const AuthorizationContext = createContext<any>("");
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

const AuthProvider = (props: any) => {
  const [userEmail, setUserEmail] = useState<string | null>("");
  const [FilteredPosts, setFilteredPosts] = useState<any>([]);
  const [PostDocs, setPostDocs] = useState<any>([]);
  const [userId, setUserId] = useState<string | null>("");
  const [loading, setLoading] = useState(true);
  const [Followers, setFollowers] = useState([]);
  const [Following, setFollowing] = useState([]);
  const [LikedBy, setLikedBy] = useState<any>([]);
  const [FriendRequests, setFriendRequests] = useState([]);
  const [userIds, setUserIds] = useState<any>([]);
  const [FriendRequestsSent, setFriendRequestsSent] = useState([]);
  const [userName, setuserName] = useState<string | null>("");
  const [FriendRequestsReceived, setFriendRequestsReceived] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get user's email
          setUserEmail(user.email);

          const userId = user.uid;
          setUserId(userId);

          // Retrieve user data
          const userRef = Ref(database, `users/${userId}`);
          const userSnapshot = await get(userRef);

          if (userSnapshot.exists()) {
            // Handle user data if needed
            const userData = userSnapshot.val();
            setFollowers(userData.followers);
            setFollowing(userData.following);
            setFriendRequests(userData.friendRequests);
            setuserName(userData.userName);
          } else {
            console.log("Not Working");
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      } else {
        // User is not authenticated
        setUserEmail(null);
        setLoading(false);
      }
    });

    const userCountRef = Ref(database, "users");
    onValue(userCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userIds = Object.keys(data).map((userId) => data[userId].userId);
        setUserIds(userIds);
      }
    });
    return () => {
      // Unsubscribe from the auth state listener when the component unmounts
      unsubscribe();
    };
  }, []);

  const handleCreateNewListing = async (
    name: string,
    post: File | null,
    caption: string
  ) => {
    try {
      if (!post) {
        console.error("No file selected");
        return;
      }

      // Upload the image to Firebase Storage
      const ImgId = Date.now() + "-" + name;
      const storageRef = ref(storage, `uploads/images/${ImgId}`);
      const uploadResult = await uploadBytes(storageRef, post);

      // Add a document to Firestore with the download URL
      const docRef = await addDoc(collection(firestore, "Posts"), {
        userID: userId,
        imageURL: uploadResult.ref.fullPath,
        ImageID: ImgId,
        caption: caption,
        Name: name,
        likes: {},
        comments: {},
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const listAllPosts = async () => {
    return await getDocs(collection(firestore, "Posts"));
  };


  const getImageURL = async (path: any) => {
    try {
      const fileRef = ref(storage, path);
      const downloadURL = await getDownloadURL(fileRef);

      return downloadURL;
    } catch (error) {
      console.error("Error getting download URL:", error);
      throw error;
    }
  };

  const HanldeFriendReceived = async (useID: string) => {
    const userRef = Ref(database, `users/${useID}`);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val();
    if (!userData.friendRequestsReceived) {
      console.log("No Friend Requests");
    } else {
      setFriendRequestsReceived(userData.friendRequestsReceived);
    }
  };

  const HandleFriendRequestSent = async (useID: string) => {
    const userRef = Ref(database, `users/${useID}`);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val();
    if (!userData.friendRequestsSent) {
      console.log("No Friend Requests");
    } else {
      setFriendRequestsSent(userData.friendRequestsSent);
    }
    return userData.friendRequestsSent;
  };

  const HanldeAddFriend = async (Name: string) => {
    const userRef = Ref(database, `users/${userId}`);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val();
    if (!userData.friendRequestsSent) {
      userData.friendRequestsSent = [];
    }
    userData.friendRequestsSent.push(Name);

    await update(Ref(database, `users/${Name}/friendRequestsReceived`), {});
    await update(userRef, userData);
  };

  const HandleLike = async (ImageID: string, userID: string) => {
    const querySnapshot = await getDocs(collection(firestore, "Posts"));
    querySnapshot.forEach(async (doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (ImageID === doc.data().ImageID) {
        await updateDoc(doc.ref, {
          likes: {
            [userID]: true,
          },
        });
      }
    });
    const userRef = Ref(database, `users/${userID}`);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val();
    if (!userData.likes) {
      userData.Likes = [];
    }
    userData.Likes.push(ImageID);
    await update(userRef, userData);
  };

  const AcceptRequestHandler = async (Name: string) => {
    const userRef = Ref(database, `users/${userId}`);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val();
    if (!userData.followers) {
      userData.followers = {};
    }
    userData.followers[Name] = true;
    if (userData.followers && userData.followers[Name]) {
      delete userData.followers[Name];
    }
    await update(Ref(database, `users/${Name}/following`), {
      userId,
    });

    await update(userRef, userData);
  };

  const CancelRequestHandler = async (Name: string, userId: any) => {
    const userRef = Ref(database, `users/${userId}`);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val();
    const NameRef = Ref(database, `users/${Name}`);
    const Namesnapshot = await get(NameRef);
    const NameData = Namesnapshot.val();
    if (Object.values(userData.friendRequestsSent).includes(Name)) {
      userData.friendRequestsSent.splice(
        Object.values(userData.friendRequestsSent).indexOf(Name),
        1
      );
    }

    /*if (Object.values(NameData.friendRequestsReceived).includes(userId)) {
      const friendRequestsReceived = NameData.friendRequestsReceived["userId"];
      console.log(typeof friendRequestsReceived);
    }*/

    await update(userRef, userData);
    await update(NameRef, NameData);
  };

  const LoggedIn: boolean = !!userEmail;

  return (
    <AuthorizationContext.Provider
      value={{
        userId,
        userEmail,
        loading,
        LoggedIn,
        Followers,
        Following,
        FriendRequests,
        handleCreateNewListing,
        listAllPosts,
        getImageURL,
        HanldeAddFriend,
        userIds,
        HanldeFriendReceived,
        HandleFriendRequestSent,
        FriendRequestsReceived,
        FriendRequestsSent,
        AcceptRequestHandler,
        CancelRequestHandler,
        FilteredPosts,
        HandleLike,
        LikedBy,
        setFilteredPosts,
        setLikedBy,
        userName
      }}
    >
      {props.children}
    </AuthorizationContext.Provider>
  );
};

export { AuthProvider };
