import React from "react";
const UpvoteSection = ({ name, upvotes, setArticleInfo }) => {
  const upvoteArticle = async () => {
    const upvotes = await fetch(`/api/articles/${name}/upvotes`, {
      method: "post",
    });
    const body = await upvotes.json();
    setArticleInfo(body);
  };
  return (
    <div id="upvotes-section">
      <button title="upvote" onClick={() => upvoteArticle()}>
        Upvote
      </button>
      <h4> This article has {upvotes} upvotes</h4>
    </div>
  );
};
export default UpvoteSection;
