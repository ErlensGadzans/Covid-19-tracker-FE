import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import "./Table2.css";
import numeral from "numeral";

export default function Table2({ globalCases, countries }) {
  const [key, setKey] = useState("globalDeaths");

  return (
    <div className="table2">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="globalDeaths" title="Global deaths">
          {globalCases.map((cases) => (
            <td className="globalDeathsTotal">
              <h3>{numeral(cases.deaths).format("0,0")}</h3>
            </td>
          ))}
          <div className="table21">
            {countries.map(({ countryName, deathCases }) => (
              <tr>
                <td className="countryName">{countryName}</td>
                <td>
                  <strong className="confirmedCases">
                    {numeral(deathCases).format("0,0")}
                  </strong>
                </td>
              </tr>
            ))}
          </div>
        </Tab>

        <Tab eventKey="globalRecovered" title="Global recovered">
          {globalCases.map((cases) => (
            <td className="globalRecoveryTotal">
              <h3>{numeral(cases.recovered).format("0,0")}</h3>
            </td>
          ))}
          <div className="table21">
            {countries.map(({ countryName, recoveredCases }) => (
              <tr>
                <td className="countryName">{countryName}</td>
                <td>
                  <strong className="recoveredCases">
                    {numeral(recoveredCases).format("0,0")}
                  </strong>
                </td>
              </tr>
            ))}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
