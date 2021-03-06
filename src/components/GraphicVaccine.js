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

const buildChartData = (data, vaccine, singleCountry) => {
  if (singleCountry === "worldwide") {
    const chartDataVaccine = [];
    for (let date in data) {
      const newDataPoint = {
        x: date,
        y: data[date],
      };
      chartDataVaccine.push(newDataPoint);
    }
    return chartDataVaccine;
  } else {
    const chartDataVaccine = [];
    for (let date in data.timeline) {
      const newDataPoint = {
        x: date,
        y: data.timeline[date],
      };
      chartDataVaccine.push(newDataPoint);
    }
    return chartDataVaccine;
  }
};

export default function Graphic({ vaccine, singleCountry }) {
  const [dataVaccine, setDataVaccine] = useState([]);

  const fetchGlobalVaccineCases = async () => {
    try {
      const url =
        singleCountry === "worldwide"
          ? "https://disease.sh/v3/covid-19/vaccine/coverage"
          : `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${singleCountry}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log("VACCINE", data);
      const chartDataVaccine = buildChartData(data, vaccine, singleCountry);
      console.log("chartDataVaccine", chartDataVaccine);
      setDataVaccine(chartDataVaccine);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGlobalVaccineCases();
  }, [vaccine, singleCountry]);

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
                scaleFontColor: "white",
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}
