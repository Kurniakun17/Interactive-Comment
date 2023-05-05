export interface CommentProps {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies?: CommentProps[];
  replyingTo?: string;
}

export interface CurrentUser {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

export interface Data {
  currentUser: CurrentUser;
  comments: CommentProps[];
}
