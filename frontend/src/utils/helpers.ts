import { CommentProps, newCommentObj } from "./interfaces";
import axios from 'axios';

// export const baseURL = 'https://interactive-comment-production.up.railway.app'  
export const baseURL = 'http://localhost:5000'  

export const generateNewComment = async (
  newCommentObj
: newCommentObj) => {
  try {
    const createdAt = Date.now().toString();
    newCommentObj.createdAt = createdAt;
    const res = await axios.post(`${baseURL}/comment/addComment`, newCommentObj)
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const editComment =  (
  comments: CommentProps[],
  id:number,
  updatedComment: string
) : CommentProps[] => {
  axios.put(`${baseURL}/comment/'`+ id, {
    content: updatedComment
  })
  const comment = comments.filter((comment:CommentProps)=> comment._id === id);
  comment[0].content = updatedComment;
  return comments;
}

export const deleteComment = (comments: CommentProps[], id: number): CommentProps[] => {
  try {
    axios.delete(`${baseURL}/comment/`+ id);
    return comments.filter((comment: CommentProps) => comment._id !== id); 
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
}

type voteObjProps = {
  commentId: string,
  userId: string,
}

export const upvoteScore = (upvoteObj: voteObjProps) => {
  axios.put(`${baseURL}/comment/upvote`, upvoteObj)
}

export const downvoteScore = (downvoteObj: voteObjProps) => {
  axios.put(`${baseURL}/comment/downvote`, downvoteObj)
}

export const loginHandler = async (username: string, password: string) => {
  try {
    const res = await axios.post(`${baseURL}/user/login`, {
      username, password
    })
    return res.data.data[0];
  } catch (error:any) {
    return error.message
  }
}

export const registerHandler = async (username: string, password: string) => {
  try {
    const res = await axios.post(`${baseURL}/user/register`, {
      username, password
    })
    return res.data.data;
  } catch (error:any) {
    return error.message
  }
}