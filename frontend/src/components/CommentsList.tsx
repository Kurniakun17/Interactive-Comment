import React, { useContext, useEffect, useState } from "react";
import { CommentProps, newCommentObj } from "../utils/interfaces";
import { Comment } from "./Comment";
import { DataContext } from "../utils/Contexts";
import { Loading } from "./Loading";
interface CommentsListProps {
  datas: CommentProps[];
  activeReplyIndex: number;
  closeReply: () => void;
  getReplies: (parentId: number) => CommentProps[];
  setActiveReplyIndex: React.Dispatch<React.SetStateAction<number>>;
  setDatas: React.Dispatch<React.SetStateAction<CommentProps[]>>;
}

export const CommentsList = ({
  datas,
  activeReplyIndex,
  closeReply,
  getReplies,
  setActiveReplyIndex,
  setDatas,
}: CommentsListProps) => {
  const { user, loading } = useContext(DataContext);
  console.log(loading);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-4 w-full desktop:w-[700px] transition-transform">
          {datas
            .filter((comment: CommentProps) => !comment.parentId)
            .map((comment: CommentProps, index: number) => {
              return (
                <Comment
                  key={comment._id}
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
        </div>
      )}
    </>
  );
};
