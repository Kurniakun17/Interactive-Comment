import React from "react";

export const ReplyButton = ({
  onReplyHandler,
}: {
  onReplyHandler: () => void;
}) => {
  return (
    <button
      className="flex px-3 items-center gap-1 text-moderateBlue font-bold"
      onClick={onReplyHandler}
      aria-label={"reply comment"}
    >
      <img className="h-3" src="./images/icon-reply.svg" alt="" />
      Reply
    </button>
  );
};
