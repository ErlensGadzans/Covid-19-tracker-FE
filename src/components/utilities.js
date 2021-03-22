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
