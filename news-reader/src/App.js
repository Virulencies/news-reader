import React, { useState, useEffect } from 'react';
import './App.css';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import SearchBar from './components/SearchBar';

function App() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=technology&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchArticles();
  }, []);

  const handleSearch = (query) => {
    const filteredArticles = articles.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setArticles(filteredArticles);
    setSelectedArticle(null);
  };

  const handleSelectArticle = (article) => {
    setSelectedArticle(article);
  };

  return (
    <div>
      <h1>News Reader</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p>Error: {error}</p>}
      {selectedArticle ? (
        <ArticleDetail article={selectedArticle} />
      ) : (
        <ArticleList articles={articles} onSelect={handleSelectArticle} />
      )}
    </div>
  );
}

export default App;
