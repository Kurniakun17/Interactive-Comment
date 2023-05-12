import React from "react";
import { useNavigate } from "react-router-dom";

export const ModalLoginChildren = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-center font-bold font-rubik text-xl text-moderateBlue dark:text-indigo-300 p-2">
        Hey there! <span className="text-2xl">👋</span>
      </h1>
      <p className="text-justify dark:text-white">
        It looks like you haven't logged in yet! If you want to get in on the
        action and interact with this website, you gotta log in first!
      </p>
      <div className="flex flex-col gap-2 justify-between mt-4">
        <button
          className="font-bold text-white text-md pt-1.5 pb-2.5 px-4 rounded-lg w-full bg-moderateBlue dark:text-indigo-200 dark:bg-slate-500 "
          onClick={() => {
            closeModal();
            navigate("/login");
          }}
        >
          Okay, I will Login
        </button>
        <button
          className="font-bold text-white text-md pt-1.5 pb-2.5 px-4 rounded-lg w-full bg-slate-500"
          onClick={closeModal}
        >
          Nah, I'm just looking around
        </button>
      </div>
    </>
  );
};
