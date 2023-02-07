import React, { useState } from "react";

export default function InfoSection(props) {
  const [active, setActive] = useState(props.active);

  return (
    <>
      <div className="info-section">
        <div className="info-section-header" onClick={() => setActive(!active)}>
          <div className="info-section-header-spacer"></div>
          <div className="info-section-header-text">{props.header}</div>
          <i
            className={
              "info-section-header-button fa-regular fa-square-caret-down" +
              (active ? " active" : " inactive")
            }
          ></i>
        </div>
        {active ? (
          <div className="info-section-body">{props.children}</div>
        ) : null}
      </div>
    </>
  );
}
