import React from "react";

const Alert = ({ message, type }) => {
  const getAlertClass = () => {
    switch (type) {
      case "success":
        return "bg-green-50  border-green-400 text-green-700";
      case "error":
        return "bg-red-100 border-red-400 text-red-700";
      case "info":
        return "bg-blue-100 border-blue-400 text-blue-700";
      default:
        return "";
    }
  };

  return (
    <div
      className={` fixed top-4 right-4 sm:w-full opacity-80  max-w-2xl  mb-4 text-sm z-50 rounded-lg shadow-lg transition-transform transform border-l-4 p-4  ${getAlertClass()} `}
      role="alert"
    >
      <p>{message}</p>
    </div>
  );
};

export default Alert;
