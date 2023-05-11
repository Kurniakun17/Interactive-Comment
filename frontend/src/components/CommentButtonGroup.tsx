import React from "react";
import { CommentAuthorButtons } from "./CommentAuthorButtons";
import { ReplyButton } from "./ReplyButton";

interface CommentButtonGroupProps {
  isAuthor: boolean;
  isEditActive: boolean;
  onToggleModalHandler: () => void;
  onEditHandler: () => void;
  onUpdateHandler: () => void;
  onReplyHandler: () => void;
}

export const CommentButtonGroup = ({
  isAuthor,
  isEditActive,
  onToggleModalHandler,
  onEditHandler,
  onUpdateHandler,
  onReplyHandler,
}: CommentButtonGroupProps) => {
  return (
    <>
      {isAuthor ? (
        <CommentAuthorButtons
          isEditActive={isEditActive}
          onToggleModalHandler={onToggleModalHandler}
          onEditHandler={onEditHandler}
          onUpdateHandler={onUpdateHandler}
        ></CommentAuthorButtons>
      ) : (
        <ReplyButton onReplyHandler={onReplyHandler} onToggleModalHandler={onToggleModalHandler}></ReplyButton>
      )}
    </>
  );
};
