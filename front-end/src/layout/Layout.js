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
    <div className="container-fluid" style={{backgroundColor:"#D3D3D3"}}>
      <div className="row" style={{minHeight:"1000px"}}>
        <div className="col-lg-2 side-bar" style={{ paddingTop:"75px"}}>
          <Menu />
        </div>
        <div className="col">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;