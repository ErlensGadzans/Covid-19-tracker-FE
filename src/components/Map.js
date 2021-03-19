import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
import { Circle } from "react-leaflet";

export default function Map({ countries }) {
  console.log(countries);

  return (
    <div className="map">
      <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countries.map((country) => (
          <>
            (country.latitude && country.longitude) ?
            <Circle
              center={[country.latitude, country.longitude]}
              //center={[15.199999, -86.241905]}
              pathOptions={{ color: "red" }}
              fillOpacity={0.3}
              radius={30}
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
