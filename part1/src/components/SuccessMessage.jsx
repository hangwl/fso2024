import React from "react";

const SuccessMessage = ({ successMessage, successPersonName }) => {
  return (
    <div style={{ color: "green" }}>
      {successMessage} {successPersonName && `(${successPersonName})`}
    </div>
  );
};

export default SuccessMessage;
