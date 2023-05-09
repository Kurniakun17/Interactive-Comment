import { CommentProps } from "./interfaces";
import axios from 'axios';

export async function fetchData(){
  try{
    const res = await axios.get('http://localhost:3000/comment');
    return res.data.data as CommentProps[];
  }catch(error){
    return [];
  }
}

export function findCommentObj(
  obj: CommentProps | CommentProps[],
  id: number
): CommentProps | null {
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const result = findCommentObj(item, id);
      if (result !== null) {
        return result;
      }
    }
  } else {
    if (obj.id === id) {
      return obj;
    }
    if (Array.isArray(obj.replies) && obj.replies.length > 0) {
      const result = findCommentObj(obj.replies, id);
      if (result !== null) {
        return result;
      }
    }
  }
  return null;
}

export function addReply(
  comments: CommentProps[],
  parentCommentId: number,
  reply: CommentProps
): void {
  const parentComment = findCommentObj(comments, parentCommentId);

  if (parentComment) {
    if (!parentComment["replies"]) {
      parentComment["replies"] = [];
    }
    parentComment.replies?.push(reply);
  }
}

export function editComment(
  comments: CommentProps[],
  parentCommentId: number,
  reply: string
) {
  const parentComment = findCommentObj(comments, parentCommentId);

  if (parentComment) {
    parentComment.content = reply;
  }
}

export function deleteComment(comments: CommentProps[], id: number) {
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    if (comment.id === id) {
      comments.splice(i, 1);
      return true;
    }
    if (comment.replies && comment.replies.length > 0) {
      if (deleteComment(comment.replies, id)) {
        return true;
      }
    }
  }
  return false;
}

type generateNewCommentProps = {
  content: string;
  imagePng: string;
  imageWebp: string;
  username: string;
};

export function generateNewComment({
  content,
  imagePng,
  imageWebp,
  username,
}: generateNewCommentProps) {
  const date = new Date();
  console.log(date);
  return {
    id: Math.random() * 1000,
    content,
    createdAt: "now",
    score: 0,
    user: {
      image: {
        png: imagePng,
        webp: imageWebp,
      },
      username,
    },
    replies: [],
  };
}
