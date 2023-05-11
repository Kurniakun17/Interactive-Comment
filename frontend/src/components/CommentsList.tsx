import React, { useContext, useEffect, useState } from "react";
import { CommentProps, newCommentObj } from "../utils/interfaces";
import { Comment } from "./Comment";
import { AddComment } from "./AddComment";
import { fetchData } from "../utils/fetch";
import { DataContext } from "../utils/Contexts";
import { Loading } from "./Loading";

export const CommentsList = () => {
  const [datas, setDatas] = useState<CommentProps[]>([]);
  const [activeReplyIndex, setActiveReplyIndex] = useState(-1);
  const { user, loading, setLoading } = useContext(DataContext);

  const commentObj: newCommentObj = {
    author: user._id,
    createdAt: "",
    content: "",
  };

  useEffect(() => {
    fetchData(setDatas, setLoading);
  }, []);

  const getReplies = (parentId: number): CommentProps[] => {
    const replies = datas.filter(
      (comment) => comment.parentId === parentId.toString()
    );
    return replies;
  };

  const closeReply = () => {
    setActiveReplyIndex(-1);
  };

  if (loading) {
    return <Loading></Loading>;
  }

  

  return (
    <div className="flex flex-col gap-4 w-[600px] desktop:w-[700px] transition-transform">
      {datas
        .filter((comment: CommentProps) => !comment.parentId)
        .map((comment: CommentProps, index: number) => {
          return (
            <Comment
              key={index}
              activeReplyIndex={activeReplyIndex}
              setActiveReplyIndex={setActiveReplyIndex}
              isReplyActive={activeReplyIndex === comment._id}
              {...comment}
              getReplies={getReplies}
              user={user}
              setDatas={setDatas}
              closeReply={closeReply}
            ></Comment>
          );
        })}
      <AddComment
        isReplyActive={true}
        setDatas={setDatas}
        user={user}
        closeReply={closeReply}
        isFocus={false}
        commentObj={commentObj}
      ></AddComment>
    </div>
  );
};
