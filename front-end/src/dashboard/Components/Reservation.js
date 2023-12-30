import axios from "axios";
import React, { useState } from "react";
import ErrorAlert from "../../layout/ErrorAlert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faClock,
	faCheck,
	faChair,
	faEdit,
	faBan,
} from "@fortawesome/free-solid-svg-icons";

import { convertFromMilitary } from "../../utils/date-time";

export default function Reservation({ reservation, setRefresh }) {
	// console.log("Reservation:", reservation)
	const [cancelError, setCancelError] = useState(null);

	const handleCancel = async () => {
		if (
			window.confirm(
				"Do you want to cancel this reservation? This cannot be undone.",
			)
		) {
			try {
				await axios.put(
					`${process.env.REACT_APP_API_BASE_URL}/reservations/${reservation.reservation_id}/status`,
					{ data: { status: "cancelled" } },
				);
				setRefresh(true);
			} catch (err) {
				if (err.response) {
					setCancelError(err.response.data);
				}
			}
		}
	};

	const seatButton = reservation.status === "booked" && (
		<a href={`/reservations/${reservation.reservation_id}/seat`}>
			<button className="btn btn-outline-dark">
				<FontAwesomeIcon icon={faChair} className="mr-2" />
				Seat
			</button>
		</a>
	);
	const editButton = reservation.status === "booked" && (
		<a href={`/reservations/${reservation.reservation_id}/edit`}>
			<button className="btn btn-outline-secondary">
				<FontAwesomeIcon icon={faEdit} className="mr-2" />
				Edit
			</button>
		</a>
	);
	const cancelButton = reservation.status === "booked" && (
		<button
			className="btn btn-danger"
			data-reservation-id-cancel={reservation.reservation_id}
			onClick={handleCancel}
		>
			<FontAwesomeIcon icon={faBan} />
		</button>
	);

	return (
		<div className="container card-body">
			<h5 className="text-center">
				{reservation.first_name} {reservation.last_name}
			</h5>
			<table className="table table-hover">
				<thead>
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Status</th>
						<th scope="col">Time</th>
						<th scope="col">Party of</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">{reservation.reservation_id}</th>
						<td>
							<p
								data-reservation-id-status={
									reservation.reservation_id
								}
							>
								{reservation.status === "booked" && (
									<span title="Booked" className="text-muted">
										<FontAwesomeIcon icon={faClock} />
									</span>
								)}
								{reservation.status === "seated" && (
									<span
										title="Seated"
										className="text-success"
									>
										<FontAwesomeIcon icon={faCheck} />
									</span>
								)}
							</p>
						</td>
						<td>
							<h5 className="my-auto">
								{convertFromMilitary(
									reservation.reservation_time,
								)}
							</h5>
						</td>
						<td>
							<h5 className="my-auto">{reservation.people}</h5>
						</td>
					</tr>
				</tbody>
			</table>
			<div className="d-flex justify-content-between">
				{seatButton}
				{editButton}
				{cancelButton}
			</div>
			<ErrorAlert error={cancelError} />
		</div>
	);
}
