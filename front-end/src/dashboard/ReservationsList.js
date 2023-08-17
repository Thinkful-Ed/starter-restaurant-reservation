import React from 'react';
import { formatAsDate, formatAsTime } from '../utils/date-time';

export default function ReservationsList({ reservations, date }) {
	return (
		<div>
			{reservations.length === 0 ? (
				<p>No reservations found.</p>
			) : (
				<div>
					{reservations.map((reservation) => (
						<div key={reservation.id}>
							<div className="card">
								<div className="card-body">
									<p>First Name: {reservation.first_name}</p>
									<p>Last Name: {reservation.last_name}</p>
									<p>Mobile Number: {reservation.mobile_number}</p>
									<p>Date: {formatAsDate(reservation.reservation_date)}</p>
									<p>Time: {formatAsTime(reservation.reservation_time)}</p>
									<p>Party Size: {reservation.people}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
