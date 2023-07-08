/** @format */

import React from "react";

import ReservationCancel from "./ReservationCancel";

//user story #4 generate table rows dynamically based on the "reservations" data
//conditionally render different elements based on the reservation status
function ReservationList({ reservations, date }) {
	const tableRows = reservations.map(
		({
			reservation_id,
			first_name,
			last_name,
			mobile_number,
			reservation_date,
			reservation_time,
			people,
			status,
		}) => (
			<tr key={reservation_id}>
				<th scope="row">{reservation_id}</th>
				<td>{first_name}</td>
				<td>{last_name}</td>
				<td>{mobile_number}</td>
				<td>{reservation_date}</td>
				<td>{reservation_time}</td>
				<td>{people}</td>
				<td data-reservation-id-status={reservation_id}>{status}</td>
				<td>
					{status === "booked" && (
						<a
							className="btn btn-success"
							href={`/reservations/${reservation_id}/seat`}>
							Seat
						</a>
					)}
				</td>
				{status === "booked" || status === "seated" ? (
					<>
						<td>
							<a
								className="btn btn-primary"
								href={`/reservations/${reservation_id}/edit`}>
								Edit
							</a>
						</td>
						<td>
							<ReservationCancel reservation_id={reservation_id} />
						</td>
					</>
				) : (
					<>
						<td></td>
						<td></td>
					</>
				)}
			</tr>
		),
	);
	if (reservations.length > 0) {
		return (
			<div className="table table-striped table-responsive table-sm">
				<table className="table table-hover">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">First Name</th>
							<th scope="col">Last Name</th>
							<th scope="col">Mobile Number</th>
							<th scope="col">Date</th>
							<th scope="col">Time</th>
							<th scope="col">Number of people</th>
							<th scope="col">Status</th>
							<th scope="col"></th>
							<th scope="col"></th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>{tableRows}</tbody>
				</table>
			</div>
		);
	}
	return (
		<div
			className="container alert alert-dark"
			role="alert"
			style={{ minWidth: "100%" }}>
			{" "}
			{`No reservations found for ${date}.`}
		</div>
	);
}

export default ReservationList;
