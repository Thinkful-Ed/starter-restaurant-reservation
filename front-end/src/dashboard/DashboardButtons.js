import React from "react";
import { today, previous, next } from "../utils/date-time";

function DashboardButtons({ date, setDate }){
    const day = today();
    const nextDay = next(date);
    const prevDay = previous(date);

    return (
        <div>
            <button onClick={() => setDate(prevDay)}>
                <i/> Previous
            </button>
            <button onClick={() => setDate(day)}>
                Today
            </button>
            <button onClick={() => setDate(nextDay)}>
                Next <i/>
            </button>
        </div>
    )
}

export default DashboardButtons;