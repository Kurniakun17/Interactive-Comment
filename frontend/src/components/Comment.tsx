import React, { useRef, useState } from "react";
import { CommentProps, CurrentUser } from "../utils/interfaces";
import { TopSection } from "./TopSection";
import { BottomSection } from "./BottomSection";
import * as Types from "../utils/interfaces";
import { AddComment } from "./AddComment";
import {
  deleteComment,
  editComment,
  generateNewComment,
} from "../utils/helpers";
import Modal from "react-modal";
import { ModalDelete } from "./ModalDelete";
import { Score } from "./Score";

interface Comments extends CommentProps {
  currentUser: CurrentUser;
  activeReplyIndex: number;
  isReplyActive: boolean;
  setDatas: React.Dispatch<React.SetStateAction<Types.CommentProps[]>>;
  setActiveReplyIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  closeReply: () => void;
  getReplies: (parentId: number) => Types.CommentProps[];
}

export const Comment = ({
  _id,
  content,
  createdAt,
  score,
  author,
  replies,
  currentUser,
  activeReplyIndex,
  isReplyActive,
  getReplies,
  setDatas,
  setActiveReplyIndex,
  setIsLoading,
  closeReply,
}: Comments) => {
  const [isEditActive, setIsEditActive] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const editInput = useRef(content);
  const childrenComment: Types.CommentProps[] = getReplies(_id);
  const commentObj: Types.newCommentObj = {
    author: currentUser._id,
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

  const onDeleteHandler = () => {
    setIsModalActive(!isModalActive);
  };

  const onModalDeleteHandler = () => {
    setIsModalActive(false);
    setDatas((prev: Types.CommentProps[]) => {
      return [...deleteComment(prev, _id)];
    });
  };

  const onReplyHandler = () => {
    if (isReplyActive) {
      return setActiveReplyIndex(-1);
    }
    setActiveReplyIndex(_id);
  };

  Modal.setAppElement("#root");

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex p-4 desktop:p-6 bg-white rounded-md gap-6 shadow-sm">
        <div className="hidden desktop:block">
          <Score score={score}></Score>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <TopSection
            currentUser={currentUser}
            author={author}
            createdAt={createdAt}
            isAuthor={author.username === currentUser.username}
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
              {/* {replyingTo && (
                <span className="text-moderateBlue font-bold after:content-['_']">
                  @{replyingTo}
                </span>
              )} */}
              {content}
            </p>
          )}
          <BottomSection
            isAuthor={author.username === currentUser.username}
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
          replyingTo={{ _id, username: author.username }}
          isFocus={true}
          setIsLoading={setIsLoading}
          commentObj={commentObj}
        ></AddComment>
      )}
      {childrenComment.length > 0 ? (
        <div className="flex flex-col gap-4 border-l-[3px] mt-2 pl-4 md:pl-8 desktop:ml-9">
          {childrenComment.map((comment: CommentProps) => {
            return (
              <Comment
                key={`${comment._id} reply`}
                activeReplyIndex={activeReplyIndex}
                isReplyActive={activeReplyIndex === comment._id}
                setActiveReplyIndex={setActiveReplyIndex}
                currentUser={currentUser}
                {...comment}
                setDatas={setDatas}
                closeReply={closeReply}
                getReplies={getReplies}
                setIsLoading={setIsLoading}
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
