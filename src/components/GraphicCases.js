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

    backgroundColor: "black",
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

export default function Graphic({
  casesConfirmed,
  casesDeaths,
  casesRecovered,
}) {
  const [dataCases, setDataCases] = useState([]);

  const [dataRecovered, seDataRecovered] = useState([]);

  const fetchGlobalCases = async () => {
    try {
      const response = await fetch(
        "http://localhost:3077/api/byTimeAllCountries"
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
        "http://localhost:3077/api/byTimeAllCountries"
      );
      const data = await response.json();
      console.log("data", data);
      const chartDataRecovered = buildChartDataRecovered(data, casesRecovered);
      console.log("chartDataDeaths", chartDataRecovered);
      seDataRecovered(chartDataRecovered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGlobalRecoveries();
  }, [casesRecovered]);

  return (
    <div>
      {dataCases.length > 0 && dataRecovered.length > 0 && (
        <Line
          className="line"
          data={{
            datasets: [
              {
                data: dataCases,
                label: "Confirmed cases",
                borderColor: "red",
              },

              {
                data: dataRecovered,
                label: "Recovered",
                borderColor: "green",
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}
