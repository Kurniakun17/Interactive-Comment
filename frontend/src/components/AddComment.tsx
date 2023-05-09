import React, { useState } from "react";
import { CurrentUser } from "../utils/interfaces";
import * as Types from "../utils/interfaces";
import { addReply, generateNewComment } from "../utils/helpers";

interface AddComment {
  authorId: string;
  isFocus: boolean;
  type: string;
  currentUser: CurrentUser;
  replyingTo?: { id: number; username: string };
  setDatas: React.Dispatch<React.SetStateAction<Types.CommentProps[]>>;
  closeReply: () => void;
}

export const AddComment = ({
  authorId,
  type,
  currentUser,
  isFocus,
  replyingTo,
  setDatas,
  closeReply,
}: AddComment) => {
  const [content, setContent] = useState(``);

  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSendHandler = () => {
    setContent("");
    generateNewComment({
      content,
      authorId,
    });
    closeReply();
  };

  return (
    <div className="flex flex-col p-4 desktop:p-6 bg-white rounded-md gap-4 desktop:flex-row justify-between shadow-sm">
      <img
        className="hidden w-8 h-8 desktop:block"
        src={currentUser.image.webp}
        alt=""
      />
      <textarea
        onChange={(e) => inputHandler(e)}
        value={content}
        className="border-2 rounded px-4 py-2 h-24 resize-none desktop:w-full hover:cursor-pointer hover:border-lightGrayish focus:outline-moderateBlue focus:cursor-text"
        placeholder="Add a comment...."
        required={true}
        autoFocus={isFocus}
      />
      <button
        className={`hidden desktop:block bg-moderateBlue px-4 py-2 text-white rounded-md desktop:h-fit hover:cursor-pointer`}
        onClick={onSendHandler}
        disabled={content === ""}
        aria-label="send comment"
      >
        SEND
      </button>
      <div className="flex justify-between items-center desktop:hidden">
        <img className="w-8 h-8" src={currentUser.image.webp} alt="" />
        <button
          className={`bg-moderateBlue px-4 py-2 text-white rounded-md hover:cursor-pointer hover:bg-lightGrayish`}
          onClick={onSendHandler}
          disabled={content === ""}
          aria-label="send comment"
        >
          SEND
        </button>
      </div>
    </div>
  );
};
