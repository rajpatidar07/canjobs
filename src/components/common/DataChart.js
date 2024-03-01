import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DataChart = ({ data }) => {
  // Extracting counts from data
  const counts = data.map(item => parseInt(item.count, 10));

  // Extracting statuses from data
  const statuses = data.map(item => `${item.status === "1"
    ? "New"
    : item.status === "2"
      ? "Prospect"
      : item.status === "3"
        ? "Lead"
        : item.status === "4"
          ? "Retained"
          : item.status === "5"
            ? "Lost"
            : item.status === "6"
              ? "Dead"
              : item.status === "7"
                ? "Working on"
                : item.status === "8"
                  ? "Submitted"
                  : item.status === "0"
                    ? "Web"
                    : "status"}`);


  const options = {
    chart: {
      width: '100%', // Change width to 100%
      type: 'pie', // Change chart type to 'pie'
      toolbar: {
        show: false // Hide toolbar
      }
    },
    labels: statuses, // Using extracted statuses as labels
    legend: {
      position: 'bottom'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };


  return (
    <div className='d-flex justify-content-center'>
      <div id="chart" className='w-100'>
        <ReactApexChart options={options} series={counts} type="pie" width={"100%"} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default DataChart;
