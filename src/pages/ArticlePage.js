import React, { useState, useEffect } from 'react';
import articleContent from './article-content';
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList';

const ArticlePage = ({ match }) => {
  const name = match.params.name;
  const article = articleContent.find(article => article.name === name);

  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`);
      const body = await result.json();
      setArticleInfo(body);
    };
    fetchData();
  }, [name]);

  if (!article) return <NotFoundPage />;

  return (
    <>
      <h1>{article.title}</h1>
      <p>This post has been upvoted {articleInfo.upvotes} times</p>
      {article.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
