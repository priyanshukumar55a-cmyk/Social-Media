import { createContext,useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";

export const PostListContext = createContext({
  postList:[],
  addPost:()=>{},
  deletePost:()=>{},
  addInitialPosts:()=>{},
});

const postListReducer=(currPostList,action)=>{
  let newPostList=currPostList;
  if(action.type==="DELETE_POST"){
    newPostList=currPostList.filter(post=>post.id!==action.payload.postId)
  }
  else if(action.type==="ADD_POST"){
    newPostList=[action.payload,...currPostList]
  }
  else if(action.type==="ADD_INITIAL_POSTS"){
    newPostList=action.payload.posts;
  }
  return newPostList;
}

const PostListProvider=({children})=>{
  const [postList,disPatchPostList]= useReducer(postListReducer,[])
  
  const addPost=(post)=>{
    disPatchPostList({
      type:"ADD_POST",
      payload:post,
    })
  }

  const addInitialPosts=(posts)=>{
    disPatchPostList({
      type:"ADD_INITIAL_POSTS",
      payload:{
        posts,
      }
    })
  }
  const deletePost=(postId)=>{
    disPatchPostList({
      type:"DELETE_POST",
      payload:{
        postId,
      }
    })
  }

  return <PostListContext.Provider value={
    {postList,addPost,deletePost,addInitialPosts}}>
    {children}
  </PostListContext.Provider>
}

export default PostListProvider;