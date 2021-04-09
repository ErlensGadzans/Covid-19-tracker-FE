import React, { useState, useEffect } from "react";
import { Card, Button, CardDeck } from "react-bootstrap";
import "./News.css";

export default function News(news) {
  const [newsData, setNewsData] = useState({});

  const fetchCovidNews = async () => {
    try {
      const fetchNews = await fetch(
        "https://newsapi.org/v2/top-headlines?language=en&category=health&sortBy=popularity&apiKey=9208243d5ab8480faa1bd825739742a4"
      );
      const data = await fetchNews.json();
      // console.log("Covid News:", data);
      setNewsData(data.articles);

      // console.log("NEWS:", data.articles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCovidNews();
  }, []);

  return (
    <div>
      <Card className="cardNews" style={{ width: "auto" }}>
        {Array.isArray(newsData) &&
          newsData.map((news) => (
            <>
              <div>
                <Card.Img variant="top" src={news.urlToImage} alt="" />

                <Card.Body>
                  <Card.Title>{news.title}</Card.Title>
                  <Card.Text>{news.content}</Card.Text>
                  <Button variant="danger" href={news.url} target="_blank">
                    Read more
                  </Button>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Source: {news.source.name}{" "}
                  </small>
                </Card.Footer>
              </div>
            </>
          ))}
      </Card>
    </div>
  );
}
