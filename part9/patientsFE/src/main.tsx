import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import SelectedPatient from "./components/SelectedPatient.tsx";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      {/* <App /> */}
      <div>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/patient/:id" element={<SelectedPatient />} />
        </Routes>
      </div>
    </Router>
    ,
  </React.StrictMode>
);
