import React from "react";
import { CommentProps, Data } from "./interfaces";
import axios from "axios";
import { baseURL } from "./helpers";

export const fetchCommentData = async (
  setDatas: React.Dispatch<React.SetStateAction<CommentProps[]>>,
  setIsLoading: (bool: boolean) => void
) => {
  try {
    setIsLoading(true);
    const res = await axios.get(`${baseURL}/comment`);
    setDatas(res.data.data);
    setIsLoading(false);
  } catch (error: any) {
    console.log(error.message);
  }
};
