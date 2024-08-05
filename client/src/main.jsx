import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider, Button } from "@material-tailwind/react";
import customTheme from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider value={customTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
