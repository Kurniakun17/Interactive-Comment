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
  parentId?: string 
}

export interface CurrentUser {
  image: {
    png: string;
    webp: string;
  };
  username: string;
  _id: string
}

export interface Data {
  currentUser: CurrentUser;
  comments: CommentProps[];
}


export interface newCommentObj {
  author: string,
  content: string,
  createdAt: string,
  parentId?: string
} 