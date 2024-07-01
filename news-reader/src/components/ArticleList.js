import React from 'react';

const ArticleList = ({ articles, onSelect }) => {
  return (
    <div className="article-list">
      {articles.map((article, index) => (
        <div key={index} className="article" onClick={() => onSelect(article)}>
          <img src={article.urlToImage} alt={article.title} />
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <p>Published At: {new Date(article.publishedAt).toLocaleDateString()}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
