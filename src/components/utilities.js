import React from "react";

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((x, y) => {
    if (x.confirmedCases > y.confirmedCases) {
      return -1;
    } else {
      return 1;
    }
  });
};

// const dataOnMap = (countries) =>
//   countries.map((country) => (
//     <Circle
//       center={[country.latitude, country.longitude]}
//       //   center={[15.199999, -86.241905]}
//       pathOptions={{ color: "red" }}
//       fillOpacity={0.3}
//       radius={30}
//     ></Circle>
//   ));
