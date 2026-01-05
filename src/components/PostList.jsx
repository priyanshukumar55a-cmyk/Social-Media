import { useContext } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import { useEffect } from "react";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const PostList=()=>{
  const {postList,addInitialPosts} = useContext(PostListData)
  const [fetching,setFetching] = useState(false);

  useEffect(()=>{
    if (postList.length > 0) return;

    const controller=new AbortController();
    const signal=controller.signal;

    setFetching(true);
    fetch('https://dummyjson.com/posts' , {signal})
    .then(res => res.json())
    .then(data=>{
      addInitialPosts(data.posts);
      setFetching(false);
    });

    return()=>{
      console.log("cleaning up UseEffect.")
      controller.abort();
    }
  },[])

  return(
    <>
    {fetching && <LoadingSpinner/>}
    {!fetching && !<LoadingSpinner/> && postList.length===0 && <WelcomeMessage />}
    {!fetching && postList.map(post=><Post key={post.id} post={post}/>)}
    </>
  )
}
export default PostList;