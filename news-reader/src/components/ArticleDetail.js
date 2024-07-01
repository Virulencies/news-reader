import React from 'react';

const ArticleDetail = ({ article }) => {
  if (!article) return <p>No article selected.</p>;

  return (
    <div className="article-detail">
      <h2>{article.title}</h2>
      <img src={article.urlToImage} alt={article.title} />
      <p>By {article.author} | {new Date(article.publishedAt).toLocaleDateString()}</p>
      <p>{article.content}</p>
      <p>Source: {article.source.name}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">Read the full article</a>
    </div>
  );
};

export default ArticleDetail;
