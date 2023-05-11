import React from "react";
import { CommentsList } from "../components/CommentsList";

export default function Homepage() {
  return (
    <div className="bg-veryLightGray font-rubik flex justify-center items-center min-h-screen py-8 px-4">
      <CommentsList></CommentsList>
    </div>
  );
}
