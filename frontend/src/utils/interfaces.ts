export interface CommentProps {
  _id: number;
  content: string;
  createdAt: string;
  score: number;
  author: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
    _id: number;
  };
  replies?: CommentProps[];
  parentId?: string;
  upvotedBy: string[];
  downvotedBy: string[];
}

export interface userProps {
  image: {
    png: string;
    webp: string;
  };
  username: string;
  _id: string
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