import React, { useContext, useEffect, useState } from "react";
import "./MainPage.css";
import { AuthorizationContext } from "../../ContextAPI";
import "tailwindcss/tailwind.css";
import Feed from "../Feed/Feed";


function MainPage() {
  const {
    handleCreateNewListing,
    FilteredPosts,
    userId,
    Following,
    listAllPosts,
    setFilteredPosts,
    setLikedBy,
  } = useContext(AuthorizationContext);

  const [Post, setPost] = useState<File | null>(null);
  const [Posts, setPosts] = useState<any | null>([]);
  const [Name, setName] = useState("");
  const [Caption, setCaption] = useState("");
  const [CommonPosts, setCommonPosts] = useState<any | null>([]);
  const [CommonIds, setCommonIds] = useState<any | null>([]);

  const HandlePostUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(e);
    if (files && files.length > 0) {
      const file = files[0];
      setName(file.name);
      setPost(file);
    } else {
      setPost(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleCreateNewListing(Name, Post, Caption);
  };

  const LikedPostsFilter =  (FilteredLocal: any[]) => {
    const LikedPosts: any[] = [];
    FilteredLocal.map((post: any) => {
      if (userId === Object.keys(post.likes)[0]) {
        LikedPosts.push(post.ImageID);
      }
      setLikedBy(LikedPosts);
    });

    return LikedPosts;
  };

  const FilterPosts = (postsByFriends: any[]) => {
    const FilteredLocal: any[] = [];
    postsByFriends.filter((post: any) => {
      if (Following && Object.keys(Following).length > 0) {
        const isFriend = post.userID in Following;
        if (isFriend) {
          FilteredLocal.push(post);
        }
      }
    });


    setFilteredPosts(FilteredLocal);
    return FilteredLocal;
  };

  const FilterLikes = (LikesLocal: any[]) => {
    const commonPostsIds = new Set(
      LikesLocal.map((LikedPost: any) => LikedPost)
    );
    setCommonIds(commonPostsIds);

    const commonPosts = FilteredPosts.filter((post: any) =>
      commonPostsIds.has(post.id)
    );
    setCommonPosts(commonPosts);
  };
  useEffect(() => {
    console.log("ok")
    const postsByFriends: any[] = [];
   listAllPosts().then((posts: any) => {
     posts.forEach((doc: any) => {
       postsByFriends.push(doc.data());
     });
     const FilteredLocal = FilterPosts(postsByFriends);
     const LikesLocal = LikedPostsFilter(FilteredLocal);
      const commonPostsIds = new Set(
        LikesLocal.map((LikedPost: any) => LikedPost)
      );
      setCommonIds(commonPostsIds);
     setPosts(postsByFriends);
   });
  },[Following]);

  return (
    <div className="mainPage col-span-4 rounded-xl border h-30 white">
  
  <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
  <input type="file" accept="image/*" onChange={HandlePostUpload} className="py-2 px-4 border rounded-lg" />
  <input onChange={(e) => setCaption(e.target.value)} type="text" className="py-2 px-4 border rounded-lg" placeholder="Provide a Caption"/>
  <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Post</button>
</form>

      <div>
        {FilteredPosts.filter((post: any) => CommonIds.has(post.ImageID)).map(
          (post: any) => (
            <Feed key={post.id} post={post} isLiked={true} {...post} />
          )
        )}
        {FilteredPosts.filter((post: any) => !CommonIds.has(post.ImageID)).map(
          (post: any) => (
            <Feed key={post.id} post={post} isLiked={false} {...post} />
          )
        )}
      </div>
    </div>
  );
}

export default MainPage;
