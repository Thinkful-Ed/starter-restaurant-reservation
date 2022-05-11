import React from "react";
import { today, next, previous } from "../utils/date-time";
import { useHistory } from "react-router-dom";

function DateNav({ queryDate }) {
  const history = useHistory()
  const url = "/dashboard";

  return (
    <div>
      <button
        onClick={() => history.push(`${url}?date=${previous(queryDate)}`)}
      >
        Previous Date
      </button>
      <button onClick={() => history.push(`${url}?date=${today()}`)}>
        Current Date
      </button>
      <button onClick={() => history.push(`${url}?date=${next(queryDate)}`)}>
        Next Date
      </button>
    </div>
  );
}

export default DateNav;
