/** @format */

import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";

//import components
import ErrorAlert from "../layout/ErrorAlert";

//import utility functions
import { listTables, seatReservation } from "../utils/api";

const ReservationSeat = () => {
	const { reservation_id } = useParams();
	const history = useHistory();

	const [formData, setFormData] = useState("");
	const [tables, setTables] = useState([]);
	const [error, setError] = useState(null);

	//load tables
	useEffect(() => {
		const abortController = new AbortController();
		setError(null);
		listTables(abortController.signal).then(setTables).catch(setError);
		return () => abortController.abort();
	}, [reservation_id]);

	const submitHandler = async (event) => {
		event.preventDefault();
		setError(null);

		const abortController = new AbortController();

		const tableId = Number(formData.table_id);
		const reservationId = Number(reservation_id);

		try {
			await seatReservation(tableId, reservationId, abortController.signal);
			history.push("/");
		} catch (error) {
			if (error.name !== "AbortError") {
				setError(error);
			}
		}
		return () => abortController.abort();
	};

	const changeHandler = ({ target: { name, value } }) => {
		setFormData((previousFormData) => ({
			...previousFormData,
			[name]: value,
		}));
	};

	return (
		<div className="container">
			<div className="row">
				<ErrorAlert error={error} />
			</div>
			<div className="card mt-3">
				<div className="card-body">
					<form onSubmit={submitHandler}>
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
								onChange={changeHandler}
								value={formData.table_id}
								className="form-control">
								<option value="">Select a table</option>
								{tables.map((table) => (
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
};

export default ReservationSeat;
