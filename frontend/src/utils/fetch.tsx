import React from "react";
import { CommentProps, Data } from "./interfaces";
import axios from "axios";

export const fetchData = async (
  setDatas: React.Dispatch<React.SetStateAction<CommentProps[]>>,
  setIsLoading: (bool: boolean) => void
) => {
  try {
    const res = await axios.get("http://localhost:3000/comment");
    setDatas(res.data.data);
    setIsLoading(false);
  } catch (error: any) {
    console.log(error.message);
  }
};
