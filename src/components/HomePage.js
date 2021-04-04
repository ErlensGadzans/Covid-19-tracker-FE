import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import Table from "./Table";
import Table2 from "./Table2";
import GraphicCases from "./GraphicCases";
import GraphicDailyCases from "./GraphicDailyCases";
import { sortData } from "./utilities";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import logo from "../components/data/logo.png";

export default function MainPage() {
  const [globalCases, setGlobalCases] = useState([]);
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesConfirmed, setCasesConfirmed] = useState("cases");
  const [casesRecovered, setCasesRecovered] = useState("recovered");
  const [casesDeaths, setCasesDeaths] = useState("deaths");
  const [singleCountry, setSingleCountry] = useState("worldwide");
  const [mapCenter, setMapCenter] = useState([50, -0.09]);
  const [mapZoom, setMapZoom] = useState(2);
  const [country, setCountry] = useState({});

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
      console.log("ALL COUNTRIES:", data);
      const countries = data.map((country) => ({
        countryName: country.country,
        confirmedCases: country.cases,
        deathCases: country.deaths,
        recoveredCases: country.recovered,
        countryFlag: country.countryInfo.flag,
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

  const getCountry = async (event) => {
    const countryName = event.target.value;

    const url =
      countryName === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryName}`;

    const fetchCountry = await fetch(url);

    const data = await fetchCountry.json();
    console.log("NEEEEEEEERWWWWWW", data);
    setSingleCountry(countryName);
    setCountry({
      confirmed: data.cases,
      recovered: data.recovered,
      deaths: data.deaths,
    });
    // setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    setMapZoom(5);
  };

  // console.log({ mapCenter, mapZoom });
  return (
    <div className="app">
      <Row className="display-flex">
        <Col className="col-7">
          <Row className="logoGlobaldataMenu">
            <div className="logo ml-3">
              <img style={{ height: "65px" }} src={logo} />
            </div>

            <Card className="globalCard">
              <Card.Body className="globalCases">
                <Card.Title>
                  <small>Confirmed Cases</small>
                </Card.Title>
                <Card.Subtitle className="globalCasesNumber">
                  <div>
                    <h3>{numeral(country.confirmed).format("0,0")}</h3>
                  </div>
                </Card.Subtitle>
              </Card.Body>
            </Card>
            <Card className="globalCard">
              <Card.Body className="globalCases">
                <Card.Title>
                  <small>Recovered</small>
                </Card.Title>
                <Card.Subtitle
                  className="globalCasesNumber"
                  style={{ color: "green" }}
                >
                  <div>
                    <h3>{numeral(country.recovered).format("0,0")}</h3>
                  </div>
                </Card.Subtitle>
              </Card.Body>
            </Card>
            <Card className="globalCard">
              <Card.Body className="globalCases">
                <Card.Title>
                  <small>Deaths</small>
                </Card.Title>
                <Card.Subtitle
                  className="globalCasesNumber"
                  style={{ color: "#9B3133" }}
                >
                  <div>
                    <h3>{numeral(country.deaths).format("0,0")}</h3>
                  </div>
                </Card.Subtitle>
              </Card.Body>
            </Card>
            <div className="appHeader ml-2">
              <FormControl className="app__dropdown">
                <Select
                  variant="outlined"
                  value={singleCountry}
                  onChange={getCountry}
                >
                  <MenuItem
                    value="worldwide"
                    style={{ backgroundColor: "#222222", color: "gray" }}
                  >
                    Worldwide
                  </MenuItem>
                  {countries.map((country) => (
                    <MenuItem
                      className="menuItems"
                      key={country.countryName}
                      value={country.countryName}
                    >
                      {country.countryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Row>
          <Row className="Graphic  ">
            <Col className="chart-container lg-col-6">
              <GraphicCases
                className="Graphic"
                casesConfirmed={casesConfirmed}
                casesDeaths={casesDeaths}
                casesRecovered={casesRecovered}
              />
            </Col>
          </Row>
        </Col>

        <Col className="col-5">
          <Map
            className="worldMap"
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
          />
        </Col>
      </Row>

      <Row className="display-flex justify-content-between">
        <Col className="chart-container col-6">
          <GraphicDailyCases
            className="Graphic"
            casesConfirmed={casesConfirmed}
            casesDeaths={casesDeaths}
            casesRecovered={casesRecovered}
          />
        </Col>
        <Col className="col-5">
          <Card className="casesByCountriesCard">
            <Card.Body className="casesByCountries">
              <Table countries={tableData} />
            </Card.Body>
          </Card>{" "}
        </Col>
      </Row>
    </div>
  );
}
