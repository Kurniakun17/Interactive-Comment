import React from "react";
import Modal from "react-modal";

interface ModalDeleteProps {
  isModalActive: boolean;
  onCloseHandler: () => void;
  onModalDeleteHandler: () => void;
}

export const ModalDelete = ({
  isModalActive,
  onCloseHandler,
  onModalDeleteHandler,
}: ModalDeleteProps) => {
  return (
    <Modal
      isOpen={isModalActive}
      onRequestClose={() => {
        onCloseHandler;
      }}
      contentLabel="Delete Comment Modal"
      className={
        "font-rubik absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-6 bg-white backdrop:bg-black backdrop:backdrop-opacity-50 w-[80%] max-w-[400px] rounded-lg"
      }
      overlayClassName={
        "fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-[50%]"
      }
    >
      <div className="flex flex-col gap-3 rounded-md justify-between w-full">
        <h2 className="font-bold text-lg">Delete comment</h2>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="flex gap-2 justify-between mt-2">
          <button
            onClick={onCloseHandler}
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
    </Modal>
  );
};
