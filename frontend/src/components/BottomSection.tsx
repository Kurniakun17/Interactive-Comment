import React from "react";
import { Score } from "./Score";
import { CommentButtonGroup } from "./CommentButtonGroup";

interface BottomSection {
  _id: string;
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
  _id,
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
        _id={_id}
        score={score}
        upvotedStatus={upvotedStatus}
        downvotedStatus={downvotedStatus}
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
