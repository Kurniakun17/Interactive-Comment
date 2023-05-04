import React, { useRef, useState } from "react";
import { Comment, CurrentUser } from "../utils/interfaces";
import { TopSection } from "./TopSection";
import { BottomSection } from "./BottomSection";
import * as Types from "../utils/interfaces";
import { AddComment } from "./AddComment";
import { editComment } from "../utils/helpers";

interface Comments extends Comment {
  currentUser: CurrentUser;
  activeReplyIndex: number;
  isReplyActive: boolean;
  setDatas: React.Dispatch<React.SetStateAction<Types.Comment[]>>;
  setActiveReplyIndex: React.Dispatch<React.SetStateAction<number>>;
  closeReply: () => void;
}

export const Comments = ({
  id,
  content,
  createdAt,
  score,
  user,
  replies,
  currentUser,
  replyingTo,
  activeReplyIndex,
  isReplyActive,
  setDatas,
  setActiveReplyIndex,
  closeReply,
}: Comments) => {
  const [isEditActive, setIsEditActive] = useState(false);
  const editInput = useRef(content);

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    editInput.current = e.target.value;
  };

  const onEditClickHandler = () => {
    setIsEditActive(!isEditActive);
  };

  const onSendEditHandler = () => {
    console.log("dijalankan")
    setDatas((prev: Types.Comment[]) => {
      editComment(prev, id, editInput.current);
      return [...prev];
    });
    setIsEditActive(false);
  };

  return (
    <div className="flex flex-col max-w-[600px] gap-2">
      <div className="flex flex-col px-4 py-4 bg-white rounded gap-4">
        <TopSection
          currentUser={currentUser}
          user={user}
          createdAt={createdAt}
        ></TopSection>
        {isEditActive ? (
          <textarea
            className="border-2 rounded px-4 py-2 h-32 resize-none"
            required={true}
            defaultValue={content}
            onChange={(e) => {
              onInputChangeHandler(e);
            }}
          ></textarea>
        ) : (
          <p className="text-grayishBlue">
            {replyingTo && (
              <span className="text-moderateBlue font-bold after:content-['_']">
                @{replyingTo}
              </span>
            )}
            {content}
          </p>
        )}
        <BottomSection
          id={id}
          isAuthor={user.username === currentUser.username}
          isEditActive={isEditActive}
          score={score}
          setDatas={setDatas}
          setActiveIndex={setActiveReplyIndex}
          onEditClickHandler={onEditClickHandler}
          onSendEditHandler={onSendEditHandler}
        ></BottomSection>
      </div>
      {isReplyActive && (
        <AddComment
          closeReply={closeReply}
          setDatas={setDatas}
          currentUser={currentUser}
          id={id}
          replyingTo={{ id, username: user.username }}
          type="Add Reply"
          isFocus={true}
        ></AddComment>
      )}
      {replies?.length ? (
        <div className="flex flex-col gap-4 border-l-[3px] mt-2 pl-4 md:pl-8">
          {replies.map((comment: Comment) => {
            return (
              <Comments
                key={comment.id}
                activeReplyIndex={activeReplyIndex}
                isReplyActive={activeReplyIndex === comment.id}
                setActiveReplyIndex={setActiveReplyIndex}
                currentUser={currentUser}
                {...comment}
                setDatas={setDatas}
                closeReply={closeReply}
              ></Comments>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
