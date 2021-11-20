import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav>
    <ul>
      {/* {Items.map()} */}
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/articles-list">Articles</Link>
      </li>
    </ul>
    ;
  </nav>
);

export default NavBar;
