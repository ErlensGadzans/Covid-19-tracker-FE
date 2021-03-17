import React from "react";
import "./Table.css";
import numeral from "numeral";

export default function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ countryName, confirmedCases }) => (
        <tr>
          <td className="countryName">{countryName}</td>
          <td>
            <strong className="confirmedCases">
              {numeral(confirmedCases).format("0,0")}
            </strong>
          </td>
        </tr>
      ))}
    </div>
  );
}
