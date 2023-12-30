import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function NewReservation() {
	const initialFormState = {
		first_name: "",
		last_name: "",
		mobile_number: "",
		reservation_date: "",
		reservation_time: "",
		people: "",
	};
	const history = useHistory();
	const [formData, setFormData] = useState({ ...initialFormState });
	const [reservationsError, setReservationsError] = useState(null);

	// Allows the ability to edit a reservation instead
	const { reservation_id } = useParams();
	useEffect(loadReservation, [reservation_id]);

	function loadReservation() {
		setReservationsError(null);
		if (reservation_id) {
			readReservation(reservation_id)
				.then((reservation) => {
					setFormData({
						...reservation,
						reservation_date: reservation.reservation_date.slice(
							0,
							10,
						),
					});
				})
				.catch(setReservationsError);
		}
	}

	// HANDLERS
	const handleChange = ({ target }) => {
		setFormData({
			...formData,
			[target.name]: target.value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(formData)
		try {
			if (reservation_id) {
				console.log(formData);
				await axios.put(
					`${process.env.REACT_APP_API_BASE_URL}/reservations/${reservation_id}`,
					{ data: formData },
				);
			} else {
				formData.people = Number(formData.people);
				await axios.post(
					`${process.env.REACT_APP_API_BASE_URL}/reservations`,
					{
						data: formData,
					},
				);
			}
			history.push(`/dashboard?date=${formData.reservation_date}`);
		} catch (err) {
			if (err.response) {
				console.log(err.response);
				setReservationsError(err.response.data);
			}
		}
	};
	const handleCancel = () => {
		history.goBack();
	};

	return (
		<div className="component">
			<h1>Reservation Details</h1>
			<hr />
			<div className="form-component m-5">
				<form onSubmit={handleSubmit}>
					<div className="row">
						<div className="col col-12 col col-md-6 form-group">
							<label htmlFor="first_name">First Name</label>
							<input
								type="text"
								className="form-control"
								name="first_name"
								placeholder="Customer's first name here"
								onChange={handleChange}
								value={formData.first_name}
							/>
						</div>
						<div className="col col-12 col-md-6 form-group">
							<label htmlFor="last_name">Last Name</label>
							<input
								type="text"
								className="form-control"
								name="last_name"
								placeholder="Customer's last name here"
								onChange={handleChange}
								value={formData.last_name}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col col-9 col-md-6 col-xl-3 form-group">
							<label htmlFor="mobile_number">Mobile Number</label>
							<input
								type="tel"
								className="form-control"
								name="mobile_number"
								placeholder="E.g. 541-444-0755"
								onChange={handleChange}
								value={formData.mobile_number}
							/>
						</div>
						<div className="col col-4 col-md-6 col-xl-2 form-group">
							<label htmlFor="people">Party Size</label>
							<input
								type="number"
								className="form-control"
								name="people"
								onChange={handleChange}
								value={formData.people}
							/>
						</div>
						<div className="col col-8 col-md-6 col-xl-4 form-group">
							<label htmlFor="reservation_date">Date</label>
							<input
								type="date"
								placeholder="YYYY-MM-DD"
								pattern="\d{4}-\d{2}-\d{2}"
								className="form-control"
								name="reservation_date"
								onChange={handleChange}
								value={formData.reservation_date}
							/>
						</div>
						<div className="col col-6 col-md-6 col-xl-3 form-group">
							<label htmlFor="reservation_time">Time</label>
							<input
								type="time"
								placeholder="HH:MM"
								pattern="[0-9]{2}:[0-9]{2}"
								className="form-control"
								name="reservation_time"
								onChange={handleChange}
								value={formData.reservation_time}
							/>
						</div>
					</div>
					<button type="submit" className="btn btn-outline-dark m-2">
						Submit
					</button>
					<button
						onClick={handleCancel}
						className="btn btn-outline-secondary m-2 ml-4"
					>
						Cancel
					</button>
				</form>
				<ErrorAlert error={reservationsError} />
			</div>
		</div>
	);
}
