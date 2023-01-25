import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//position tooltips relative to the mouse
var tooltips = document.querySelectorAll(".tooltip");
window.onmousemove = function (e) {
  console.log("AAAAAAA");
  let x = e.clientX + 10 + "px";
  let y = e.clientY - 20 + "px";
  for (var i = 0; i < tooltips.length; i++) {
    tooltips[i].style.top = y;
    tooltips[i].style.left = x;
  }
};
