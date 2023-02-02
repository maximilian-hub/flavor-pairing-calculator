import React from "react";

export default function InfoPage(props) {
  return (
    <div className="info-page-container">
      <div className="info-page">{props.children}</div>
    </div>
  );
}
