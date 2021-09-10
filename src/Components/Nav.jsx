import React from "react";
import "../index.css";
import { Link } from "react-router-dom";

function Nav() {
  const linkStyle = {
    color: "rgb(44, 44, 44)",
    textDecoration: "none",
  };
  return (
    <nav>
      <h3>Mono Project</h3>
      <ul className="nav-links">
        <Link style={linkStyle} to="/">
          <li>Home</li>
        </Link>
        <Link style={linkStyle} to="/Make">
          <li>Add/Remove Make</li>
        </Link>
        <Link style={linkStyle} to="/Model">
          <li>Add/Remove Model</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
