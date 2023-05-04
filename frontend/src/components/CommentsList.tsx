import React, { useEffect, useState } from "react";
import data from "../utils/data.json";
import * as Types from "../utils/interfaces";
import { Comments } from "../components/Comments";
import { AddComment } from "./AddComment";

export const CommentsList = () => {
  const [currentUser, setCurrentUser] = useState<Types.CurrentUser>(
    data.currentUser
  );
  const [datas, setDatas] = useState<Types.Comment[]>(data.comments);
  const [activeReplyIndex, setActiveReplyIndex] = useState(-1);

  const closeReply = () => {
    setActiveReplyIndex(-1);
  };

  return (
    <div className="flex flex-col gap-4">
      {datas.map((comment: Types.Comment, index: number) => {
        return (
          <Comments
            key={index}
            activeReplyIndex={activeReplyIndex}
            setActiveReplyIndex={setActiveReplyIndex}
            isReplyActive={activeReplyIndex === comment.id}
            {...comment}
            currentUser={currentUser}
            setDatas={setDatas}
            closeReply={closeReply}
          ></Comments>
        );
      })}
      <AddComment
        setDatas={setDatas}
        currentUser={currentUser}
        id={1}
        closeReply={closeReply}
        isFocus={false}
        type="Add Comment"
      ></AddComment>
    </div>
  );
};
