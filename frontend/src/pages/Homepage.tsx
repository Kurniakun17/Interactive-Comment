import React, { useContext, useEffect, useState } from "react";
import { CommentsList } from "../components/CommentsList";
import { fetchData } from "../utils/fetch";
import { CommentProps, newCommentObj } from "../utils/interfaces";
import { DataContext } from "../utils/Contexts";
import { Loading } from "../components/Loading";

export default function Homepage() {
  const [datas, setDatas] = useState<CommentProps[]>([]);
  const [activeReplyIndex, setActiveReplyIndex] = useState(-1);
  const { user, loading, setLoading } = useContext(DataContext);

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
    <div className="bg-veryLightGray font-rubik flex justify-center items-center min-h-screen py-8 px-4">
      <CommentsList
        closeReply={closeReply}
        getReplies={getReplies}
        activeReplyIndex={activeReplyIndex}
        setActiveReplyIndex={setActiveReplyIndex}
        setDatas={setDatas}
        datas={datas}
      ></CommentsList>
    </div>
  );
}
