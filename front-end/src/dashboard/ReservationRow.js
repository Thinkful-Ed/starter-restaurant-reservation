import React from "react";

export default function ReservationRow({ reservation }) {
	if(!reservation) return null;

	return (
		<tr>
			<th scope="row">{reservation.reservation_id}</th>
			
			<td>{reservation.first_name}</td>
			<td>{reservation.last_name}</td>
			<td>{reservation.mobile_number}</td>
			<td>{reservation.reservation_time}</td>
			<td>{reservation.people}</td>
			<td>{reservation.status}</td>
			
			<td>
				<a href={`/reservations/${reservation.reservation_id}/seat`}>
					<button type="button">Seat</button>
				</a>
			</td>
		</tr>
	);
}
