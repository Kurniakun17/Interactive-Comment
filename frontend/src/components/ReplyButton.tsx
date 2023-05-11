import React, { useContext } from "react";
import { DataContext } from "../utils/Contexts";

export const ReplyButton = ({
  onReplyHandler,
  onToggleModalHandler,
}: {
  onReplyHandler: () => void;
  onToggleModalHandler: () => void;
}) => {
  const user = useContext(DataContext);

  const onReplyClickHandler = () => {
    if (user.username === "") {
      return onToggleModalHandler();
    }
    onReplyHandler();
  };

  return (
    <button
      className="flex px-3 items-center gap-1 text-moderateBlue font-bold"
      onClick={onReplyClickHandler}
      aria-label={"reply comment"}
    >
      <img className="h-3" src="./images/icon-reply.svg" alt="" />
      Reply
    </button>
  );
};
