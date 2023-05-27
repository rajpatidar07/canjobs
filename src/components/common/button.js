import React from "react";

function CustomButton({ btn, ...btnProps }) {
  return (
    <button {...btnProps} style={{width : "26px",height:"26px"}} />
  );
}

export default CustomButton;
