import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { updateReservationStatus } from "../utils/api";

export default function ReservationsList({ reservations }) {
	const history = useHistory();
	const [reservationError, setReservationError] = useState(null);

	const cancelReservationHandler = async (event) => {
		const confirm = window.confirm(
			"Do you want to cancel this reservation? This cannot be undone."
		);
		const { reservationIdCancel } = event.target.dataset;

		if (confirm) {
			try {
				const abortController = new AbortController();

				const data = { status: "cancelled" };
				await updateReservationStatus(
					{ data },
					reservationIdCancel,
					abortController.signal
				);
				history.go(0);
			} catch (error) {
				setReservationError(error);
			}
		}
	};

	const reservationsArray = reservations.map((res, index) => {
		return (
			<tr key={index}>
				<td>{res.reservation_id}</td>
				<td data-reservation-id-status={res.reservation_id}>
					{res.status}
				</td>
				<td>{`${res.reservation_date} @ ${res.reservation_time}`}</td>
				<td>{res.people}</td>
				<td>{res.last_name}</td>
				<td>{res.first_name}</td>
				<td>{res.mobile_number}</td>
				<td>
					{res.status === "booked" ? (
						<a
							className="btn btn-primary"
							href={`/reservations/${res.reservation_id}/seat`}
							role="button"
						>
							Seat
						</a>
					) : null}
				</td>
				<td>
					{res.status === "booked" ? (
						<a
							className="btn btn-warning"
							href={`/reservations/${res.reservation_id}/edit`}
						>
							Edit
						</a>
					) : null}
				</td>
				<td>
					{res.status === "cancelled" ? null : (
						<button
							className="btn btn-danger"
							data-reservation-id-cancel={res.reservation_id}
							onClick={cancelReservationHandler}
						>
							Cancel
						</button>
					)}
				</td>
			</tr>
		);
	});

	return (
		<div>
			<ErrorAlert error={reservationError} />
			<table className="table table-hover">
				<thead>
					<tr>
						<th scope="col">Reservation ID</th>
						<th scope="col">Status</th>
						<th scope="col">Date &amp; Time</th>
						<th scope="col">Party Size</th>
						<th scope="col">Last Name</th>
						<th scope="col">First Name</th>
						<th scope="col">Phone</th>
					</tr>
				</thead>
				<tbody>{reservationsArray}</tbody>
			</table>
		</div>
	);
}
