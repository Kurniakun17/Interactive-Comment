import React, { useEffect, useState } from "react";
import data from "../utils/data.json";
import { CommentProps, CurrentUser, newCommentObj } from "../utils/interfaces";
import { Comment } from "./Comment";
import { AddComment } from "./AddComment";
import { fetchData } from "../utils/fetch";
import { Loading } from "./Loading";

export const CommentsList = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(data.currentUser);
  const [datas, setDatas] = useState<CommentProps[]>([]);
  const [activeReplyIndex, setActiveReplyIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const commentObj: newCommentObj = {
    author: currentUser._id,
    createdAt: "",
    content: "",
  };

  useEffect(() => {
    fetchData(setDatas, setIsLoading);
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

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="flex flex-col gap-4 w-[600px] desktop:w-[700px]">
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
              currentUser={currentUser}
              setDatas={setDatas}
              closeReply={closeReply}
              setIsLoading={setIsLoading}
            ></Comment>
          );
        })}
      <AddComment
        setDatas={setDatas}
        currentUser={currentUser}
        closeReply={closeReply}
        isFocus={false}
        setIsLoading={setIsLoading}
        commentObj={commentObj}
      ></AddComment>
    </div>
  );
};
