import React, { useContext } from "react";
import { DataContext } from "../utils/Contexts";

export const ReplyButton = ({
  onReplyHandler,
  onToggleModalHandler,
}: {
  onReplyHandler: () => void;
  onToggleModalHandler: () => void;
}) => {
  const { user } = useContext(DataContext);

  const onReplyClickHandler = () => {
    if (user.username === "") {
      return onToggleModalHandler();
    }
    onReplyHandler();
  };

  return (
    <button
      className="flex px-3 items-center gap-1 text-moderateBlue dark:text-indigo-400 font-bold"
      onClick={onReplyClickHandler}
      aria-label={"reply comment"}
    >
      <svg
        width="14"
        height="13"
        className="fill-current text-moderateBlue dark:text-indigo-400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" />
      </svg>
      Reply
    </button>
  );
};
