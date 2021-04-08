import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "./Graphic.css";

const options = {
  title: {
    display: false,
    position: "top",
    text: "Vaccine doses have been administered",
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

const buildChartData = (data, vaccine) => {
  const chartDataVaccine = [];

  for (let date in data) {
    const newDataPoint = {
      x: date,
      y: data[date],
    };
    chartDataVaccine.push(newDataPoint);
  }
  return chartDataVaccine;
};

export default function Graphic(vaccine) {
  const [dataVaccine, setDataVaccine] = useState([]);

  const fetchGlobalVaccineCases = async () => {
    try {
      const response = await fetch(
        "https://disease.sh/v3/covid-19/vaccine/coverage"
      );
      const data = await response.json();
      console.log("VACCINE", data);
      const chartDataVaccine = buildChartData(data, vaccine);
      console.log("chartDataVaccine", chartDataVaccine);
      setDataVaccine(chartDataVaccine);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGlobalVaccineCases();
  }, [vaccine]);

  return (
    <div>
      {dataVaccine.length > 0 && (
        <Line
          className="line"
          data={{
            datasets: [
              {
                data: dataVaccine,
                label: "Vaccine doses have been administered",
                borderColor: "#039be5",
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}
