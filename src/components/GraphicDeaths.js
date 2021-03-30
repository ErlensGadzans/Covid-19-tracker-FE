import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "./Graphic.css";

const options = {
  title: {
    display: false,
    position: "top",
    text: "Daily deaths",
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
    mode: "index",
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

const buildChartData = (data, casesDeaths) => {
  const chartData = [];
  for (let date in data.deaths) {
    const newDataPoint = {
      x: date,
      y: data[casesDeaths][date],
    };
    chartData.push(newDataPoint);
  }
  return chartData;
};

export default function Graphic({ casesDeaths }) {
  const [data, setData] = useState([]);

  const fetchGlobalCasesGraph = async () => {
    try {
      const response = await fetch(
        "http://localhost:3077/api/byTimeAllCountries"
      );
      const data = await response.json();
      // console.log("data", data);
      const chartData = buildChartData(data, casesDeaths);
      // console.log("chartData", chartData);
      setData(chartData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGlobalCasesGraph();
  }, [casesDeaths]);

  return (
    <div>
      {data.length > 0 && (
        <Line
          className="line"
          data={{
            datasets: [
              { data: data, label: "Death cases", borderColor: "red" },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}
