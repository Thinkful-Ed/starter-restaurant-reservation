import React from "react";
import { Link } from "react-router-dom";
import { previous, next, today } from "../utils/date-time";

function Buttons({ date }) {
  return (
    <div className="d-flex justify-content-center">
      <Link to={`/dashboard?date=${previous(date)}`}>
        <button type="button" className="btn btn btn-info btn-block mr-2">
          Previous
        </button>
      </Link>
      <Link to={`/dashboard?date=${today()}`}>
        <button type="button" className="btn btn-secondary mx-3 btn-lg ">
          Today
        </button>
      </Link>
      <Link to={`/dashboard?date=${next(date)}`}>
        <button type="button" className="btn btn btn-info btn-block mr-4">
          Next
        </button>
      </Link>
    </div>
  );
}

export default Buttons;
