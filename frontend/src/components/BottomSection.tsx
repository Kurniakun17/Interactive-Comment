import React from "react";
import { Score } from "./Score";
import { CommentButtonGroup } from "./CommentButtonGroup";

interface BottomSection {
  score: number;
  isAuthor: boolean;
  isEditActive: boolean;
  upvotedStatus: boolean;
  downvotedStatus: boolean;
  onEditHandler: () => void;
  onUpdateHandler: () => void;
  onToggleModalHandler: () => void;
  onReplyHandler: () => void;
}

export const BottomSection = ({
  score,
  isAuthor,
  isEditActive,
  upvotedStatus,
  downvotedStatus,
  onEditHandler,
  onUpdateHandler,
  onToggleModalHandler,
  onReplyHandler,
}: BottomSection) => {
  return (
    <div className="flex justify-between desktop:hidden">
      <Score
        score={score}
        upvotedStatus={upvotedStatus}
        downvotedStatus={upvotedStatus}
      ></Score>
      <CommentButtonGroup
        isAuthor={isAuthor}
        isEditActive={isEditActive}
        onReplyHandler={onReplyHandler}
        onToggleModalHandler={onToggleModalHandler}
        onEditHandler={onEditHandler}
        onUpdateHandler={onUpdateHandler}
      ></CommentButtonGroup>
    </div>
  );
};
