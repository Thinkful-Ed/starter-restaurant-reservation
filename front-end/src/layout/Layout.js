import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

function Layout() {
  return (
    <div>
      <Menu />
        <div className="col">
          <Routes />
        </div>
    </div>
  );
}

export default Layout;
