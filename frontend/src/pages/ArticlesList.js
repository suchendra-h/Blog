import React from "react";
import articles from "../article-content";
import ItemList from "../Components/ItemList";

const ArticlesList = () => (
  <>
    <h1>Articles</h1>
    <ItemList items={articles} />
  </>
);

export default ArticlesList;
