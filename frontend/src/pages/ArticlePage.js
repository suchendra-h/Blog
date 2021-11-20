import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import articles from "../article-content";
import ItemList from "../Components/ItemList";
import NotFoundPage from "./NotFoundPage";

const ArticlePage = () => {
  const name = useParams().name;
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`);
      const body = await result.json();
      setArticleInfo(body);
    };
    fetchData();
  }, [name]);
  const article = articles.filter((article) => article.name === name)[0];
  if (!article) {
    return <NotFoundPage />;
  } else {
    const otherArticles = articles.filter((article) => article.name !== name);
    console.log(otherArticles);
    return (
      <>
        <h1>{article.title}</h1>
        <h4> This article has {articleInfo.upvotes} upvotes</h4>
        {article.content.map((paragraph, key) => (
          <p key={key}>{paragraph}</p>
        ))}
        <h3>Other Articles</h3>
        <ItemList items={otherArticles} />
      </>
    );
  }
};

export default ArticlePage;
