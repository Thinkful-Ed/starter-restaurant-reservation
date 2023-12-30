import React, { useState } from "react";

import Reservation from "./Reservation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ListReservations({ reservations, setRefresh }) {
	// console.log("Reservations:", reservations)
	const [toggle, setToggle] = useState(true);

	const renderList = () => {
		// console.log("Reservations", reservations)
		if (!toggle || reservations.length === 0) return null;
		return reservations.map((reservation, index) => {
			if (
				reservation.status === "finished" ||
				reservation.status === "cancelled"
			)
				return null;
			return (
				<li className="list-group-item" key={index}>
					<Reservation
						reservation={reservation}
						setRefresh={setRefresh}
					/>
				</li>
			);
		});
	};

	const handleHide = () => setToggle(!toggle);

	return (
		<ul className="list-group py-3">
			<li className="list-group-item d-flex justify-content-between">
				<h5 className="my-auto">Reservations</h5>
				<p className="text-secondary my-auto" onClick={handleHide}>
					{toggle ? (
						<FontAwesomeIcon icon={faMinus} />
					) : (
						<FontAwesomeIcon icon={faPlus} />
					)}
				</p>
			</li>
			{renderList()}
		</ul>
	);
}
