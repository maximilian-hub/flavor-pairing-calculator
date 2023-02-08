import React, { useState, useEffect } from "react";
import "../App.css";
import CustomNavLink from "./CustomNavLink.js";
import HamburgerMenu from "./HamburgerMenu";

export default function Header() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 600;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const header_links = [
    <h3 className="header-link" key="0">
      <CustomNavLink to="/about" name="About" />
    </h3>,
    <h3 className="header-link" key="1">
      <CustomNavLink to="/support" name="Support" />
    </h3>,
    <h3 className="header-link" key="2">
      <CustomNavLink to="/contact" name="Contact" />
    </h3>,
  ];

  return (
    <div id="header-container">
      <h1 id="header-main">
        <CustomNavLink to="/" name="Flavor Pairing Calculator" />
      </h1>
      <div id="header-links-container">
        {width < breakpoint ? (
          <HamburgerMenu>{header_links}</HamburgerMenu>
        ) : (
          <>{header_links}</>
        )}
      </div>
    </div>
  );
}
