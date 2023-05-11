import React, { Children, ReactElement } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

export const CustomModal = ({
  isModalActive,
  onCloseHandler,
  children,
}: {
  isModalActive: boolean;
  onCloseHandler: () => void;
  children: ReactElement<any, any>;
}) => {
  const closeModalHandler = () => {
    if (isModalActive) {
      onCloseHandler();
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalActive}
        onRequestClose={closeModalHandler}
        className={
          "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-6 bg-white backdrop:bg-black backdrop:backdrop-opacity-50 w-[80%] max-w-[400px] rounded-lg"
        }
        overlayClassName={
          "fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-[50%]"
        }
      >
        {children}
      </Modal>
    </>
  );
};
