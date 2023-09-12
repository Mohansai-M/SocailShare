import { ReactHTMLElement, useContext, useEffect, useState } from "react";
import { AuthorizationContext } from "../../ContextAPI";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Feed.css";
import {  ref } from "firebase/storage";
import { collection, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "../../server/FireBase";
import { getDatabase,ref as Ref,get,onValue,update } from "firebase/database";


const firestore = getFirestore(app);
const database = getDatabase(app);


function Feed(props: any) {
  const {isLiked} = props;
  const { getImageURL,listAllPosts, userId } = useContext(AuthorizationContext);
  const [url, setURL] = useState<string>("");
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [comment, setComment] = useState<string>("");
  const [LikeLocal, setLikeLocal] = useState<boolean>();

  const handleShowComments = () => {
    setShowComments(true);
  };

  const handleAddComment = (comment: string) => {
    setComments([...comments, comment]);
  };

  useEffect(() => {
    getImageURL(props.imageURL).then((url: string) => setURL(url));

  },[isLiked]);
  const [isExtended, setIsExtended] = useState(false);
  const [div, setDiv] = useState<string>("");

 const handleClick = (ImageID:string) => {
   setIsExtended(!isExtended);
   if (isExtended) {
     setDiv("OK");
   } else {
     setDiv("");
   }
 };

 
  const HandleLike = async (
    ImageID: string,
    userID: string,
    isLiked: boolean) => {
    listAllPosts().then((posts: any) => {
     posts.forEach((doc: any) => {
      // doc.data() is never undefined for query doc snapshots
      if (ImageID === doc.data().ImageID) {
         updateDoc(doc.ref, {
          likes: {
            [userID]: !isLiked,
          },
        });
    }})
    });
    const userRef = Ref(database, `users/${userID}`);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val();
    if (!userData.likes) {
      userData.Likes = [];
    }
    userData.Likes.push(ImageID);
    await update(userRef, userData);
    return !isLiked
  };

 function LocalLikeHandler ()
 {
   const iLiked = HandleLike(props.ImageID, userId, isLiked);
   console.log(isLiked)
 }


  return (
    <div className="w-auto bg-white border-solid border-b-4 border-t-4 border-grey-100 rounded-lg p-4 mb-4 flex justify-center">
      <Card
        className="w-4/5 text-gray-700 mb-2 border-2 border-grey-100 "
        sx={{ maxWidth: "auto" }}
      >
        <CardMedia
          className="w-full rounded-lg mb-2"
          sx={{ height: 500 }}
          image={url}
          title={props.Name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Caption
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.caption}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => LocalLikeHandler()}>
            {isLiked
              ? "Liked"
              : "Like"}
          </Button>
          <Button
            size="small"
            id="comments"
            onClick={() => handleClick(props.ImageID)}
          >
            Comments
          </Button>
          <div></div>
        </CardActions>
        {isExtended ? (
          <div>
            <div className="w-full max-w-5xl mx-auto">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Comments</h2>
                <ul className="divide-y divide-gray-200">
                  <li className="py-4">
                    <div className="flex items-center">
                      <div>
                        <h4 className="font-semibold">
                          {Object.keys(props.comments).map((commentKey: any) =>
                            commentKey === "userId"
                              ? props.comments[commentKey]
                              : ""
                          )}
                        </h4>
                      </div>
                    </div>
                    <p className="text-gray-800">
                      {Object.keys(props.comments).map((commentKey: any) =>
                        commentKey === "comment"
                          ? props.comments[commentKey]
                          : ""
                      )}
                    </p>
                  </li>
                </ul>
                <div className="mt-6">
                  <input
                    className="w-full h-16 p-2 border rounded-lg focus:ring focus:ring-gray-100 focus:outline-none"
                    placeholder="Write a comment..."
                  />
                  <div className="mt-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </Card>
    </div>
  );
}
    export default Feed;
