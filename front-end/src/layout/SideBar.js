import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// TODO: import better
import {
  faThumbtack,
  faCompass,
  faSearch,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons"

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

export default function SideBar({ isHide, setIsHide }) {
  const handleHide = () => {
    setIsHide(!isHide)
  }

  return (
    <nav>
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
        <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <div className="fs-4">
            <FontAwesomeIcon
              icon={faThumbtack}
              onClick={handleHide}
              className={isHide ? "rotate" : ""}
            />
          </div>
        </div>
        <hr />
        <div className={isHide ? "hidden-mobile" : ""}>
          <ul className="nav nav-pills flex-column mb-auto">
            <li>
              <Link to="/dashboard" className="nav-link text-white">
                <FontAwesomeIcon icon={faCompass} />
                {isHide ? "" : "Dashboard"}
              </Link>
            </li>
            <li>
              <Link to="/search" className="nav-link text-white">
                <FontAwesomeIcon icon={faSearch} /> {isHide ? "" : "Search"}
              </Link>
            </li>
            <li>
              <Link to="/reservations/new" className="nav-link text-white">
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                {isHide ? "" : "New Reservation"}
              </Link>
            </li>
            <li>
              <Link to="/tables/new" className="nav-link text-white">
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                {isHide ? "" : "New Table"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
