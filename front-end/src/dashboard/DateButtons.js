import React from "react";
import {useHistory, /*Link*/ } from "react-router-dom";

function DateButtons({ previous, today, next }) {
   const history = useHistory();
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
    </div>
  );
}

export default DateButtons;