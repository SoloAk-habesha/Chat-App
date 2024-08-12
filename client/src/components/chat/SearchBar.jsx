import React, { useState } from "react";
import Menu from "./Menu";

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex gap-4 py-4">
      <Menu />
      <form action="" className="w-full">
        <div className="relative flex items-center">
          <input
            type="text"
            name="q"
            className="w-full pl-10 border-2 h-12 shadow p-4 border-gray-300 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:border-indigo-900 focus:outline-none"
            placeholder="search"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <i
            className={`fa fa-search absolute left-3 top-2/4 transform -translate-y-1/2 ${
              isFocused ? "text-indigo-500" : "text-gray-700"
            } dark:text-gray-300`}
          />
        </div>
      </form>
    </div>
  );
}
