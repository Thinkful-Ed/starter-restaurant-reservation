import React from 'react';
import { useHistory } from 'react-router-dom';
import ErrorAlert from '../layout/ErrorAlert';

export default function FormReservation({
	reservation,
	setReservation,
	submitHandler,
	error,
}) {
	const history = useHistory();

	function changeHandler({ target: { name, value } }) {
		console.log(`Changing ${name} to ${value}`);

		const newValue = name === 'people' ? parseInt(value, 10) : value;

		console.log(`New value for ${name}: ${newValue}`);

		setReservation((previousReservation) => ({
			...previousReservation,
			[name]: newValue,
		}));
	}

	return (
		<div className="card">
			<div className="card-header text-center ">
				<h2>New Reservation</h2>
				<div className="d-flex justify-content-center card-body">
					<form onSubmit={submitHandler}>
						<ErrorAlert error={error} />
						<div>
							<div className="card text-center">
								<label>First Name</label>
								<input
									id="first_name"
									name="first_name"
									required={true}
									type="text"
									value={reservation.first_name}
									onChange={changeHandler}
								/>
							</div>
							<div className="card text-center">
								<label>Last Name</label>
								<input
									id="last_name"
									name="last_name"
									required={true}
									type="text"
									value={reservation.last_name}
									onChange={changeHandler}
								/>
							</div>
							<div className="card text-center">
								<label>Mobile Number</label>
								<input
									id="mobile_number"
									name="mobile_number"
									required={true}
									type="tel"
									value={reservation.mobile_number}
									onChange={changeHandler}
								/>
							</div>
							<div className="card text-center">
								<label>Date of Reservation</label>
								<input
									id="reservation_date"
									name="reservation_date"
									required={true}
									type="date"
									pattern="\d{4}-\d{2}-\d{2}"
									value={reservation.reservation_date}
									onChange={changeHandler}
								/>
							</div>
							<div className="card text-center">
								<label>Time of Reservation</label>
								<input
									id="reservation_time"
									name="reservation_time"
									required={true}
									type="time"
									pattern="\d{2}:\d{2}"
									value={reservation.reservation_time}
									onChange={changeHandler}
								/>
							</div>
							<div className="card text-center">
								<label>Number of People</label>
								<input
									id="people"
									name="people"
									type="number"
									required={true}
									min="1"
									value={reservation.people}
									onChange={changeHandler}
								/>
							</div>
						</div>
						<div className="card-footer d-flex justify-content-between">
							<button type="submit">Submit</button>
							<button type="button" onClick={history.goBack}>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
