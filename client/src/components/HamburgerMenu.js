import React, { useState, useEffect } from "react";

export default function HamburgerMenu(props) {
  const [active, setActive] = useState(false);

  function toggleActive() {
    setActive(!active);
  }

  useEffect(() => {
    function handleDocumentClick(event) {
      if (!event.target.closest("#hamburger")) {
        setActive(false);
      }
    }

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [active]);

  const navLinks = props.children.map((link, i) => {
    return (
      <div className="hamburger-menu-item" onClick={toggleActive} key={i}>
        {link}
      </div>
    );
  });

  return (
    <div id="hamburger">
      <i
        className={"fa-solid fa-bars" + (active ? " active" : " inactive")}
        id="hamburger-icon"
        onClick={toggleActive}
      />
      <div id="hamburger-menu" className={active ? " active" : " inactive"}>
        {navLinks}
      </div>
    </div>
  );
}
