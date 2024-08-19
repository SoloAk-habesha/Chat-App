import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider, Button } from "@material-tailwind/react";
import customTheme from "./theme";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { SocketContextProvider } from "./context/SocketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider value={customTheme}>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
        <ToastContainer />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
