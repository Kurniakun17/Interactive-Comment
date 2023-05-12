import React, { useContext, useEffect, useState } from "react";
import { CommentsList } from "../components/CommentsList";
import { fetchData } from "../utils/fetch";
import { CommentProps, newCommentObj } from "../utils/interfaces";
import { DataContext } from "../utils/Contexts";
import { Loading } from "../components/Loading";
import { Navbar } from "../components/Navbar";
import { AddComment } from "../components/AddComment";

export default function Homepage() {
  const [datas, setDatas] = useState<CommentProps[]>([]);
  const [activeReplyIndex, setActiveReplyIndex] = useState(-1);
  const { user, setLoading } = useContext(DataContext);
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

  return (
    <div className="font-rubik flex flex-col w-[90%] max-w-[600px] desktop:max-w-[700px] items-center min-h-screen gap-4">
      <Navbar></Navbar>
      <CommentsList
        closeReply={closeReply}
        getReplies={getReplies}
        activeReplyIndex={activeReplyIndex}
        setActiveReplyIndex={setActiveReplyIndex}
        setDatas={setDatas}
        datas={datas}
      ></CommentsList>
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
