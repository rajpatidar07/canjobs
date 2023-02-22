import React from "react";

const InputField = ({ labelText, ...inputProps }) => {
  return (
    <div>
      <label>{labelText}</label>
      <input {...inputProps} />
    </div>
  );
};

export default InputField;
