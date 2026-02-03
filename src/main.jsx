import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import GeneralProvider from "./components/provider/GeneralProvider.jsx";
import App_Data_Provider from "./components/provider/App_Data_Provider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GeneralProvider>
        <App_Data_Provider>
          <App />
        </App_Data_Provider>
      </GeneralProvider>
    </BrowserRouter>
  </StrictMode>,
);
