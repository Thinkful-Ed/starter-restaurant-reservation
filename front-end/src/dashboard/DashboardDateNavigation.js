import React from "react"
import {Link} from "react-router-dom";
import {today, previous, next} from "../utils/date-time"

function DashboardDateNavigation({date}){
    return (
    <>
        <Link to={`/dashboard?date=${previous(date)}`}>
            <button className="btn btn-secondary">
                Previous Day
            </button>

        </Link>

        <Link to={`/dashboard?date=${today()}`}>
            <button className="btn btn-primary">
                 Today
            </button>
        </Link>

        <Link to={`/dashboard?date=${next(date)}`}>
            <button className="btn btn-secondary">
                Next Day
            </button>
        </Link>
    </>
    )
}

export default DashboardDateNavigation;