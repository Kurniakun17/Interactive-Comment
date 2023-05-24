import React, { useEffect, useRef, useState } from "react";
import { TopSection } from "./TopSection";
import { BottomSection } from "./BottomSection";
import { CommentProps, userProps, newCommentObj } from "../utils/interfaces";
import { AddComment } from "./AddComment";
import { deleteComment, editComment } from "../utils/helpers";
import Modal from "react-modal";
import { Score } from "./Score";
import { CustomModal } from "./CustomModal";
import { useNavigate } from "react-router-dom";
import { ModalDeleteChildren } from "./ModalDeleteChildren";
import { ModalLoginChildren } from "./ModalLoginChildren";

interface Comments extends CommentProps {
  user: userProps;
  activeReplyIndex: number;
  isReplyActive: boolean;
  setDatas: React.Dispatch<React.SetStateAction<CommentProps[]>>;
  setActiveReplyIndex: React.Dispatch<React.SetStateAction<number>>;
  closeReply: () => void;
  getReplies: (parentId: number) => CommentProps[];
}

export const Comment = ({
  _id,
  content,
  createdAt,
  score,
  author,
  user,
  upvotedBy,
  downvotedBy,
  activeReplyIndex,
  isReplyActive,
  getReplies,
  setDatas,
  setActiveReplyIndex,
  closeReply,
}: Comments) => {
  const [isEditActive, setIsEditActive] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const editInput = useRef(content);
  let childrenComment: CommentProps[] = getReplies(_id);
  const commentObj: newCommentObj = {
    author: user._id,
    content: "",
    createdAt: "",
    parentId: _id.toString(),
  };

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    editInput.current = e.target.value;
  };

  const onEditHandler = () => {
    setIsEditActive(!isEditActive);
  };

  const onUpdateHandler = () => {
    setDatas((prev: CommentProps[]) => {
      const data = [...editComment(prev, _id, editInput.current)];
      return data;
    });
    setIsEditActive(false);
  };

  const onToggleModalHandler = () => {
    setIsModalActive(!isModalActive);
  };

  const onModalDeleteHandler = (id: string) => {
    setIsModalActive(false);
    const element = document.getElementById(id);
    element?.classList.add("animate-deleted");
    setTimeout(() => {
      setDatas((prev: CommentProps[]) => {
        return [...deleteComment(prev, _id)];
      });
    }, 500);
  };

  const onReplyHandler = () => {
    if (isReplyActive) {
      return setActiveReplyIndex(-1);
    }
    setActiveReplyIndex(_id);
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  Modal.setAppElement("#root");
  return (
    <div className="flex flex-col w-full gap-2">
      <div
        className="flex p-4 desktop:p-6 bg-white dark:bg-[#232529] rounded-xl gap-6 shadow-md"
        id={_id.toString()}
      >
        <div className="hidden desktop:block">
          <Score
            _id={_id.toString()}
            score={score}
            upvotedStatus={upvotedBy.includes(user._id)}
            downvotedStatus={downvotedBy.includes(user._id)}
            onToggleModalHandler={onToggleModalHandler}
          ></Score>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <TopSection
            user={user}
            author={author}
            createdAt={createdAt}
            isAuthor={author.username === user.username}
            isEditActive={isEditActive}
            onReplyHandler={onReplyHandler}
            onToggleModalHandler={onToggleModalHandler}
            onEditHandler={onEditHandler}
            onUpdateHandler={onUpdateHandler}
          ></TopSection>
          {isEditActive ? (
            <textarea
              className="border-2 dark:border-slate-500 dark:bg-[#333841]  dark:text-white dark:focus:border-none focus:outline-moderateBlue rounded px-4 py-2 h-24 resize-none"
              required={true}
              defaultValue={content}
              onChange={(e) => {
                onInputChangeHandler(e);
              }}
              aria-label="update comment input"
            ></textarea>
          ) : (
            <p className="text-grayishBlue dark:text-lightGray">{content}</p>
          )}
          <BottomSection
            _id={_id.toString()}
            isAuthor={author.username === user.username}
            isEditActive={isEditActive}
            score={score}
            onEditHandler={onEditHandler}
            onUpdateHandler={onUpdateHandler}
            onToggleModalHandler={onToggleModalHandler}
            upvotedStatus={upvotedBy.includes(user._id)}
            downvotedStatus={downvotedBy.includes(user._id)}
            onReplyHandler={onReplyHandler}
          ></BottomSection>
        </div>
      </div>
      {isReplyActive && (
        <AddComment
          isReplyActive={isReplyActive}
          closeReply={closeReply}
          setDatas={setDatas}
          user={user}
          replyingTo={{ _id, username: author.username }}
          isFocus={true}
          commentObj={commentObj}
        ></AddComment>
      )}
      {childrenComment.length > 0 ? (
        <div className="flex flex-col gap-4 border-l-[3px] dark:border-slate-800 mt-2 pl-4 md:pl-8 desktop:ml-9">
          {childrenComment.map((comment: CommentProps) => {
            return (
              <Comment
                key={comment._id}
                activeReplyIndex={activeReplyIndex}
                isReplyActive={activeReplyIndex === comment._id}
                setActiveReplyIndex={setActiveReplyIndex}
                user={user}
                {...comment}
                setDatas={setDatas}
                closeReply={closeReply}
                getReplies={getReplies}
              ></Comment>
            );
          })}
        </div>
      ) : (
        ""
      )}
      {user.username === "" ? (
        <CustomModal
          isModalActive={isModalActive}
          onCloseHandler={() => {
            setIsModalActive(false);
          }}
        >
          <ModalLoginChildren closeModal={closeModal}></ModalLoginChildren>
        </CustomModal>
      ) : (
        <CustomModal
          isModalActive={isModalActive}
          onCloseHandler={() => {
            setIsModalActive(false);
          }}
        >
          <ModalDeleteChildren
            closeModal={closeModal}
            onModalDeleteHandler={() => {
              onModalDeleteHandler(_id.toString());
            }}
          />
        </CustomModal>
      )}
    </div>
  );
};
