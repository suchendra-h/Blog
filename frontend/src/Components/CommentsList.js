import React from "react";

const CommentsList = ({ comments }) => (
  <>
    <h4>Comments</h4>
    {comments
      ? comments.map((comment, key) => {
          if (comment.comment) {
            return (
              <div key={key} className="comment">
                {comment.username ? (
                  <h4>{comment.username}</h4>
                ) : (
                  <h4>Unknown</h4>
                )}
                <p>{comment.comment}</p>
              </div>
            );
          } else {
            return null;
          }
        })
      : null}
  </>
);

export default CommentsList;
