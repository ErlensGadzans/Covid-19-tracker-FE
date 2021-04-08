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

const buildChartDataCases = (data, casesConfirmed) => {
  const chartDataCases = [];

  for (let date in data.cases) {
    const newDataPoint = {
      x: date,
      y: data[casesConfirmed][date],
    };
    chartDataCases.push(newDataPoint);
  }
  return chartDataCases;
};

const buildChartDataRecovered = (data, casesRecovered) => {
  const chartDataRecovered = [];

  for (let date in data.recovered) {
    const newDataPoint = {
      x: date,
      y: data[casesRecovered][date],
    };
    chartDataRecovered.push(newDataPoint);
  }
  return chartDataRecovered;
};

const buildChartDataDeaths = (data, casesDeaths) => {
  const chartDataDeaths = [];
  for (let date in data.deaths) {
    const newDataPoint = {
      x: date,
      y: data[casesDeaths][date],
    };
    chartDataDeaths.push(newDataPoint);
  }
  return chartDataDeaths;
};

export default function Graphic({
  casesConfirmed,
  casesRecovered,
  casesDeaths,
}) {
  const [dataCases, setDataCases] = useState([]);
  const [dataRecovered, setDataRecovered] = useState([]);
  const [dataDeaths, setDataDeaths] = useState([]);

  const fetchGlobalCases = async () => {
    try {
      const response = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=360"
      );
      const data = await response.json();
      // console.log("data", data);
      const chartDataCases = buildChartDataCases(data, casesConfirmed);
      console.log("chartDataCases", chartDataCases);
      setDataCases(chartDataCases);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGlobalCases();
  }, [casesConfirmed]);

  const fetchGlobalRecoveries = async () => {
    try {
      const response = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=360"
      );
      const data = await response.json();
      console.log("data", data);
      const chartDataRecovered = buildChartDataRecovered(data, casesRecovered);
      console.log("chartDataDeaths", chartDataRecovered);
      setDataRecovered(chartDataRecovered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGlobalRecoveries();
  }, [casesRecovered]);

  const fetchGlobalCasesDeaths = async () => {
    try {
      const response = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=360"
      );
      const data = await response.json();
      const chartDataDeaths = buildChartDataDeaths(data, casesDeaths);
      setDataDeaths(chartDataDeaths);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGlobalCasesDeaths();
  }, [casesDeaths]);

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
