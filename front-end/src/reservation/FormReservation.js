import React from 'react';
import { useHistory } from 'react-router-dom';
import ErrorAlert from '../layout/ErrorAlert';

export default function FormReservation({reservation, setReservation, submitHandler, error}) {

	const history = useHistory();



	function changeHandler({ target: { name, value } }) {
		setReservation((previousReservation) => ({
			...previousReservation,
			[name]: value,
		}));
	}



	return (
		<div className='card'>
			<div className="card-header text-center ">
        <h2>New Reservation</h2>
				<div className="d-flex justify-content-center card-body">
					<form onSubmit={submitHandler}>
						<ErrorAlert error={error}/>
						<div>
							<div className="card text-center">
								<label>First Name</label>
								<input
									name="first_name"
									type="text"
									value={reservation.first_name}
									onChange={changeHandler}
								/>
							</div>
							<div className="card text-center">
								<label>Last Name</label>
								<input
									name="last_name"
									type="text"
									value={reservation.last_name}
									onChange={changeHandler}
								/>
							</div>
							<div className="card text-center">
								<label>Mobile Number</label>
								<input
									name="mobile_number"
									type="tel"
									value={reservation.mobile_number}
									onChange={changeHandler}
								/>
							</div>
							<div className="card text-center">
								<label>Date of Reservation</label>
								<input
									name="reservation_date"
									type="date"
									value={reservation.reservation_date}
									onChange={changeHandler}
								/>
							</div>
							<div className="card text-center">
								<label>Time of Reservation</label>
								<input
									name="reservation_time"
									type="time"
									value={reservation.reservation_time}
									onChange={changeHandler}
								/>
							</div>
							<div className="card text-center">
								<label>Party Size</label>
								<input
									name="people"
									type="number"
                  min={1}
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
