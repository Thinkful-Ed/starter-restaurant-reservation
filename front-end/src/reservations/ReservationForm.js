/** @format */

import React from "react";

const ReservationForm = ({
	reservation,
	submitHandler,
	changeHangler,
	cancelHandler,
}) => {
	return (
		<main>
			<form onSubmit={submitHandler}>
				<label
					className="form-label"
					hemlFor="first_name">
					First Name:
				</label>
				<input
					className="form-control"
					type="text"
					id="first_name"
					name="first_name"
					required="true"
					value={reservation.first_name}
					placeholder="Guest's first name..."
				/>
			</form>
		</main>
	);
};

export default ReservationForm;
