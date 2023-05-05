import React from "react";
import { CommentAuthorButtons } from "./CommentAuthorButtons";
import { ReplyButton } from "./ReplyButton";

interface CommentButtonGroupProps {
  isAuthor: boolean;
  isEditActive: boolean;
  onDeleteHandler: () => void;
  onEditHandler: () => void;
  onUpdateHandler: () => void;
  onReplyHandler: () => void;
}

export const CommentButtonGroup = ({
  isAuthor,
  isEditActive,
  onDeleteHandler,
  onEditHandler,
  onUpdateHandler,
  onReplyHandler,
}: CommentButtonGroupProps) => {
  return (
    <>
      {isAuthor ? (
        <CommentAuthorButtons
          isEditActive={isEditActive}
          onDeleteHandler={onDeleteHandler}
          onEditHandler={onEditHandler}
          onUpdateHandler={onUpdateHandler}
        ></CommentAuthorButtons>
      ) : (
        <ReplyButton onReplyHandler={onReplyHandler}></ReplyButton>
      )}
    </>
  );
};
