import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "./Graphic.css";

const options = {
  title: {
    display: true,
    position: "top",
    text: "Daily cases for past 100 days",
  },
  legend: {
    display: true,
  },

  elements: {
    point: {
      radius: 2,
    },
  },
  maintainAspectRatio: true,
  tooltips: {
    mode: "nearest",
    intersect: false,

    backgroundColor: "#474747",
    callbacks: {
      label: function (tooltipItem) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },

  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          displayFormats: {
            month: "MMM YYYY",
          },
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          callback: function (value) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartDataCases = (data, casesConfirmed, singleCountry) => {
  if (singleCountry === "worldwide") {
    const chartDataCases = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesConfirmed][date] - lastDataPoint,
        };
        chartDataCases.push(newDataPoint);
      }
      lastDataPoint = data[casesConfirmed][date];
    }
    return chartDataCases;
  } else {
    const chartDataCases = [];
    let lastDataPoint;
    for (let date in data.timeline.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data.timeline.cases[date] - lastDataPoint,
        };
        chartDataCases.push(newDataPoint);
      }
      lastDataPoint = data.timeline.cases[date];
    }
    return chartDataCases;
  }
};

const buildChartDataRecovered = (data, casesRecovered, singleCountry) => {
  if (singleCountry === "worldwide") {
    const chartDataRecovered = [];
    let lastDataPoint;
    for (let date in data.recovered) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesRecovered][date] - lastDataPoint,
        };
        chartDataRecovered.push(newDataPoint);
      }
      lastDataPoint = data[casesRecovered][date];
    }
    return chartDataRecovered;
  } else {
    const chartDataCases = [];
    let lastDataPoint;
    for (let date in data.timeline.recovered) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data.timeline.recovered[date] - lastDataPoint,
        };
        chartDataCases.push(newDataPoint);
      }
      lastDataPoint = data.timeline.recovered[date];
    }
    return chartDataCases;
  }
};

const buildChartDataDeaths = (data, casesDeaths, singleCountry) => {
  if (singleCountry === "worldwide") {
    const chartDataDeaths = [];
    let lastDataPoint;
    for (let date in data.deaths) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesDeaths][date] - lastDataPoint,
        };
        chartDataDeaths.push(newDataPoint);
      }
      lastDataPoint = data[casesDeaths][date];
    }
    return chartDataDeaths;
  } else {
    const chartDataDeaths = [];
    let lastDataPoint;
    for (let date in data.timeline.deaths) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data.timeline.deaths[date] - lastDataPoint,
        };
        chartDataDeaths.push(newDataPoint);
      }
      lastDataPoint = data.timeline.deaths[date];
    }
    return chartDataDeaths;
  }
};

export default function Graphic({
  casesConfirmed,
  casesRecovered,
  casesDeaths,
  singleCountry,
}) {
  const [dataCases, setDataCases] = useState([]);
  const [dataRecovered, setDataRecovered] = useState([]);
  const [dataDeaths, setDataDeaths] = useState([]);

  const fetchGlobalCases = async () => {
    try {
      const url =
        singleCountry === "worldwide"
          ? "https://disease.sh/v3/covid-19/historical/all?lastdays=100"
          : `https://disease.sh/v3/covid-19/historical/${singleCountry}?lastdays=100`;

      const response = await fetch(url);

      const data = await response.json();
      // console.log("DATAAAAA CASES LAST 100 DAYS", data);
      const chartDataCases = buildChartDataCases(
        data,
        casesConfirmed,
        singleCountry
      );
      // console.log("chartDataCases", chartDataCases);
      setDataCases(chartDataCases);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGlobalCases();
  }, [casesConfirmed, singleCountry]);

  const fetchGlobalRecoveries = async () => {
    try {
      const url =
        singleCountry === "worldwide"
          ? "https://disease.sh/v3/covid-19/historical/all?lastdays=100"
          : `https://disease.sh/v3/covid-19/historical/${singleCountry}?lastdays=100`;

      const response = await fetch(url);

      const data = await response.json();
      // console.log("data", data);
      const chartDataRecovered = buildChartDataRecovered(
        data,
        casesRecovered,
        singleCountry
      );
      // console.log("chartDataDeaths", chartDataRecovered);
      setDataRecovered(chartDataRecovered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGlobalRecoveries();
  }, [casesRecovered, singleCountry]);

  const fetchGlobalCasesDeaths = async () => {
    try {
      const url =
        singleCountry === "worldwide"
          ? "https://disease.sh/v3/covid-19/historical/all?lastdays=100"
          : `https://disease.sh/v3/covid-19/historical/${singleCountry}?lastdays=100`;

      const response = await fetch(url);
      const data = await response.json();
      const chartDataDeaths = buildChartDataDeaths(
        data,
        casesDeaths,
        singleCountry
      );
      setDataDeaths(chartDataDeaths);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGlobalCasesDeaths();
  }, [casesDeaths, singleCountry]);

  return (
    <div>
      {dataCases.length > 0 &&
        dataRecovered.length > 0 &&
        dataDeaths.length > 0 && (
          <Line
            className="line"
            data={{
              datasets: [
                {
                  data: dataCases,
                  label: "Confirmed cases",
                  borderColor: "#ef5350",
                },

                {
                  data: dataRecovered,
                  label: "Recovered",
                  borderColor: "#9ccc65",
                },
                {
                  data: dataDeaths,
                  label: "Deaths",
                  borderColor: "#9B3133",
                },
              ],
            }}
            options={options}
          />
        )}
    </div>
  );
}
