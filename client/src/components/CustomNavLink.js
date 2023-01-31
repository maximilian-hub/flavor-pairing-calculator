import React from "react";
import { NavLink } from "react-router-dom";

export default function CustomNavLink(props) {
  return (
    <NavLink
      to={props.to}
      style={{ color: "inherit", textDecoration: "none" }}
      activeStyle={{ color: "cornflowerblue" }}
    >
      {props.name}
    </NavLink>
  );
}
