import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useNavigate, createSearchParams } from 'react-router-dom';

const DataChart = ({ data, dataType }) => {
  // Extracting counts from data
  const counts = data.map(item => parseInt(item.count, 10));
  let navigate = useNavigate()
  // Reverse mapping object for status names to status numbers
  const statusMap = {
    "New": "1",
    "Prospect": "2",
    "Lead": "3",
    "Retained": "4",
    "Lost": "5",
    "Dead": "6",
    "Working on": "7",
    "Submitted": "8",
    "Web": "0"
  };

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
  //Applicants types data
  const interests = data.map(item => item.interested_in || "Unknown"); // Handle null value
  console.log(interests, counts, dataType)

  // On Click function for navigation
  const handleStatusClick = (event, chartContext, { seriesIndex, dataPointIndex }) => {
    const clickedStatusName = statuses[dataPointIndex];
    const clickedStatusNumber = statusMap[clickedStatusName];
    // Do whatever navigation action you need based on the clicked status number
    if (clickedStatusNumber === "4" ||
      clickedStatusNumber === "7" ||
      clickedStatusNumber === "8") {
      navigate("/employee")
      localStorage.setItem("StatusTab", clickedStatusNumber)
    } else if (clickedStatusNumber === "1" || clickedStatusNumber === "-1" ||
      clickedStatusNumber === "2" ||
      clickedStatusNumber === "3" ||
      clickedStatusNumber === "5" ||
      clickedStatusNumber === "6" ||
      clickedStatusNumber === "0") {
      navigate("/selfemployee")
      localStorage.setItem("StatusTab", clickedStatusNumber)
    }
  };

  const options = {
    chart: {
      events: {
        dataPointSelection: handleStatusClick
      },
      width: '100%', // Change width to 100%
      type: 'pie', // Change chart type to 'pie'
      toolbar: {
        show: false // Hide toolbar
      }
    },
    labels: dataType === "status" ? statuses : interests, // Using extracted statuses as labels
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
