import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app/App";
import { ThemeProvider } from "./features/theme/ThemeProvider";
import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")!,
).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);