import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Header from "./components/Header.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/about" element={<h1>ABOUT</h1>}></Route>
        <Route path="/howto" element={<h1>HOW TO</h1>}></Route>
        <Route path="/support" element={<h1>HELP ME</h1>}></Route>
        <Route path="/contact" element={<h1>CONTACT</h1>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
