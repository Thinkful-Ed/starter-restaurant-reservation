/** @format */

import React from "react";
import InputMask from "react-input-mask";

const ReservationForm = ({
	reservation,
	submitHandler,
	changeHandler,
	cancelHandler,
}) => {
	return (
		<main>
			<form onSubmit={submitHandler}>
				<div className="mb-3">
					<label
						className="form-label"
						htmlFor="first_name">
						{" "}
						First Name:
					</label>
					<input
						className="form-control"
						type="text"
						id="first_name"
						name="first_name"
						required="true"
						value={reservation.first_name}
						onChange={changeHandler}
						placeholder="Enter guest's first name here."
					/>
				</div>
				<div className="mb-3">
					<label
						className="form-label"
						htmlFor="last_name">
						{" "}
						Last Name:
					</label>
					<input
						className="form-control"
						type="text"
						id="last_name"
						name="last_name"
						required="true"
						value={reservation.last_name}
						onChange={changeHandler}
						placeholder="Enter guest's last name here."
					/>
				</div>
				<div className="mb-3">
					<label
						className="form-label"
						htmlFor="mobile_number">
						{" "}
						Mobile Number:
					</label>
					<input
						className="form-control"
						type="tel"
						id="mobile_number"
						name="mobile_number"
						required="true"
						value={reservation.mobile_name}
						onChange={changeHandler}
						placeholder="123-456-7890"
					/>
				</div>
				<div className="mb-3">
					<label
						className="form-label"
						htmlFor="reservation_date">
						{" "}
						Reservation Date:
					</label>
					<input
						className="form_control"
						type="date"
						id="reservation_date"
						name="reservation_date"
						required="true"
						value={reservation.reservation_date}
						onChange={changeHandler}
						placeholder="YYYY-MM-DD"
						pattern="\d{4}-\d{2}-\d{2}"
					/>
				</div>
				<div className="mb-3">
					<label
						className="form-label"
						htmlFor="reservation_time">
						{" "}
						Reservation Time:
					</label>
					<input
						className="form_control"
						type="time"
						id="reservation_time"
						name="reservation_time"
						required="true"
						value={reservation.reservation_time}
						onChange={changeHandler}
						placeholder="HH:MM"
						pattern="[0-9]{2}:[0-9]{2}"
					/>
				</div>
				<div className="mb-3">
					<label
						className="form-label"
						htmlFor="people">
						{" "}
						Number of guests:
					</label>
					<input
						className="form_control"
						type="number"
						id="people"
						name="people"
						required="true"
						value={reservation.people}
						onChange={changeHandler}
						placeholder="Click the drop-down selector."
						min={1}
					/>
				</div>
			</form>
		</main>
	);
};

export default ReservationForm;
