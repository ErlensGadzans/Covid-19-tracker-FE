import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { Card, Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import Table from "./Table";
import Table2 from "./Table2";
import GraphicCases from "./GraphicCases";
import GraphicRecovered from "./GraphicRecovered";
import GraphicDeaths from "./GraphicDeaths";
import { sortData } from "./utilities";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";

export default function MainPage() {
  const [globalCases, setGlobalCases] = useState([]);
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesConfirmed, setCasesConfirmed] = useState("cases");
  const [casesRecovered, setCasesRecovered] = useState("recovered");
  const [casesDeaths, setCasesDeaths] = useState("deaths");
  const [singleCountry, setSingleCountry] = useState([]);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [mapZoom, setMapZoom] = useState(2);

  const fetchGlobalCases = async () => {
    try {
      const response = await fetch("http://localhost:3077/api/totals");
      const data = await response.json();
      // console.log("GLOBAL DATA:", data);
      setGlobalCases(data);
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
      // console.log("ALL COUNTRIES:", data);
      const countries = data.map((country) => ({
        countryName: country.country,
        confirmedCases: country.cases,
        deathCases: country.deaths,
        recoveredCases: country.recovered,
      }));
      const sortedData = sortData(countries);
      setTableData(sortedData);
      setCountries(countries);
      setMapCountries(data);
      // console.log("setMapCountries", data);
      // console.log(countries);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountriesData();
  }, []);

  const fetchCountry = async (countryName) => {
    try {
      const response = await fetch(
        "http://localhost:3077/api/countries/" + countryName
      );

      if (!response.ok) {
        throw new Error("Please enter correct country name");
      } else {
        const data = await response.json();
        console.log("FOR SEARCH:", data);
        setSingleCountry(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  console.log({ mapCenter, mapZoom });
  return (
    <div className="app">
      <div className="appHeader">
        <DropdownButton
          menuAlign="right"
          title="Worldwide"
          id="dropdown-menu-align-right"
          variant="secondary"
        >
          <Dropdown.Item value="worldwide"></Dropdown.Item>
          {countries.map((country) => (
            <Dropdown.Item key={country.countryName}>
              {country.countryName}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>

      <Row>
        <Col className="col-3">
          <Card className="globalCard">
            <Card.Body className="globalCases">
              <Card.Title>
                <small>Global Cases</small>
              </Card.Title>
              <Card.Subtitle className="globalCasesNumber">
                <div>
                  <h3>{numeral(globalCases.cases).format("0,0")}</h3>
                </div>
                ))
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
          <Map
            className="worldMap"
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
          />
        </Col>
        <Col className="globalDeathsAndRecoveries col-2">
          {<Table2 globalCases={globalCases} countries={tableData} />}
        </Col>
      </Row>
      <Row className="justify-content-between">
        <Col className="Graphic md-col-4">
          <GraphicCases className="Graphic" casesConfirmed={casesConfirmed} />
        </Col>
        <Col className="Graphic md-col-4">
          <GraphicDeaths casesDeaths={casesDeaths} />
        </Col>
        <Col className="Graphic md-col-4">
          <GraphicRecovered casesRecovered={casesRecovered} />
        </Col>
      </Row>
    </div>
  );
}
