import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "./Graphic.css";

const options = {
  title: {
    display: true,
    position: "top",
    text: "Daily confirmed cases",
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

const buildChartData = (data, casesConfirmed) => {
  const chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesConfirmed][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesConfirmed][date];
  }
  return chartData;
};

export default function Graphic({ casesConfirmed }) {
  const [data, setData] = useState([]);

  const fetchGlobalCasesGraph = async () => {
    try {
      const response = await fetch(
        "http://localhost:3077/api/byTimeAllCountries"
      );
      const data = await response.json();
      console.log("data", data);
      const chartData = buildChartData(data, casesConfirmed);
      console.log("chartData", chartData);
      setData(chartData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGlobalCasesGraph();
  }, [casesConfirmed]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          className="line"
          data={{
            datasets: [
              { data, borderColor: "red", backgroundColor: "lightred" },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}
