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
    <div className="container-fluid">
      <div className="row-2">
        <div className="col-md-12 side-bar">
          <Menu />
          {/* <img src="/images/jay-wennington-N_Y88TWmGwA-unsplash.jpg" classNam3="img-fluid"/> */}
        </div>
        <div className="col">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
