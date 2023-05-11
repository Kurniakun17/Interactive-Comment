import React from "react";
import { userProps } from "../utils/interfaces";
import { CommentButtonGroup } from "./CommentButtonGroup";
import ReactTimeAgo from "react-time-ago";

type TopSection = {
  author: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
    _id: number;
  };
  createdAt: string;
  user: userProps;
  isAuthor: boolean;
  isEditActive: boolean;
  onEditHandler: () => void;
  onUpdateHandler: () => void;
  onToggleModalHandler: () => void;
  onReplyHandler: () => void;
};

export const TopSection = ({
  author,
  createdAt,
  user,
  isAuthor,
  isEditActive,
  onEditHandler,
  onUpdateHandler,
  onToggleModalHandler,
  onReplyHandler,
}: TopSection) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-3">
        <img
          className="w-8 h-8"
          src={author.image.webp}
          alt={author.username}
        />
        <h2 className="text-darkBlue font-bold">{author.username}</h2>
        {user.username === author.username && (
          <div className="px-2 py-0.5 text-[10px] rounded text-white bg-moderateBlue">
            <p>you</p>
          </div>
        )}
        <p className="text-grayishBlue">
          <ReactTimeAgo date={parseInt(createdAt)} locale="en-US" />
        </p>
      </div>
      <div className="hidden desktop:flex">
        <CommentButtonGroup
          isAuthor={isAuthor}
          isEditActive={isEditActive}
          onReplyHandler={onReplyHandler}
          onToggleModalHandler={onToggleModalHandler}
          onEditHandler={onEditHandler}
          onUpdateHandler={onUpdateHandler}
        ></CommentButtonGroup>
      </div>
    </div>
  );
};
