import { useContext, useState } from "react";
import Post from "./Post";
import { PostListContext  } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";

const PostList=()=>{
  const { addInitialPosts, postList } = useContext(PostListContext );
  const loadedPosts = useLoaderData();

  useEffect(() => {
    addInitialPosts(loadedPosts);
  }, [loadedPosts]);

  if (postList.length === 0) return <WelcomeMessage />;

  return (
    <>
      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}

export const postLoader=()=>{
  return fetch('https://dummyjson.com/posts')
      .then(res => res.json())
      .then(data=>(data.posts));
}

export default PostList;