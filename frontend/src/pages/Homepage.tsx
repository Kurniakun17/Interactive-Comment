import React, { useContext, useEffect, useState } from "react";
import { CommentsList } from "../components/CommentsList";
import { newCommentObj } from "../utils/interfaces";
import { DataContext } from "../utils/Contexts";
import { Navbar } from "../components/Navbar";
import { AddComment } from "../components/AddComment";
import { useCommentData } from "../hooks/useCommentData";

export default function Homepage() {
  const { user, setLoading } = useContext(DataContext);
  const { datas, setDatas, getReplies } = useCommentData(setLoading);
  const [activeReplyIndex, setActiveReplyIndex] = useState(-1);
  const commentObj: newCommentObj = {
    author: user._id,
    createdAt: "",
    content: "",
  };

  const closeReply = () => {
    setActiveReplyIndex(-1);
  };

  return (
    <div className="font-rubik flex flex-col w-[90%] max-w-[600px] desktop:max-w-[700px] items-center justify-between pb-4 gap-4">
      <div className="flex flex-col w-full h-full gap-4">
        <Navbar></Navbar>
        <CommentsList
          closeReply={closeReply}
          getReplies={getReplies}
          activeReplyIndex={activeReplyIndex}
          setActiveReplyIndex={setActiveReplyIndex}
          setDatas={setDatas}
          datas={datas}
        ></CommentsList>
      </div>
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
}
