import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div>
        <div className="col side-bar">
          <Menu />
        </div>
        <div className="col">
          <Routes />
        </div>
      </div>
  );
}

export default Layout;
