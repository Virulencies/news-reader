import React from 'react';
import { Link } from 'react-router-dom';

const ArticleList = ({ articles }) => {
  return (
    <div className="article-list">
      {articles.map((article, index) => (
        <div key={index} className="article">
          <img src={article.urlToImage} alt={article.title} />
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <p>Published At: {new Date(article.publishedAt).toLocaleDateString()}</p>
          <Link to={`/article/${encodeURIComponent(article.url)}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;