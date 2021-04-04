import React from "react";
import "./Table.css";
import numeral from "numeral";

export default function Table({ countries }) {
  return (
    <table className="table table-responsive ">
      <thead>
        <tr>
          <th>Country</th>
          <th>Total Confirmed</th>
          <th>Total Recovered</th>
          <th>Total Deaths</th>
        </tr>
      </thead>
      <tbody>
        {countries.map(
          ({
            countryName,
            confirmedCases,
            recoveredCases,
            deathCases,
            countryFlag,
          }) => (
            <tr>
              <td className="countryName">{countryName}</td>
              <td>
                <strong className="confirmedCases">
                  {numeral(confirmedCases).format("0,0")}
                </strong>
              </td>
              <td>
                <strong className="recoveredCases">
                  {numeral(recoveredCases).format("0,0")}
                </strong>
              </td>
              <td>
                <strong className="deathCases">
                  {numeral(deathCases).format("0,0")}
                </strong>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
