import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import { store } from "./redux/store";
import App from "./App";
import "./index.css";
import Counter from "./useEffect";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  // <Provider store={store}>
    <Counter />
);
