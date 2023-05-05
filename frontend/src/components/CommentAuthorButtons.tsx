import React from "react";

interface CommentAuthorButtonsProps {
  isEditActive: boolean;
  onDeleteHandler: () => void;
  onEditHandler: () => void;
  onUpdateHandler: () => void;
}

export const CommentAuthorButtons = ({
  isEditActive,
  onDeleteHandler,
  onEditHandler,
  onUpdateHandler,
}: CommentAuthorButtonsProps) => {
  return (
    <>
      {isEditActive ? (
        <button
          className={`bg-moderateBlue px-4 py-2 text-white rounded-md`}
          onClick={onUpdateHandler}
          aria-label="send update comment"
        >
          UPDATE
        </button>
      ) : (
        <div className="flex gap-3 px-3">
          <button
            className="flex items-center gap-1 text-softRed font-bold"
            onClick={onDeleteHandler}
            aria-label="delete comment"
          >
            <img src="./images/icon-delete.svg" alt="edit-icon" />
            Delete
          </button>
          <button
            className="flex items-center gap-1 text-moderateBlue font-bold"
            onClick={onEditHandler}
            aria-label="update comment"
          >
            <img src="./images/icon-edit.svg" alt="edit-icon" />
            Edit
          </button>
        </div>
      )}
    </>
  );
};
