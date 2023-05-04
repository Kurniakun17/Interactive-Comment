import { Comment } from "./interfaces";

export function findCommentObj(
  obj: Comment | Comment[],
  id: number
): Comment | null {
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
  comments: Comment[],
  parentCommentId: number,
  reply: Comment
): void {
  const parentComment = findCommentObj(comments, parentCommentId);

  if (parentComment) {
    if (!parentComment["replies"]) {
      parentComment["replies"] = [];
    }
    parentComment.replies?.push(reply);
    console.log(parentComment);
  }
}

export function editComment(
  comments: Comment[],
  parentCommentId: number,
  reply: string
) {
  const parentComment = findCommentObj(comments, parentCommentId);

  if (parentComment) {
    parentComment.content = reply;
  }
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
