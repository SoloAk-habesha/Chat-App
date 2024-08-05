import React from "react";

const InputField = ({ label, type, value, onChange, error, placeholder }) => (
  <div className="mb-4">
    <label className="block mb-2 text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded ${
        error ? "border-red-500" : "border-gray-300"
      } focus:border-indigo-900 focus:outline-none`}
      required
    />
    {error && <div className="text-red-500 text-xs ml-2">{error}</div>}
  </div>
);

export default InputField;
