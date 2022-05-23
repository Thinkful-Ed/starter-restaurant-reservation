import React from "react";
import { today, next, previous } from "../utils/date-time";
import { useHistory } from "react-router-dom";

function DateNav({ queryDate }) {
  const history = useHistory();
  const url = "/dashboard";

  return (
    <div className="btn-group mb-2 border border-dark rounded-lg">
      <button
        onClick={() => history.push(`${url}?date=${previous(queryDate)}`)}
        className="btn btn-success "
      >
        Previous Date
      </button>
      <button
        onClick={() => history.push(`${url}?date=${today()}`)}
        className="btn btn-success"
      >
        Current Date
      </button>
      <button
        onClick={() => history.push(`${url}?date=${next(queryDate)}`)}
        className="btn btn-success"
      >
        Next Date
      </button>
    </div>
  );
}

export default DateNav;
