import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../ReservationsList/ReservationsList";
import "./Search.css";

export default function Search() {
	const initPhoneNumber = { mobile_number: "" };
	const [formData, setFormData] = useState(initPhoneNumber);
	const [reservations, setReservations] = useState(null);
	const [reservationsError, setReservationsError] = useState(null);

	const inputChangeHandler = (event) => {
		const value = event.target.value;
		const key = event.target.name;
		setFormData({ ...formData, [key]: value });
	};

	const findButtonHandler = async (event) => {
		event.preventDefault();
		try {
			const abortController = new AbortController();
			const response = await listReservations(
				formData,
				abortController.signal
			);
			setReservations(response);
		} catch (error) {
			setReservationsError(error);
		}
	};

	return (
		<div className="container-fluid">
			<h1>Search</h1>
			<form onSubmit={findButtonHandler}>
				<label htmlFor="mobile_number">Mobile Phone Number</label>
				<div style={{ display: "flex" }}>
					<input
						className="form-control"
						style={{ maxWidth: "300px" }}
						type="tel"
						name="mobile_number"
						placeholder="Enter a customer's phone number"
						onChange={inputChangeHandler}
						value={formData.mobile_number}
					></input>
					<button
						type="submit"
						name="find"
						className="btn btn-info"
						style={{ margin: "0 5px", width: "100px" }}
					>
						Find
					</button>
				</div>
			</form>
			<ErrorAlert error={reservationsError} />
			{reservations && reservations.length > 0 ? (
				<div className="card tables">
					<ReservationsList reservations={reservations} />
				</div>
			) : reservations ? (
				<h3>No reservations found</h3>
			) : null}
		</div>
	);
}
