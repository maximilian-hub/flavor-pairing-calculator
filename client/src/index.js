import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Header from "./components/Header.js";
import AboutPage from "./components/AboutPage.js";
import ContactPage from "./components/ContactPage.js";
import HowToPage from "./components/HowToPage.js";
import SupportPage from "./components/SupportPage.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/howto" element={<HowToPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
