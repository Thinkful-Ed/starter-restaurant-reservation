import React, { Fragment, useState } from "react"
import NavBar from "./NavBar"
import SideBar from "./SideBar.js"
import Routes from "./Routes"

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  const [isHide, setIsHide] = useState(false)

  return (
    <Fragment>
      <header className="mb-3 border-bottom">
        <NavBar />
      </header>
      <div className="container-fluid">
        <div className="row h-100">
          <div
            className={
              isHide
                ? "col-md-2 col-xl-1 side-bar"
                : "col-md-3 side-bar min-width"
            }
          >
            <SideBar isHide={isHide} setIsHide={setIsHide} />
          </div>
          <div className="col">
            <Routes />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Layout
