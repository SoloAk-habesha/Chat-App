import React from "react";

const TextAreaField = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  rows,
}) => (
  <div className="mb-4">
    <label className="block mb-2 text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-3 py-2 border rounded ${
        error ? "border-red-500" : "border-gray-300"
      } focus:border-indigo-900 focus:outline-none resize-none overflow-hidden`}
      style={{ overflow: "hidden" }}
      required
    />
    {error && <div className="text-red-500 text-xs ml-2">{error}</div>}
  </div>
);

export default TextAreaField;
