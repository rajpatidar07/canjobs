import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import Card from "react-bootstrap/Card";
const DashboardCard = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <Card className="mb-7 dash_card">
      <Card.Body>
        <div
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          className="w-100"
        >
          <h3 className="heading">
            {props.heading}{" "}
            <p className="font-size-3 font-weight-normal">{props.subheading}</p>
            <span className="float-right dash_statistic">
              {props.statistic}
            </span>
          </h3>
        </div>
        <Collapse in={open}>
          <div id="example-collapse-text">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
            labore wes anderson cred nesciunt sapiente ea proident.
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};
export default DashboardCard;
