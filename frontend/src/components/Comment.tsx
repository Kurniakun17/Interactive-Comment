import React, { useRef, useState } from "react";
import { CommentProps, CurrentUser } from "../utils/interfaces";
import { TopSection } from "./TopSection";
import { BottomSection } from "./BottomSection";
import * as Types from "../utils/interfaces";
import { AddComment } from "./AddComment";
import { deleteComment, editComment } from "../utils/helpers";
import Modal from "react-modal";
import { ModalDelete } from "./ModalDelete";
import { Score } from "./Score";

interface Comments extends CommentProps {
  currentUser: CurrentUser;
  activeReplyIndex: number;
  isReplyActive: boolean;
  setDatas: React.Dispatch<React.SetStateAction<Types.CommentProps[]>>;
  setActiveReplyIndex: React.Dispatch<React.SetStateAction<number>>;
  closeReply: () => void;
}

export const Comment = ({
  id,
  content,
  createdAt,
  score,
  user,
  replies,
  currentUser,
  replyingTo,
  activeReplyIndex,
  isReplyActive,
  setDatas,
  setActiveReplyIndex,
  closeReply,
}: Comments) => {
  const [isEditActive, setIsEditActive] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const editInput = useRef(content);

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    editInput.current = e.target.value;
  };

  const onEditHandler = () => {
    setIsEditActive(!isEditActive);
  };

  const onUpdateHandler = () => {
    setDatas((prev: Types.CommentProps[]) => {
      editComment(prev, id, editInput.current);
      return [...prev];
    });
    setIsEditActive(false);
  };

  const onDeleteHandler = () => {
    setIsModalActive(!isModalActive);
  };

  const onModalDeleteHandler = () => {
    setDatas((prev: Types.CommentProps[]) => {
      deleteComment(prev, id);
      return [...prev];
    });
  };

  const onReplyHandler = () => {
    if (isReplyActive) {
      return setActiveReplyIndex(-1);
    }
    setActiveReplyIndex(id);
  };

  Modal.setAppElement("#root");

  return (
    <div className="flex flex-col max-w-[600px] desktop:max-w-[700px] gap-2">
      <div className="flex p-6 bg-white rounded-md gap-6">
        <div className="hidden desktop:block">
          <Score score={score}></Score>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <TopSection
            currentUser={currentUser}
            user={user}
            createdAt={createdAt}
            isAuthor={user.username === currentUser.username}
            isEditActive={isEditActive}
            onReplyHandler={onReplyHandler}
            onDeleteHandler={onDeleteHandler}
            onEditHandler={onEditHandler}
            onUpdateHandler={onUpdateHandler}
          ></TopSection>
          {isEditActive ? (
            <textarea
              className="border-2 rounded px-4 py-2 h-32 resize-none"
              required={true}
              defaultValue={content}
              onChange={(e) => {
                onInputChangeHandler(e);
              }}
              aria-label="update comment input"
            ></textarea>
          ) : (
            <p className="text-grayishBlue">
              {replyingTo && (
                <span className="text-moderateBlue font-bold after:content-['_']">
                  @{replyingTo}
                </span>
              )}
              {content}
            </p>
          )}
          <BottomSection
            isAuthor={user.username === currentUser.username}
            isEditActive={isEditActive}
            score={score}
            onEditHandler={onEditHandler}
            onUpdateHandler={onUpdateHandler}
            onDeleteHandler={onDeleteHandler}
            onReplyHandler={onReplyHandler}
          ></BottomSection>
        </div>
      </div>
      {isReplyActive && (
        <AddComment
          closeReply={closeReply}
          setDatas={setDatas}
          currentUser={currentUser}
          id={id}
          replyingTo={{ id, username: user.username }}
          type="Add Reply"
          isFocus={true}
        ></AddComment>
      )}
      {replies?.length ? (
        <div className="flex flex-col gap-4 border-l-[3px] mt-2 pl-4 md:pl-8 desktop:ml-9">
          {replies.map((comment: CommentProps) => {
            return (
              <Comment
                key={comment.id}
                activeReplyIndex={activeReplyIndex}
                isReplyActive={activeReplyIndex === comment.id}
                setActiveReplyIndex={setActiveReplyIndex}
                currentUser={currentUser}
                {...comment}
                setDatas={setDatas}
                closeReply={closeReply}
              ></Comment>
            );
          })}
        </div>
      ) : (
        ""
      )}
      <ModalDelete
        isModalActive={isModalActive}
        onCloseHandler={() => {
          setIsModalActive(false);
        }}
        onModalDeleteHandler={onModalDeleteHandler}
      ></ModalDelete>
    </div>
  );
};
