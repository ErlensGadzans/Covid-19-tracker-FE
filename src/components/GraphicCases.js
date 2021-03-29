import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "./Graphic.css";

const options = {
  title: {
    display: true,
    position: "top",
    text: "Confirmed cases",
  },
  legend: {
    display: false,
  },

  elements: {
    point: {
      radius: 2,
    },
  },
  maintainAspectRatio: true,
  tooltips: {
    mode: "index",
    intersect: false,
    backgroundColor: "red",
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

const buildChartDataDeaths = (data, casesDeaths) => {
  const chartDataDeaths = [];
  // console.log("valueeeeeeeeeeeeeeeeeeeees  ", Object.values(data.recovered));
  for (let date in data.deaths) {
    // console.log("current date ", date);
    // console.log("death ", data[casesDeaths][date]);
    const newDataPoint = {
      x: date,
      y: data[casesDeaths][date],
    };
    chartDataDeaths.push(newDataPoint);
  }
  return chartDataDeaths;
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
  const [dataDeaths, setDataDeaths] = useState([]);
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

  const fetchGlobalDeaths = async () => {
    try {
      const response = await fetch(
        "http://localhost:3077/api/byTimeAllCountries"
      );
      const data = await response.json();
      console.log("data", data);
      const chartDataDeaths = buildChartDataDeaths(data, casesDeaths);
      console.log("chartDataDeaths", chartDataDeaths);
      setDataDeaths(chartDataDeaths);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGlobalDeaths();
  }, [casesDeaths]);

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
      {dataCases?.length > 0 &&
        dataDeaths?.length > 0 &&
        dataRecovered?.length > 0 && (
          <Line
            className="line"
            data={{
              datasets: [
                {
                  data: dataCases,
                  label: "Confirmed cases",
                  borderColor: "red",
                },
                { data: dataDeaths, label: "Deaths", borderColor: "blue" },
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
