import React from "react";
import { Link } from "react-router-dom";
import { next, previous, today } from "../utils/date-time";

function DashButtons({ date }) {

  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <Link to={`/dashboard?date=${previous(date)}`} className="btn btn-secondary">
        Previous
      </Link>
      <Link to={`/dashboard?date=${today(date)}`} className="btn btn-secondary">
        Today
      </Link>
      <Link to={`/dashboard?date=${next(date)}`} className="btn btn-secondary">
        Next
      </Link>
    </div>
  );
}

export default DashButtons;
