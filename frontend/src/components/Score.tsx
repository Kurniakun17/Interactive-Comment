import React, { useContext, useState } from "react";
import { downvoteScore, upvoteScore } from "../utils/helpers";
import { DataContext } from "../utils/Contexts";

interface Scores {
  _id: string;
  score: number;
  upvotedStatus: boolean;
  downvotedStatus: boolean;
}

export const Score = ({
  _id,
  score,
  upvotedStatus,
  downvotedStatus,
}: Scores) => {
  const [Score, setScore] = useState(score);
  const [upvote, setUpvote] = useState(upvotedStatus);
  const [downvote, setDownvote] = useState(downvotedStatus);
  const { user } = useContext(DataContext);
  const voteObj = { commentId: _id, userId: user._id };

  const setUpVoteStatus = (status: boolean) => {
    setUpvote(status);
  };

  const setDownVoteStatus = (status: boolean) => {
    setDownvote(status);
  };

  const increaseScore = () => {
    setScore((prev: number) => prev + 1);
  };

  const decreaseScore = () => {
    setScore((prev: number) => prev - 1);
  };

  const upvoteHandler = () => {
    if (!upvote) {
      increaseScore();
      setUpVoteStatus(true);
      if (downvote) {
        increaseScore();
        setDownVoteStatus(false);
      }
    } else {
      decreaseScore();
      setUpVoteStatus(false);
    }
    upvoteScore(voteObj);
  };

  const downvoteHandler = () => {
    if (!downvote) {
      decreaseScore();
      setDownVoteStatus(true);
      if (upvote) {
        setUpVoteStatus(false);
        decreaseScore();
      }
    } else {
      increaseScore();
      setDownVoteStatus(false);
    }
    downvoteScore(voteObj);
  };

  return (
    <div className="flex items-center bg-veryLightGray rounded-lg desktop:flex-col">
      <button
        className="flex h-full items-center justify-center p-3 px-4 desktop:px-[14px] desktop:py-[15px]"
        onClick={upvoteHandler}
        aria-label="upvote"
      >
        <svg
          className="text-[#C5C6EF] data-[clicked=true]:text-moderateBlue"
          data-clicked={upvote}
          width="11"
          height="11"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <h3 className="text-moderateBlue font-bold desktop:px-[14px]">{Score}</h3>
      <button
        className="flex h-full items-center justify-center p-3 px-4 desktop:px-[14px] desktop:py-[15px]"
        onClick={downvoteHandler}
        aria-label="downvote"
      >
        <svg
          className="text-[#C5C6EF] data-[clicked=true]:text-moderateBlue"
          data-clicked={downvote}
          width="11"
          height="3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
};
