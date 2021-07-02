import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { previous, today, next } from "../utils/date-time";

export default function DateButtons({ date }){
    const history = useHistory()    
    const calendarChangeHandler = ( { target: { value } } ) => {
        history.push(`/dashboard?date=${value}`);
    }
    return (
        <div>
            <div className="input-group mb-3 col col-6">
                <div className="input-group-prepend">
                    <span className="input-group-text">Pick a date</span>
                </div>
                <input type="date" className="form-control" value={date} onChange={calendarChangeHandler}/>
            </div>
            <div className="btn-group col col-6 " >
                <Link to={`/dashboard?date=${previous(date)}`} type="button" className="btn btn-primary" > 
                    <span className="oi oi-arrow-circle-left" />
                    &nbsp; Prev
                </Link>
                <Link to={`/dashboard?date=${today()}`} type="button" className="btn btn-success ">
                    Today
                </Link>
                <Link to={`/dashboard?date=${next(date)}`} type="button" className="btn btn-primary ">
                    Next&nbsp;
                    <span className="oi oi-arrow-circle-right" />
                </Link>
            </div>
        </div>
    );
}