import React from "react";
import { NavLink } from "react-router-dom";

export default function CustomNavLink(props) {
  return (
    <NavLink
      to={props.to}
      className={(navData) =>
        navData.isActive ? "navlink navlink-active" : "navlink navlink-inactive"
      }
    >
      {props.name}
    </NavLink>
  );
}
