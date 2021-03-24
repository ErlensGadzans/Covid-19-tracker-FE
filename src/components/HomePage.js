import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { Card, Row, Col } from "react-bootstrap";
import Table from "./Table";
import Table2 from "./Table2";
import GraphicCases from "./GraphicCases";
import GraphicRecovered from "./GraphicRecovered";
import { sortData } from "./utilities";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";

export default function MainPage() {
  const [globalCases, setGlobalCases] = useState([]);
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [casesTypeRecovered, setCasesTypeRecovered] = useState("recovered");

  const fetchGlobalCases = async () => {
    try {
      const response = await fetch("http://localhost:3077/api/totals");
      const dataGlobal = await response.json();
      setGlobalCases(dataGlobal);
      console.log(dataGlobal);
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
      // console.log(data);
      const countries = data.map((country) => ({
        countryName: country.country,
        confirmedCases: country.confirmed,
        deathCases: country.deaths,
        recoveredCases: country.recovered,
      }));

      const sortedData = sortData(countries);
      setTableData(sortedData);
      setCountries(countries);

      setMapCountries(data);
      console.log("setMapCountries", data);
      // console.log(countries);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountriesData();
  }, []);

  return (
    <div className="app">
      <NavBar />
      <Row>
        <Col className="col-3">
          <Card className="globalCard">
            <Card.Body className="globalCases">
              <Card.Title>
                <small>Globas Cases</small>
              </Card.Title>
              <Card.Subtitle className="globalCasesNumber">
                {globalCases.map((cases, index) => (
                  <div key={index}>
                    <h3>{numeral(cases.confirmed).format("0,0")}</h3>
                  </div>
                ))}
              </Card.Subtitle>
            </Card.Body>
          </Card>
          <Card className="casesByCountriesCard">
            <Card.Body className="casesByCountries">
              <Table countries={tableData} />
            </Card.Body>
          </Card>{" "}
        </Col>
        <Col className="col-7">
          <Map className="worldMap" countries={mapCountries} />
        </Col>
        <Col className="globalDeathsAndRecoveries col-2">
          {<Table2 globalCases={globalCases} countries={tableData} />}
        </Col>
      </Row>
      <Row className="justify-content-between">
        <Col className="Graphic md-col-4">
          <GraphicCases className="Graphic" casesType={casesType} />
        </Col>
        <Col className="Graphic md-col-4">
          <GraphicRecovered casesTypeRecovered={casesTypeRecovered} />
        </Col>
        <Col className="Graphic md-col-4">
          <GraphicRecovered casesTypeRecovered={casesTypeRecovered} />
        </Col>
      </Row>
    </div>
  );
}
