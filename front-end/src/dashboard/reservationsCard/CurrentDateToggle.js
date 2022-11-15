import React from "react";
import { next, previous } from "../../utils/date-time";

function CurrentDateToggle({ history, setCurrentDate, currentDate }) {
    const goToPrev = () => {
        setCurrentDate((current) => previous(current));
    }

    const goToToday = () => {
        history.push("/");
    }

    const goToNext = () => {
        setCurrentDate((current) => next(current));
    }

    return (
        <div className="card-footer">
            <button type="button" className="btn btn-danger mr-3" onClick={goToPrev}>Prev</button>
            <button type="button" className="btn btn-success mr-3" onClick={goToToday}>Today</button>
            <button type="button" className="btn btn-primary" onClick={goToNext}>Next</button>
        </div>
    );
}

export default CurrentDateToggle;
