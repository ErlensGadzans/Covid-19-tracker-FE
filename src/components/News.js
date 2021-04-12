import React, { useState, useEffect } from "react";
import { Card, Button, CardDeck } from "react-bootstrap";
import "./News.css";

export default function News(news) {
  const [newsData, setNewsData] = useState({});

  const fetchCovidNews = async () => {
    try {
      const response = await fetch(
        "https://api.mediastack.com/v1/news?access_key=fcc4ff9207bc42339aea383a9e7f15b6&countries=gb&keywords=covid19"
      );
      const data = await response.json();
      // console.log("Covid News:", data);
      setNewsData(data.data);

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
                <Card.Img variant="top" src={news.image} alt="" />

                <Card.Body>
                  <Card.Title>{news.title}</Card.Title>
                  <Card.Text>{news.description}</Card.Text>
                  <Button variant="danger" href={news.url} target="_blank">
                    Read more
                  </Button>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Source: {news.source} </small>
                </Card.Footer>
              </div>
            </>
          ))}
      </Card>
    </div>
  );
}
