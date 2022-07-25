export default function ReservationsList({ reservations }) {
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
					{res.status !== "booked" ? null : (
						<a
							className="btn btn-primary"
							href={`/reservations/${res.reservation_id}/seat`}
							role="button"
						>
							Seat
						</a>
					)}
				</td>
				<td>
					<a className = "btn btn-warning" href={`/reservations/${res.reservation_id}/edit`}>Edit</a>
				</td>
				<td>
					<button className = "btn btn-danger" data-reservation-id-cancel={res.reservation_id}>Cancel</button>
				</td>
			</tr>
		);
	});

	return (
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
	);
}
