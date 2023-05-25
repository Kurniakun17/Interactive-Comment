import React from "react";

interface CommentAuthorButtonsProps {
  isEditActive: boolean;
  onToggleModalHandler: () => void;
  onEditHandler: () => void;
  onUpdateHandler: () => void;
}

export const CommentAuthorButtons = ({
  isEditActive,
  onToggleModalHandler,
  onEditHandler,
  onUpdateHandler,
}: CommentAuthorButtonsProps) => {
  return (
    <>
      {isEditActive ? (
        <button
          className={`bg-moderateBlue dark:bg-indigo-400 dark:hover:bg-indigo-600 px-4 py-2 text-white rounded-md hover:cursor-pointer hover:bg-lightGrayish`}
          onClick={onUpdateHandler}
          aria-label="send update comment"
        >
          UPDATE
        </button>
      ) : (
        <div className="flex gap-3 px-3">
          <button
            className="flex items-center gap-1 text-softRed font-bold"
            onClick={onToggleModalHandler}
            aria-label="delete comment"
          >
            <img src="./images/icon-delete.svg" alt="edit-icon" />
            Delete
          </button>
          <button
            className="flex items-center gap-1 text-moderateBlue dark:text-indigo-400 font-bold"
            onClick={onEditHandler}
            aria-label="update comment"
          >
            <svg
              width="14"
              height="14"
              className="fill-current text-moderateBlue dark:text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" />
            </svg>
            Edit
          </button>
        </div>
      )}
    </>
  );
};
