import React from "react"
import { Link } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUtensils, faSearch } from "@fortawesome/free-solid-svg-icons"

export default function NavBar() {
  return (
    <nav className="container-fluid d-grid gap-3 align-items-center">
      <div className="row justify-content-between">
        <div className="col col-2 col-md-1 bg-info py-3">
          <Link to="/dashboard">
            <FontAwesomeIcon
              icon={faUtensils}
              size="2x"
              className="text-light ml-2"
            />
          </Link>
        </div>
        <h4 className="my-auto text-muted">Periodic Tables</h4>
        <Link to="/search">
          <FontAwesomeIcon icon={faSearch} className="mt-4 mr-5" size="lg" />
        </Link>
      </div>
    </nav>
  )
}
