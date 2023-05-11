import { CommentProps, newCommentObj } from "./interfaces";
import axios from 'axios';

export const generateNewComment = async (
  newCommentObj
: newCommentObj) => {
  try {
    const createdAt = Date.now().toString();
    newCommentObj.createdAt = createdAt;
    const res = await axios.post("http://localhost:3000/comment/addComment", newCommentObj)
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
  axios.put('http://localhost:3000/comment/' + id, {
    content: updatedComment
  })
  const comment = comments.filter((comment:CommentProps)=> comment._id === id);
  comment[0].content = updatedComment;
  return comments;
}

export const deleteComment = (comments: CommentProps[], id: number): CommentProps[] => {
  try {
    axios.delete('http://localhost:3000/comment/' + id);
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
  axios.put("http://localhost:3000/comment/upvote", upvoteObj)
}

export const downvoteScore = (downvoteObj: voteObjProps) => {
  axios.put("http://localhost:3000/comment/downvote", downvoteObj)
}