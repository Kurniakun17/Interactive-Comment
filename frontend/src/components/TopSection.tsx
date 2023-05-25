import React from "react";
import { userProps } from "../utils/interfaces";
import { CommentButtonGroup } from "./CommentButtonGroup";
import ReactTimeAgo from "react-time-ago";

type TopSection = {
  author: {
    profilePicture: string;
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
          className="w-8 h-8 bg-gray-200 rounded-full"
          src={`data:image/svg+xml;utf8,${encodeURIComponent(
            author.profilePicture
          )}`}
          alt={author.username}
        />
        <h2 className="text-darkBlue dark:text-white font-bold">
          {author.username}
        </h2>
        {user.username === author.username && (
          <div className="px-2 py-0.5 text-[10px] rounded text-white bg-moderateBlue dark:bg-indigo-400">
            <p>you</p>
          </div>
        )}
        <p className="text-grayishBlue dark:text-lightGray">
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
