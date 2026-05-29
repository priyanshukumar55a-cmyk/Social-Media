import { createContext,useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getItemsFromServer, deleteItemFromServer, addItemToServer } from "../services/itemServices";

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
  
  const addPost= async (post)=>{
    try{
      const serverPost= await addItemToServer(post);
      disPatchPostList({
        type:"ADD_POST",
        payload:serverPost,
      })
    } catch (error) {
      console.error("Error adding post:", error);
    }
  }

  const addInitialPosts=async (posts)=>{
    try{
      const serverPosts= await getItemsFromServer();
      disPatchPostList({
        type:"ADD_INITIAL_POSTS",
        payload:{
          posts:serverPosts,
        }
      })
    } catch (error) {
      console.error("Error fetching initial posts:", error);
    }
  }

  const deletePost=async (postId)=>{
    try{
      const deletedPostId= await deleteItemFromServer(postId);
      disPatchPostList({
        type:"DELETE_POST",
        payload:{
          postId:deletedPostId,
        }
      })
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  return <PostListContext.Provider value={
    {postList, addPost,deletePost,addInitialPosts}}>
    {children}
  </PostListContext.Provider>
}

export default PostListProvider;