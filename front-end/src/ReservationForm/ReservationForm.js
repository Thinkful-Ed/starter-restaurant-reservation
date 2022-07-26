import React from "react";
import { useHistory } from "react-router-dom";

export default function ReservationForm({
	reservation,
	setReservation,
	submitFunction,
}) {
	const history = useHistory();

	const submitHandler = (event) => {
		event.preventDefault();
		submitFunction();
	};

	const cancelHandler = (event) => {
		history.goBack();
	};

	const changeHandler = (event) => {
		const resKey = event.target.name;
		let resValue = event.target.value;
		if (resKey === "people" && resValue) {
			resValue = parseInt(resValue);
		}
		setReservation({ ...reservation, [resKey]: resValue });
	};
	return (
		<div className="card container-fluid" style={{ maxWidth: "700px" }}>
			<div className="card-body">
				<form onSubmit={submitHandler}>
					<div className="mb-3">
						<label htmlFor="first_name" className="form-label">
							First Name
						</label>
						<input
							onChange={changeHandler}
							type="text"
							required
							className="form-control"
							name="first_name"
							id="first_name"
							value={reservation.first_name}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="last_name" className="form-label">
							Last Name
						</label>
						<input
							onChange={changeHandler}
							type="text"
							required
							className="form-control"
							name="last_name"
							id="last_name"
							value={reservation.last_name}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="mobile_number" className="form-label">
							Mobile Number
						</label>
						<input
							onChange={changeHandler}
							type="tel"
							required
							className="form-control"
							name="mobile_number"
							id="mobile_number"
							value={reservation.mobile_number}
							placeholder="xxx-xxx-xxxx"
						/>
					</div>
					<div className="mb-3">
						<label
							htmlFor="reservation_date"
							className="form-label"
						>
							Date of Reservation
						</label>
						<input
							onChange={changeHandler}
							type="date"
							required
							className="form-control"
							name="reservation_date"
							id="reservation_date"
							value={reservation.reservation_date}
						/>
					</div>
					<div className="mb-3">
						<label
							htmlFor="reservation_time"
							className="form-label"
						>
							Time of Reservation
						</label>
						<input
							onChange={changeHandler}
							type="time"
							required
							className="form-control"
							name="reservation_time"
							id="reservation_time"
							value={reservation.reservation_time}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="people" className="form-label">
							Party Size
						</label>
						<input
							onChange={changeHandler}
							type="number"
							required
							className="form-control"
							name="people"
							id="people"
							min="1"
							value={reservation.people}
						/>
					</div>

					<div>
						<button
							type="button"
							onClick={cancelHandler}
							className="btn btn-danger"
							style={{ margin: "0 5px" }}
						>
							Cancel
						</button>

						<button
							type="submit"
							className="btn btn-primary"
							style={{ margin: "5px" }}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
