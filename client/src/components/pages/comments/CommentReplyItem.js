import React from "react";
import { useState, useEffect } from "react";
import CommentButton from "./CommentButton";
import CommentForm from "./CommentForm";

function CommentReplyItem({
  postedTime,
  poster,
  user,
  comment,
  commentId,
  buttonValue,
  replyBody,
}) {
  //determines whether or not reply box is showing
  const [showing, setShowing] = useState(false);
  const [grandChildrenArray, setGrandChildrenArray] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching grandchildren comments using commentId", commentId);
      let fetchResult = await fetch(
        `/api/get-comment-children?parentId=${commentId}`
      );
      let grandChildrenList = await fetchResult.json();
      setGrandChildrenArray(grandChildrenList);
    }
    fetchData();
  }, [commentId]);
  console.log("THIS IS THE GRANDCHILDREN ARRAY", grandChildrenArray);
  function showOrNot() {
    if (showing === true) {
      setShowing(false);
    } else {
      setShowing(true);
    }
  }

  return (
    <div style={{ marginLeft: "50px" }}>
      <div>
        <h4 style={{ textAlign: "left", color: "blue" }}>{replyBody}</h4>
        <div>
          <p> on: {postedTime} </p> <p>by:{poster}</p>
          <CommentButton value={buttonValue} showOrNot={showOrNot} />
        </div>
        {grandChildrenArray &&
          grandChildrenArray.map((child, index) => {
            return (
              <CommentReplyItem
                style={{ marginLeft: "150px" }}
                key={index}
                postedTime={child.createdAt}
                poster={child.firstName}
                user={user}
                replyBody={child.messageBody}
                // buttonValue="comment"
                comment={child}
              />
            );
          })}
      </div>
      <div>
        {showing && !!comment ? (
          <CommentForm
            user={user}
            commentId={comment._id}
            parentId={comment._id}
            instructions="ADD COMMENT!!"
            buttonValue="SUBMIT COMMENT"
          />
        ) : null}
      </div>
    </div>
  );
}

// function CommentReplyItem({
//   replyBody,
//   postedTime,
//   poster,
//   user,
//   comment,
//   buttonValue,
//   commentChildren,
// }) {
//   //determines whether or not reply box is showing
//   const [showing, setShowing] = useState(false);
//   function showOrNot() {
//     if (showing === true) {
//       setShowing(false);
//     } else {
//       setShowing(true);
//     }
//   }
//   console.log("these are teh comment children", commentChildren);
//   return (
//     <>
//       <div>
//         <h4 style={{ textAlign: "left" }}>{replyBody}</h4>
//         <h5> on: {postedTime} </h5> <h5>by:{poster}</h5>
//         <CommentButton value={buttonValue} showOrNot={showOrNot} />
//       </div>
//       <div>
//         {showing && !!comment ? (
//           <CommentForm
//             user={user}
//             parentId={comment._id}
//             instructions={"REPLY"}
//           />
//         ) : null}
//       </div>
//     </>
//   );
// }

export default CommentReplyItem;
