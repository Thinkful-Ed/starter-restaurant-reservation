import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

function Layout() {
  return (
    <div>
      <Menu />
      <div className="row">
        <div className="col">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
