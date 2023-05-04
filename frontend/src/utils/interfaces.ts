interface Comment {
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
  replies?: Comment[];
  replyingTo?: string;
}

interface CurrentUser {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

interface Data {
  currentUser: CurrentUser;
  comments: Comment[];
}

export type { Comment, CurrentUser, Data };
