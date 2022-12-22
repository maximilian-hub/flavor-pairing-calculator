import React from "react";
export default function BodyPanel(props) {
  return (
    <div id="bodypanel-container">
      <div id="bodypanel">{props.children}</div>
    </div>
  );
}
