import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "./Graphic.css";

const options = {
  title: {
    display: false,
    position: "top",
    text: "Global cases",
  },
  legend: {
    display: true,
    labels: {
      fontColor: "lightgray",
      fontSize: 14,
    },
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
        return numeral(tooltipItem.value).format("0,0");
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
        ticks: {
          fontColor: "lightgray",
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          callback: function (value) {
            return numeral(value).format("0a");
          },
          fontColor: "lightgray",
        },
      },
    ],
  },
};

const buildChartDataCases = (data, casesConfirmed, singleCountry) => {
  if (singleCountry === "worldwide") {
    const chartDataCases = [];
    // console.log({ data, casesConfirmed });
    for (let date in data.cases) {
      const newDataPoint = {
        x: date,
        y: data[casesConfirmed][date],
      };
      chartDataCases.push(newDataPoint);
    }
    return chartDataCases;
  } else {
    const chartDataCases = [];
    // console.log({ data });
    for (let date in data.timeline.cases) {
      const newDataPoint = {
        x: date,
        y: data.timeline.cases[date],
      };
      chartDataCases.push(newDataPoint);
    }
    return chartDataCases;
  }
};

const buildChartDataRecovered = (data, casesRecovered, singleCountry) => {
  if (singleCountry === "worldwide") {
    const chartDataRecovered = [];

    for (let date in data.recovered) {
      const newDataPoint = {
        x: date,
        y: data[casesRecovered][date],
      };
      chartDataRecovered.push(newDataPoint);
    }
    return chartDataRecovered;
  } else {
    const chartDataRecovered = [];
    for (let date in data.timeline.recovered) {
      const newDataPoint = {
        x: date,
        y: data.timeline.recovered[date],
      };
      chartDataRecovered.push(newDataPoint);
    }
    return chartDataRecovered;
  }
};

const buildChartDataDeaths = (data, casesDeaths, singleCountry) => {
  if (singleCountry === "worldwide") {
    const chartDataDeaths = [];
    for (let date in data.deaths) {
      const newDataPoint = {
        x: date,
        y: data[casesDeaths][date],
      };
      chartDataDeaths.push(newDataPoint);
    }
    return chartDataDeaths;
  } else {
    const chartDataDeaths = [];
    for (let date in data.timeline.deaths) {
      const newDataPoint = {
        x: date,
        y: data.timeline.deaths[date],
      };
      chartDataDeaths.push(newDataPoint);
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
          ? "https://disease.sh/v3/covid-19/historical/all?lastdays=360"
          : `https://disease.sh/v3/covid-19/historical/${singleCountry}?lastdays=360`;

      const response = await fetch(url);
      const data = await response.json();
      // console.log("GLOBAL CASES CONFIRMED LAS 360 DAYS", data);
      const chartDataCases = buildChartDataCases(
        data,
        casesConfirmed,
        singleCountry
      );
      console.log("chartDataCases", chartDataCases);
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
          ? "https://disease.sh/v3/covid-19/historical/all?lastdays=360"
          : `https://disease.sh/v3/covid-19/historical/${singleCountry}?lastdays=360`;

      const response = await fetch(url);
      const data = await response.json();
      // console.log("data", data);
      const chartDataRecovered = buildChartDataRecovered(
        data,
        casesRecovered,
        singleCountry
      );
      console.log("GLOBAL CASES RECOVERED LAS 360 DAYS", chartDataRecovered);
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
          ? "https://disease.sh/v3/covid-19/historical/all?lastdays=360"
          : `https://disease.sh/v3/covid-19/historical/${singleCountry}?lastdays=360`;

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
