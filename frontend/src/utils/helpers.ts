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
