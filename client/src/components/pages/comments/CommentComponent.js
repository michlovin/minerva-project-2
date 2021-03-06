import React from "react";
import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentListItem from "./CommentListItem";
import "./comments.css";

/////////////////////////////////////////////60

function CommentComponent({ user, mentorId }) {
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching comment data");
      let fetchResult = await fetch(
        `/api/get-mentor-comments?mentorId=${mentorId}`
      );
      let commentsList = await fetchResult.json();
      setCommentsList(commentsList);
    }
    fetchData();
  }, [mentorId]);
  //
  //
  //

  return (
    <div className="comment-main-container">
      <CommentForm //JUST FOR THE INITIAL QUESTION, set the parentId to empty string
        user={user}
        commentParentId={""}
        style={{ justifyContents: "center" }}
        instructions="ASK A QUESTION OR LEAVE A COMMENT"
        buttonValue="SUBMIT"
      />
      {commentsList &&
        commentsList
          .filter((comment) => comment.commentParentId === "none")
          .map((comment) => {
            return (
              <div>
                <CommentListItem
                  style={{ marginLeft: "20px" }}
                  key={comment._id}
                  commentQuestion={comment.messageBody}
                  poster={comment.firstName}
                  postedTime={comment.createdAt}
                  user={user}
                  comment={comment}
                  commentId={comment._id}
                  commentChildren={comment.commentChildren}
                  buttonValue="REPLY"
                  // updateComment={updateComment}
                />
              </div>
            );
          })}
    </div>
  );
}

export default CommentComponent;
