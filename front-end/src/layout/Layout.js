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
    <div className="container-fluid max-height">
      <div className="row">
        <div className="col-lg-2 col-sm-4 side-bar">
          <Menu />
        </div>
        <div className="col-lg-10 col-sm-8">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
