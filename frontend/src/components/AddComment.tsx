import React, { useContext, useState } from "react";
import { userProps, newCommentObj } from "../utils/interfaces";
import { CommentProps } from "../utils/interfaces";
import { generateNewComment } from "../utils/helpers";
import { DataContext } from "../utils/Contexts";

interface AddComment {
  commentObj: newCommentObj;
  user: userProps;
  isFocus: boolean;
  replyingTo?: { _id: number; username: string };
  setDatas: React.Dispatch<React.SetStateAction<CommentProps[]>>;
  closeReply: () => void;
}

export const AddComment = ({
  commentObj,
  user,
  isFocus,
  setDatas,
  closeReply,
}: AddComment) => {
  const [content, setContent] = useState("");
  const { setLoading } = useContext(DataContext);
  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  console.log(user);

  const onSendHandler = async () => {
    setLoading(true);
    const newcommentObj = {
      ...commentObj,
      content,
    };
    setContent("");
    const res = await generateNewComment(newcommentObj);
    ``;
    setDatas((prev: CommentProps[]) => {
      return [...prev, res.data].map((comment: CommentProps) => ({
        ...comment,
        key: comment._id,
      }));
    });
    setLoading(false);
    closeReply();
  };

  return (
    <>
      {user.username === "" ? (
        ""
      ) : (
        <div className="flex flex-col w-full p-4 desktop:p-6 bg-white dark:bg-[#232529] rounded-xl gap-4 desktop:flex-row justify-between shadow-md">
          <img
            className="hidden w-8 h-8 desktop:block"
            src={user.image.webp}
            alt="user image"
          />
          <textarea
            onChange={(e) => inputHandler(e)}
            value={content}
            className="border-2 dark:border-slate-500 dark:text-white rounded px-4 py-2 h-24 resize-none desktop:w-full hover:cursor-pointer dark:bg-[#333841] hover:border-lightGrayish focus:outline-moderateBlue focus:cursor-text"
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
            <img className="w-8 h-8" src={user.image.webp} alt="" />
            <button
              className={`bg-moderateBlue dark:bg-indigo-400 px-4 py-2 text-white rounded-md hover:cursor-pointer hover:bg-lightGrayish dark:hover:bg-indigo-600`}
              onClick={onSendHandler}
              disabled={content === ""}
              aria-label="send comment"
            >
              SEND
            </button>
          </div>
        </div>
      )}
    </>
  );
};
