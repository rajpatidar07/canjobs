import React from "react";
import DashboardCard from "./card";
const DashboardLMIA = (props) => {
  return (
    <div className="row w-100">
      <div className="col-md-6 col-sm-12">
        <DashboardCard
          heading={"Need to Start"}
          subheading={"Job LMIA process needs to be start"}
          statistic={"12"}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <DashboardCard
          heading={"Working on it"}
          subheading={"Working on LMIA process"}
          statistic={"11"}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <DashboardCard
          heading={"Application Submitted"}
          subheading={"Jobs LMIA document submitted"}
          statistic={"8"}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <DashboardCard
          heading={"Application in review"}
          subheading={"LMIA Applications in review"}
          statistic={"6"}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <DashboardCard
          heading={"Job Bank Requested"}
          subheading={"Jobs bank requested"}
          statistic={"10"}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <DashboardCard
          heading={"Advertisment running"}
          subheading={"Advertisment running for jobs"}
          statistic={"4"}
        />
      </div>
    </div>
  );
};
export default DashboardLMIA;
