import React, { useState } from "react";

export const ModalDeleteChildren = ({
  closeModal,
  onModalDeleteHandler,
}: {
  closeModal: () => void;
  onModalDeleteHandler: () => void;
}) => {
  return (
    <div className="flex flex-col gap-3 rounded-md justify-between w-full">
      <h2 className="font-bold text-center font-rubik text-xl text-softRed">
        Delete comment
      </h2>
      <p className="dark:text-white">
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone.
      </p>
      <div className="flex gap-2 justify-between mt-2">
        <button
          onClick={() => {
            closeModal();
          }}
          className="text-white text-md bg-slate-500 pt-2 pb-2.5 px-4 rounded-lg w-full"
        >
          NO, CANCEL
        </button>
        <button
          className="text-white text-md bg-softRed pt-1.5 pb-2.5 px-4 rounded-lg w-full"
          onClick={onModalDeleteHandler}
        >
          YES, DELETE
        </button>
      </div>
    </div>
  );
};
