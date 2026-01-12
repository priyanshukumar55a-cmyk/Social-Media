import { useContext } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";
import { useLoaderData } from "react-router-dom";

const PostList=()=>{
  const postList = useLoaderData();

  return(
    <>
    {postList.length===0 && <WelcomeMessage />}
    {postList.map(post=><Post key={post.id} post={post}/>)}
    </>
  )
}

export const postLoader=()=>{
  return fetch('https://dummyjson.com/posts')
      .then(res => res.json())
      .then(data=>(data.posts));
}

export default PostList;