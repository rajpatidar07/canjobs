import React from "react";

function CustomButton({ btn, ...btnProps }) {
  return (
    <div>
      <button {...btnProps} />
    </div>
  );
}

export default CustomButton;
