import React from "react";
import "./Menu.css"
import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <nav className="navbar navbar-dark align-items-start p-0">
      <div className="container-fluid flex-container justify-content-center p-0">
        <Link
          className="navbar-brand d-flex justify-content-center sidebar-brand m-0"
          to="/"
        >
          <div className="sidebar-brand-text mx-3 mb-2 mt-1">
            <h2>Periodic Tables</h2>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <ul className="nav navbar-nav text-light flex-container mb-1" id="accordionSidebar">
          <li>
          <div className="nav-item mr-3">
            <Link className="nav-link" to="/dashboard">
              <span className="oi oi-dashboard" />
              &nbsp;Dashboard
            </Link>
          </div>
          </li>
          <li>
          <div className="nav-item mr-3">
            <Link className="nav-link" to="/search">
              <span className="oi oi-magnifying-glass" />
              &nbsp;Search
            </Link>
          </div>
          </li>
          <li>
          <div className="nav-item mr-3">
            <Link className="nav-link" to="/reservations/new">
              <span className="oi oi-plus" />
              &nbsp;New Reservation
            </Link>
          </div>
          </li>
          <li>
          <div className="nav-item">
            <Link className="nav-link" to="/tables/new">
              <span className="oi oi-layers" />
              &nbsp;New Table
            </Link>
          </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
