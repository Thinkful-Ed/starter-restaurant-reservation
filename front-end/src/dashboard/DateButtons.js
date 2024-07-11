import React, { useState } from "react";
import {useHistory, /*Link*/ } from "react-router-dom";

function DateButtons({ previous, today, next, date }) {

   const [formDate, setFormDate] = useState(date);
   const history = useHistory();
   
   function dateChangeHandler(event) {
    const newDate = event.target.value;
    setFormDate(newDate);
    history.push(`/dashboard?date=${newDate}`);
  }

  return (
    <div className="btn-group" role="group" aria-label="navigation buttons">
      {/* <Link className="btn btn-secondary" to={previous}>
        <span className="oi oi-chevron-left" />
        &nbsp;Previous
      </Link>
      <Link className="btn btn-secondary" to={today}>
        Today
      </Link>
      <Link className="btn btn-secondary" to={next}>
        Next&nbsp;
        <span className="oi oi-chevron-right" />
      </Link> */}
        <button         
            type="button" 
            className="btn btn-secondary mr-2"
            onClick={() => history.push(previous)}>
        Previous
        </button>
                  
        <button         
            type="button" 
            className="btn btn-secondary mr-2"
            onClick={() => history.push(today)}>
        Today
        </button>

        <button         
            type="button" 
            className="btn btn-secondary mr-2"
            onClick={() => history.push(next)}>
        Next
        </button>

        <label htmlFor='dashboard_date'>
          <input
            className="form-control date-control" 
            id="dashboard_date"
            name="dashboard_date"
            type="date"
            onChange={dateChangeHandler}
            value={formDate}
            
          />
        </label>

    </div>
  );
}

export default DateButtons;