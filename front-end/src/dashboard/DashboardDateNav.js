import React from "react";
import { useHistory } from "react-router-dom";
import { previous, next } from "../utils/date-time";

export default function DashboardDateNav({ date }) {
	const history = useHistory();

	const priorDayClickHandler = () => {
		let prevDay = previous(date);
		history.push(`/dashboard?date=${prevDay}`);
	};

	const todayClickHandler = () => {
		history.push(`/dashboard`);
	};

	const nextDayClickHandler = () => {
		let nextDay = next(date);
		history.push(`/dashboard?date=${nextDay}`);
	};

	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<button
				type="button"
				style={{ margin: "5px" }}
				className="btn btn-secondary"
				onClick={priorDayClickHandler}
			>
				Prior Day
			</button>
			<button
				type="button"
				style={{ margin: "5px" }}
				className="btn btn-success"
				onClick={todayClickHandler}
			>
				Today
			</button>
			<button
				type="button"
				style={{ margin: "5px" }}
				className="btn btn-secondary"
				onClick={nextDayClickHandler}
			>
				Next Day
			</button>
		</div>
	);
}
