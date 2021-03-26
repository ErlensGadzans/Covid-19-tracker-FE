import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

export default function Map({ countries }) {
  console.log("COUNTRIES:", countries);
  const MAX_RADIUS = 1200000;
  const confirmed = countries.map((country) => country.cases);
  const findMaxConfirmed = (confirmed) => Math.max(...confirmed);
  const maximum = findMaxConfirmed(confirmed);
  const calculateRadius = (x, maximum) => (x * MAX_RADIUS) / maximum;
  return (
    <div className="map">
      <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countries
          .filter(
            (country) => country.countryInfo.lat && country.countryInfo.long
          )
          .map((country) => (
            <>
              <Circle
                center={[country.countryInfo.lat, country.countryInfo.long]}
                pathOptions={{ color: "red" }}
                fillOpacity={0.3}
                radius={calculateRadius(country.cases, maximum)}
              >
                <Popup className="popUp">
                  <div className="countriesPopup">
                    <div
                      className="countryFlag"
                      style={{
                        backgroundImage: `url(${country.countryInfo.flag})`,
                      }}
                    ></div>{" "}
                    <div className="countryName">{country.country}</div>
                    <div className="countryCases">
                      Cases: {numeral(country.cases).format("0,0")}
                    </div>
                    <div className="countryDeaths">
                      Deaths: {numeral(country.deaths).format("0,0")}
                    </div>
                    <div className="countryDeaths">
                      Recovered: {numeral(country.recovered).format("0,0")}
                    </div>
                  </div>
                </Popup>
              </Circle>
            </>
          ))}
      </MapContainer>
    </div>
  );
}
