import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  const history = useHistory();
  let [number, setNumber] = useState("");

  const handleChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (number) {
      history.push(`search?mobile_number=${number}`);
    }
  };
  return (
    <nav className="navbar navbar-dark main-navbar navbar-expand-md shadow fixed-top ">
      <a className="navbar-brand logo white-text" href="/">
        <b>Dashboard</b>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item active">
            <Link className="nav-link  white-text" to="/dashboard">
              <span className="oi oi-home" />
              &nbsp;Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reservations/new">
              <span className="oi oi-plus" />
              &nbsp;New Reservation
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link green-text" to="/tables/new">
              <span className="oi oi-plus" />
              &nbsp;New Table
            </Link>
          </li>
        </ul>
        <form className="form-inline">
          <input
            className="form-control mr-2"
            type="search"
            placeholder="Search by phone number"
            aria-label="Search"
            onChange={handleChange}
            value={number}
            required
          />
          <button className="btn btn-light my-sm-0" onClick={handleSubmit}>
            Search
          </button>
        </form>
      </div>
    </nav>
    // <nav className="navbar navbar-dark align-items-start p-0">
    //   <div className="container-fluid d-flex flex-column p-0">
    //     <Link
    //       className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
    //       to="/"
    //     >
    //       <div className="sidebar-brand-text mx-3">
    //         <span>Periodic Tables</span>
    //       </div>
    //     </Link>
    //     <hr className="sidebar-divider my-0" />
    //     <ul className="nav navbar-nav text-light" id="accordionSidebar">
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/dashboard">
    //           <span className="oi oi-dashboard" />
    //           &nbsp;Dashboard
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/search">
    //           <span className="oi oi-magnifying-glass" />
    //           &nbsp;Search
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/reservations/new">
    //           <span className="oi oi-plus" />
    //           &nbsp;New Reservation
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/tables/new">
    //           <span className="oi oi-layers" />
    //           &nbsp;New Table
    //         </Link>
    //       </li>
    //     </ul>
    //     <div className="text-center d-none d-md-inline">
    //       <button
    //         className="btn rounded-circle border-0"
    //         id="sidebarToggle"
    //         type="button"
    //       />
    //     </div>
    //   </div>
    // </nav>
  );
}

export default Menu;
