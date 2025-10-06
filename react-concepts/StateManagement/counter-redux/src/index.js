import React from "react";
import { createRoot } from "react-dom/client"; // <-- updated import
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container); // <-- create root

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
