"use client";

import { useEffect, useState } from "react";
import NewsList from "@/components/news-list";

export default function NewsPage() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const [news, setNews] = useState();

  useEffect(() => {
    async function fetchNews() {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/news");
      if (!response.ok) {
        setError("failed to fetch news");
        setIsLoading(false);
      }
      const news = await response.json();
      setIsLoading(false);
      setNews(news);
    }
    fetchNews();
  }, []);

  if (isLoading === true) {
    <p>Loading....</p>;
  }

  if (error) {
    <p>{error}</p>;
  }

  let newsContent;
  if (news) {
    newsContent = <NewsList news={news} />;
  }
  return (
    <>
      <h1>News Page</h1>
      {newsContent}
    </>
  );
}
