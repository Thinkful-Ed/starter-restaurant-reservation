/** @format */

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { seatReservation, listTables } from "../utils/api";

//user story #4; assign (seat) a reservation to a specific table
function ReservationSeat() {
	//retrieve the reservation_id from the URL parameters
	const { reservation_id } = useParams();
	//access history object to allow navigation within the app
	const history = useHistory();
	//initialize states: formData stores the form data as ""
	const [formData, setFormData] = useState("");
	//tables holds an [] of available tables
	const [availableTables, setavailableTables] = useState([]);
	//handle errors that occur during API reqs
	const [error, setError] = useState(null);

	//load available tables, when component mounts or reservation_id changes
	useEffect(() => {
		//initialize abort controller
		const abortController = new AbortController();
		//clear errors
		setError(null);
		//initiate asynchronous API req with listTables()
		listTables(abortController.signal).then(setavailableTables).catch(setError);
		return () => abortController.abort();
	}, [reservation_id]);
	//when the user submits the form, initiates an asynchronous API req
	const handleSubmit = async (event) => {
		//prevent default form behavior
		event.preventDefault();
		//clear errors
		setError(null);
		//initialize an abort controller to stop API req
		const abortController = new AbortController();
		//convert table id and reservation id to Number format and assign to variables
		const tableId = Number(formData.table_id);
		const reservationId = Number(reservation_id);

		//initiate an asynchronous API req
		//pass the tableId and reservationId with the abort controller signal
		try {
			await seatReservation(tableId, reservationId, abortController.signal);
			//a successful request redirects to home
			history.push("/");
			//error handling logic
		} catch (error) {
			if (error.name !== "AbortError") {
				setError(error);
			}
		}
		return () => abortController.abort();
	};
	//update the formData state form user input
	const handleChange = ({ target: { name, value } }) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};
	//define layout and structure
	//select table with drop down menu; submit and cancel buttons; Error Alert
	return (
		<div className="container">
			<div className="row">
				<ErrorAlert error={error} />
			</div>
			<div className="card mt-3">
				<div className="card-body">
					<form onSubmit={handleSubmit}>
						<h2 className="card-title">
							Seat reservation number {reservation_id}
						</h2>
						<div className="card-text mb-3">
							<label
								htmlFor="table_id"
								className="form-label">
								Table number:
							</label>
							<select
								id="table_id"
								name="table_id"
								onChange={handleChange}
								value={formData.table_id}
								className="form-control">
								<option value="">Select a Table</option>
								{availableTables.map((table) => (
									<option
										key={table.table_id}
										value={table.table_id}>
										{table.table_name} - {table.capacity}
									</option>
								))}
							</select>
						</div>

						<button
							type="submit"
							className="btn btn-primary card-link">
							Submit
						</button>
						<button
							type="button"
							className="btn btn-secondary card-link"
							onClick={() => history.goBack()}>
							Cancel
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ReservationSeat;
