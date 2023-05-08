import React from "react";
import { Score } from "./Score";
import { CommentButtonGroup } from "./CommentButtonGroup";

interface BottomSection {
  score: number;
  isAuthor: boolean;
  isEditActive: boolean;
  onEditHandler: () => void;
  onUpdateHandler: () => void;
  onDeleteHandler: () => void;
  onReplyHandler: () => void;
}

export const BottomSection = ({
  score,
  isAuthor,
  isEditActive,
  onEditHandler,
  onUpdateHandler,
  onDeleteHandler,
  onReplyHandler,
}: BottomSection) => {
  return (
    <div className="flex justify-between desktop:hidden">
      <Score score={score}></Score>
      <CommentButtonGroup
        isAuthor={isAuthor}
        isEditActive={isEditActive}
        onReplyHandler={onReplyHandler}
        onDeleteHandler={onDeleteHandler}
        onEditHandler={onEditHandler}
        onUpdateHandler={onUpdateHandler}
      ></CommentButtonGroup>
    </div>
  );
};
