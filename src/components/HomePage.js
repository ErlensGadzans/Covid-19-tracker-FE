import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { Card } from "react-bootstrap";
import Table from "./Table";
import { sortData } from "./utilities";
import numeral from "numeral";

export default function MainPage() {
  const [globalCases, setGlobalCases] = useState([]);
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);

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

  const fetchCountriesData = async () => {
    try {
      const response = await fetch("http://localhost:3077/api/allcountries");
      const data = await response.json();
      console.log(data);
      const countries = data.map((country) => ({
        countryName: country.country,
        confirmedCases: country.confirmed,
      }));
      const sortedData = sortData(countries);
      setTableData(sortedData);
      setCountries(countries);
      console.log(countries);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountriesData();
  }, []);

  return (
    <div>
      <NavBar />
      <Card style={{ width: "18rem" }}>
        <Card.Body className="globalCases">
          <Card.Title>Globas Cases</Card.Title>
          <Card.Subtitle className="globalCases">
            {globalCases.map((cases, index) => (
              <div key={index}>{numeral(cases.confirmed).format("0,0")}</div>
            ))}
          </Card.Subtitle>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }}>
        <Card.Body className="casesByCountries">
          <Table countries={tableData} />
        </Card.Body>
      </Card>
    </div>
  );
}
