import React from "react";
import { PuffLoader } from "react-spinners";
export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full font-bold text-xl pointer-events-none">
      <PuffLoader color="hsl(238, 40%, 52%)" size={150}>
        <h1>Loading</h1>
      </PuffLoader>
    </div>
  );
};
