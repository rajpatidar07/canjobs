import React, { useEffect, useState } from "react";
import Select from "react-select";

const SelectBox = (props) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    const options = props.options.map((option) => ({
      value: option.job_id,
      label: option.job_title + option.company_name,
    }));
    setState(options);
  }, [props.options]);

  return (
    <Select
      options={state}
      onChange={props.onSelectChange}
      name="job_id"
      id="job_id"
    />
  );
};

export default SelectBox;
