import React, { useState } from "react";
import { CurrentUser } from "../utils/interfaces";
import * as Types from "../utils/interfaces";
import { addReply, editComment, findCommentObj, generateNewComment } from "../utils/helpers";

interface AddComment {
  id: number;
  isFocus: boolean;
  type: string;
  currentUser: CurrentUser;
  replyingTo?: { id: number; username: string };
  setDatas: React.Dispatch<React.SetStateAction<Types.Comment[]>>;
  closeReply: () => void;
}

export const AddComment = ({
  id,
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
    setDatas((prev: Types.Comment[]) => {
      const newComment = generateNewComment({
        content,
        imagePng: currentUser.image.png,
        imageWebp: currentUser.image.webp,
        username: currentUser.username,
      }) as Types.Comment;
      if (type === "Add Reply") {
        newComment["replyingTo"] = replyingTo?.username;
        addReply(prev, id, newComment);
        return prev;
      }
      return [...prev, newComment];
    });
    closeReply();
  };

  return (
    <div className="flex flex-col px-4 py-4 bg-white rounded-md gap-4">
      <textarea
        onChange={(e) => inputHandler(e)}
        value={content}
        className="border-2 rounded px-4 py-2 h-24 resize-none"
        placeholder="Add a comment...."
        required={true}
        autoFocus={isFocus}
      />
      <div className="flex justify-between items-center">
        <img className="w-8 h-8" src={currentUser.image.webp} alt="" />
        <button
          className={`${
            content === "" ? "bg-slate-400" : "bg-moderateBlue"
          } px-4 py-2 text-white rounded-md`}
          onClick={onSendHandler}
          disabled={content === ""}
        >
          SEND
        </button>
      </div>
    </div>
  );
};
