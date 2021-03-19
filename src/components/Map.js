import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
import { Circle } from "react-leaflet";

export default function Map({ countries }) {
  // console.log(countries);
  const MAX_RADIUS = 1200000;
  const confirmed = countries.map((country) => country.confirmed);
  const findMaxConfirmed = (confirmed) => Math.max(...confirmed);
  const maximum = findMaxConfirmed(confirmed);
  const calculateRadius = (x, maximum) => (x * MAX_RADIUS) / maximum;
  return (
    <div className="map">
      <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countries
          .filter((c) => c.latitude && c.longitude)
          .map((country) => (
            <>
              (country.latitude && country.longitude) ?
              <Circle
                center={[country.latitude, country.longitude]}
                pathOptions={{ color: "red" }}
                fillOpacity={0.3}
                radius={calculateRadius(country.confirmed, maximum)}
              ></Circle>
              :
              {(() => {
                console.log(country.latitude, country.longitude);
                return null;
              })()}
            </>
          ))}
      </MapContainer>
    </div>
  );
}
