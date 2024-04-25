import React from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

const DataChart = ({ data, dataType }) => {
  // Extracting counts from data
  const counts = data.map((item) => parseInt(item.count, 10));
  let navigate = useNavigate();
  // Applicant's status data
  // Reverse mapping object for status names to status numbers
  const statusMap = {
    New: "1",
    Prospect: "2",
    Lead: "3",
    Retained: "4",
    Lost: "5",
    Dead: "6",
    "Working on": "7",
    Submitted: "8",
    Web: "0",
  };
  const statuses = data.map(
    (item) =>
      `${item.status === "1"
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
                        : "status"
      }`
  );
  //Applicants types data
  const interests = data.map((item) => item.interested_in || "Unknown"); // Handle null value

  //Applicants lima data
  let lmia = data.map((item) => item.lmia_status || "Unknown");

  //Applicants lima data
  let visa = data.map((item) => item.visa_status || "Unknown");

  // On Click function for navigation from applicant status
  const handleStatusClick = (
    event,
    chartContext,
    { seriesIndex, dataPointIndex }
  ) => {
    const clickedStatusName = statuses[dataPointIndex];
    const clickedStatusNumber = statusMap[clickedStatusName];
    // Do whatever navigation action you need based on the clicked status number
    if (
      clickedStatusNumber === "4" ||
      clickedStatusNumber === "7" ||
      clickedStatusNumber === "8"
    ) {
      navigate("/employee");
      localStorage.setItem("StatusTab", clickedStatusNumber);
    } else if (
      clickedStatusNumber === "1" ||
      clickedStatusNumber === "-1" ||
      clickedStatusNumber === "2" ||
      clickedStatusNumber === "3" ||
      clickedStatusNumber === "5" ||
      clickedStatusNumber === "6" ||
      clickedStatusNumber === "0"
    ) {
      navigate("/selfemployee");
      localStorage.setItem("StatusTab", clickedStatusNumber);
    }
  };

  const brightColors = [
    '#36A2EB',
    '#FFCE56',
    '#FF4500',
    '#00FF00',
    '#9966FF',
    '#FF8C00',
    '#8A2BE2',
    '#FFD700',
    '#008080',
    '#40E0D0',
    '#FF1493',
    '#32CD32',
    '#4BC0C0',
    '#1E90FF',
    '#FF00FF',
    '#00FA9A',
    '#FF69B4',
    '#ADFF2F',
    '#87CEFA',
    '#FF6384',
  ];

  const options = {
    chart: {
      events: {
        dataPointSelection: dataType === "status" ? handleStatusClick : null,
      },
      width: "100%", // Change width to 100%
      type: "pie", // Change chart type to 'pie'
      toolbar: {
        show: false, // Hide toolbar
      },
    },
    labels:
      dataType === "status"
        ? statuses
        : dataType === "type"
          ? interests
          : dataType === "lima"
            ? lmia
            : dataType === "visa"
              ? visa
              : null, // Using extracted statuses as labels
    legend: {
      position: "right",
    },
    colors: brightColors,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="d-flex justify-content-center w-100 ">
      <div id="chart" className="text-capitalize w-100">
        <ReactApexChart
          options={options}
          series={counts}
          type="pie"
          width={"100%"}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default DataChart;
