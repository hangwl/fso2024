import React from "react";

const Notification = ({ message, type }) => {
  const notificationStyle = {
    padding: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    borderRadius: "10px",
    backgroundColor: type === "success" ? "#dff0d8" : "#f2dede",
    color: type === "success" ? "green" : "red",
  };

  if (!message) return null;

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
