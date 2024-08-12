import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

function Layout() {
  return (
    <div className="d-md-flex">
      <Menu />
      <div className="flex-grow-1 w-md-75">
        <Routes />
      </div>
    </div>
  );
}

export default Layout;
