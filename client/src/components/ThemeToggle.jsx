import React from "react";
import { useTheme } from "./ThemeProvider";
import { IconButton } from "@material-tailwind/react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <IconButton variant="text" onClick={toggleTheme}>
      <i
        className={`fa-lightbulb  ${
          theme === "light" ? "fa-solid" : "fa-regular"
        }`}
      ></i>
    </IconButton>
  );
};

export default ThemeToggle;
