import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const user = props.user;
  const [navDispText, setNavDispText] = useState(() => {
    return user ? user.email : "";
  });
  useEffect(() => {
    if (!user) {
      setNavDispText("");
    } else {
      setNavDispText(
        user.info.name ? user.info.name + " " + user.info.lastName : user.email
      );
    }
  }, [user]);
  return (
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
        {user ? (
          <li style={{ float: "right" }}>
            <Link to="/user">{navDispText}</Link>
          </li>
        ) : null}
      </ul>
      ;
    </nav>
  );
};

export default NavBar;
