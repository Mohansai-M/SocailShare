import React, { useContext, useEffect, useState } from "react";
import "./MainPage.css";
import { AuthorizationContext } from "../../ContextAPI";
import 'tailwindcss/tailwind.css';
import Feed from "../Feed/Feed";

function MainPage() {
  const {
    handleCreateNewListing,
    FilteredPosts,
    LikedBy,
    PostDocs,
    listAllPosts,FilterAllPosts,
  } = useContext(AuthorizationContext);

  const [Post, setPost] = useState<File | null>(null);
  const [Posts, setPosts] = useState<any | null>([]);
  const [Name, setName] = useState("");
  const [Caption, setCaption] = useState("");

  const HandlePostUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(e)
    if (files && files.length > 0) {
      const file = files[0];
      setName(file.name)
      setPost(file);
    } else {
      setPost(null);
    }
  };
    
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    await handleCreateNewListing(Name, Post, Caption);
  };

useEffect(() => {
  console.log(PostDocs);
  //FilterAllPosts();
},[]);

  return (
    <div className="mainPage col-span-4 rounded-xl shadow border h-30  bg-gray-50">
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={HandlePostUpload} />
        <input onChange={(e) => setCaption(e.target.value)} type="text" />
        <button type="submit">Create</button>
      </form>

      <div>
        {FilteredPosts.map((localpost: any) => (
          <div key={localpost.ImageID} id={localpost.ImageID}>
            <Feed {...localpost} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
