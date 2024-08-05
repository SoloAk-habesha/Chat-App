import React from "react";
import { FaSpinner } from "react-icons/fa";

const GoogleAuthButton = ({ text, isLoading }) => (
  <a
    href={isLoading ? "#" : "/api/auth/google"}
    className="w-full bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center"
    onClick={(e) => isLoading && e.preventDefault()}
  >
    {isLoading ? (
      <>
        <FaSpinner className="animate-spin mr-2" />
        {text}...
      </>
    ) : (
      text
    )}
  </a>
);

export default GoogleAuthButton;
