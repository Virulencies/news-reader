import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import SearchBar from './components/SearchBar';
import { mockArticles } from './mockData';

function App() {
  const [articles, setArticles] = useState(mockArticles);
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
  };

  return (
    <Router>
      <div>
        <h1>News Reader</h1>
        <SearchBar onSearch={handleSearch} />
        {error && <p>Error: {error}</p>}
        <Routes>
          <Route path="/" element={<ArticleList articles={articles} />} />
          <Route path="/article/:url" element={<ArticleDetailWrapper articles={articles} />} />
        </Routes>
      </div>
    </Router>
  );
}

const ArticleDetailWrapper = ({ articles }) => {
  const { url } = useParams();
  const decodedUrl = decodeURIComponent(url);
  const article = articles.find((article) => article.url === decodedUrl);
  return <ArticleDetail article={article} />;
};

export default App;