import React, { useState } from "react";

const CommentForm = ({ articleName, setArticleInfo }) => {
  const [username, setUserName] = useState("");
  const [commentText, setCommentText] = useState("");
  const addComment = async (
    username,
    commentText,
    articleName,
    setArticleInfo
  ) => {
    // console.log(username, commentText, articleName);
    const result = await fetch(`/api/articles/${articleName}/comment`, {
      method: "post",
      body: JSON.stringify({
        username: username,
        comment: commentText,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }); // closes fetch
    const updatedInfo = await result.json();
    setArticleInfo(updatedInfo);
    setUserName("");
    setCommentText("");
  };
  return (
    <div id="add-comment-form">
      <h3>Add a comment</h3>
      <label>
        Name:
        <input
          type="text"
          value={username}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        ></input>
      </label>
      <label>
        Comment:
        <textarea
          rows="5"
          cols="50"
          value={commentText}
          onChange={(event) => {
            setCommentText(event.target.value);
          }}
        ></textarea>
      </label>
      <button
        onClick={() =>
          addComment(username, commentText, articleName, setArticleInfo)
        }
      >
        Submit
      </button>
    </div>
  );
};
export default CommentForm;
