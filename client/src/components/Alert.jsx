import React from "react";

const Alert = ({ message, type }) => (
  <div
    className={`fixed top-4 right-4 p-4 mb-4 text-sm rounded-lg shadow-lg transition-transform transform ${
      type === "success"
        ? "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400 slide-in"
        : "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400 slide-in"
    }`}
    role="alert"
  >
    {message}
  </div>
);

export default Alert;
