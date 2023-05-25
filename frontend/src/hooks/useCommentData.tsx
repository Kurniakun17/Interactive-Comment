import React, { useEffect, useState } from "react";
import { CommentProps } from "../utils/interfaces";
import { fetchCommentData } from "../utils/fetch";
export const useCommentData = (setLoading: (boolean: boolean) => void) => {
  const [datas, setDatas] = useState<CommentProps[]>([]);

  useEffect(() => {
    fetchCommentData(setDatas, setLoading);
  }, []);

  const getReplies = (parentId: number): CommentProps[] => {
    const replies = datas.filter(
      (comment) => comment.parentId === parentId.toString()
    );
    return replies;
  };

  return { datas, setDatas, getReplies };
};
