import React from "react";
import NavBar from "./NavBar";
import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function MainPage() {
  const [globalCases, setGlobalCases] = useState([]);

  const fetchGlobalCases = async () => {
    try {
      const response = await fetch("http://localhost:3077/api/totals");
      const data = await response.json();
      setGlobalCases(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGlobalCases();
  }, []);

  return (
    <div>
      <NavBar />
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Globas Cases</Card.Title>
          <Card.Subtitle className="globalCases">
            {globalCases.map((cases, index) => (
              <div key={index}>{cases.confirmed}</div>
            ))}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  );
}
