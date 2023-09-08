import React from "react";
import { MdOutlineModeComment } from "react-icons/md";

const CommentBtn = ({ handleCommentBtnClick }) => {
  return (
    <button onClick={handleCommentBtnClick} className="tweet-icons-btn">
      <MdOutlineModeComment className="tweet-icons" />
      <span className="hidden md:block">Comment</span>
    </button>
  );
};

export default CommentBtn;
