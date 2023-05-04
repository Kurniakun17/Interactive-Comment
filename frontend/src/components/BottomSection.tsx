import React from "react";
import { Score } from "./Score";
import * as Types from "../utils/interfaces";

interface BottomSection {
  id: number;
  score: number;
  isAuthor: boolean;
  isEditActive: boolean;
  isReplyActive?: boolean;
  onEditClickHandler: () => void;
  onSendEditHandler: () => void;
  setDatas: React.Dispatch<React.SetStateAction<Types.Comment[]>>;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const BottomSection = ({
  id,
  score,
  isAuthor,
  isEditActive,
  isReplyActive,
  onEditClickHandler,
  onSendEditHandler,
  setDatas,
  setActiveIndex,
}: BottomSection) => {
  const onClickHandler = () => {
    if (isReplyActive) {
      return setActiveIndex(-1);
    }
    setActiveIndex(id);
  };

  return (
    <div className="flex justify-between">
      <Score score={score} setDatas={setDatas}></Score>
      {isAuthor ? (
        isEditActive ? (
          <button
            className={`bg-moderateBlue px-4 py-2 text-white rounded-md`}
            onClick={onSendEditHandler}
          >
            UPDATE
          </button>
        ) : (
          <div className="flex gap-3 px-3">
            <button className="flex items-center gap-1">
              <img src="./images/icon-delete.svg" alt="edit-icon" />
              <p className="text-softRed font-bold">Delete</p>
            </button>
            <button
              className="flex items-center gap-1"
              onClick={onEditClickHandler}
            >
              <img src="./images/icon-edit.svg" alt="edit-icon" />
              <p className="text-moderateBlue font-bold">Edit</p>
            </button>
          </div>
        )
      ) : (
        <button
          className="flex px-3 items-center gap-1"
          onClick={onClickHandler}
        >
          <img className="h-3" src="./images/icon-reply.svg" alt="" />
          <h3 className="text-moderateBlue font-bold">Reply</h3>
        </button>
      )}
    </div>
  );
};
