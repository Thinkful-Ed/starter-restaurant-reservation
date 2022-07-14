import React from "react";
import { useHistory } from "react-router-dom";
import {today, previous, next} from "../utils/date-time"

export default function DashboardDateNav({date}) {
    const history = useHistory()
    
    const priorDayClickHandler = (event)=>{
        let prevDay = previous(date)
        history.push(`/dashboard?date=${prevDay}`)
    }
    
    const todayClickHandler = ()=>{
        history.push(`/dashboard`)
    }
    
    const nextDayClickHandler = ()=>{
        let nextDay = next(date)
        history.push(`/dashboard?date=${nextDay}`)
    }
    
	return (
		<div>
			<button type="button" onClick={priorDayClickHandler}>Prior Day</button>
			<button type="button" onClick={todayClickHandler}>Today</button>
			<button type="button" onClick={nextDayClickHandler}>Next Day</button>
		</div>
	);
}
