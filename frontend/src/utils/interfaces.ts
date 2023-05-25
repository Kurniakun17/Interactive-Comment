export interface CommentProps {
  _id: number;
  content: string;
  createdAt: string;
  score: number;
  author: {
    profilePicture: string;
    username: string;
    _id: number;
  };
  replies?: CommentProps[];
  parentId?: string;
  upvotedBy: string[];
  downvotedBy: string[];
}

export interface userProps {
  _id: string
  username: string;
  profilePicture: string;
}

export interface Data {
  userProps: userProps;
  comments: CommentProps[];
}

export interface newCommentObj {
  author: string,
  content: string,
  createdAt: string,
  parentId?: string
} 