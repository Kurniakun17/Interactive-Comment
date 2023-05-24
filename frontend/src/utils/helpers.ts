import { CommentProps, newCommentObj } from "./interfaces";
import axios from 'axios';

export const generateNewComment = async (
  newCommentObj
: newCommentObj) => {
  try {
    const createdAt = Date.now().toString();
    newCommentObj.createdAt = createdAt;
    const res = await axios.post("https://interactive-comment-production.up.railway.app/comment/addComment", newCommentObj)
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
  axios.put('https://interactive-comment-production.up.railway.app/comment/' + id, {
    content: updatedComment
  })
  const comment = comments.filter((comment:CommentProps)=> comment._id === id);
  comment[0].content = updatedComment;
  return comments;
}

export const deleteComment = (comments: CommentProps[], id: number): CommentProps[] => {
  try {
    axios.delete('https://interactive-comment-production.up.railway.app/comment/' + id);
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
  axios.put("https://interactive-comment-production.up.railway.app/comment/upvote", upvoteObj)
}

export const downvoteScore = (downvoteObj: voteObjProps) => {
  axios.put("https://interactive-comment-production.up.railway.app/comment/downvote", downvoteObj)
}

export const loginHandler = async (username: string, password: string) => {
  try {
    const res = await axios.post('https://interactive-comment-production.up.railway.app/user/login', {
      username, password
    })
    return res.data.data[0];
  } catch (error:any) {
    return error.message
  }
}

export const registerHandler = async (username: string, password: string) => {
  try {
    const res = await axios.post('https://interactive-comment-production.up.railway.app/user/register', {
      username, password
    })
    return res.data.data;
  } catch (error:any) {
    return error.message
  }
}
