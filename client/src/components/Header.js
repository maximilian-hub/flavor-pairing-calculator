import React from "react";
import "../App.css";
import CustomNavLink from "./CustomNavLink.js";

export default function Header() {
  return (
    <div id="header-container">
      <h1 id="header-main">
        <CustomNavLink to="/" name="Flavor Pairing Calculator" />
      </h1>
      <div id="header-links-container">
        <h3 className="header-link">
          <CustomNavLink to="/about" name="About" />
        </h3>
        <h3 className="header-link">
          <CustomNavLink to="/howto" name="How To" />
        </h3>
        <h3 className="header-link">
          <CustomNavLink to="/support" name="Help Me" />
        </h3>
        <h3 className="header-link">
          <CustomNavLink to="/contact" name="Contact" />
        </h3>
      </div>
    </div>
  );
}
