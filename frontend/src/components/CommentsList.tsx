import React, { useEffect, useState } from "react";
import data from "../utils/data.json";
import * as Types from "../utils/interfaces";
import { Comment } from "./Comment";
import { AddComment } from "./AddComment";
import { fetchData } from "../utils/helpers";
import { Loading } from "./Loading";

export const CommentsList = () => {
  const [currentUser, setCurrentUser] = useState<Types.CurrentUser>(
    data.currentUser
  );
  const [datas, setDatas] = useState<Types.CommentProps[]>([]);
  const [activeReplyIndex, setActiveReplyIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const res = await fetchData();
      console.log(res);
      setDatas(res);
      setIsLoading(false);
    };
    fetchDataAsync();
  }, []);

  const closeReply = () => {
    setActiveReplyIndex(-1);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="flex flex-col gap-4 w-[600px] desktop:w-[700px]">
      {datas.map((comment: Types.CommentProps, index: number) => {
        return (
          <Comment
            key={index}
            activeReplyIndex={activeReplyIndex}
            setActiveReplyIndex={setActiveReplyIndex}
            isReplyActive={activeReplyIndex === comment.id}
            {...comment}
            currentUser={currentUser}
            setDatas={setDatas}
            closeReply={closeReply}
          ></Comment>
        );
      })}
      <AddComment
        setDatas={setDatas}
        currentUser={currentUser}
        authorId={currentUser._id}
        closeReply={closeReply}
        isFocus={false}
        type="Add Comment"
      ></AddComment>
    </div>
  );
};
