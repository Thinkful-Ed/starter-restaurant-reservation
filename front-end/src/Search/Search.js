import React, { useState } from "react";

//import utility functions
import { searchReservations } from "../utils/api";

//import components
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "../reservations/ReservationList";

function Search(){
	const [input, setinput] = useState("");
	const [error, setError] = useState(null);
	const [reservations, setReservations] = useState([]);	
    
    
    function handleChange(event){
		const inputValue = event.target.value;
	
		const digitsOnly = inputValue.replace(/\D/g, "");
	
		setinput(digitsOnly);
	};

	async function handleSubmit(event){
		event.preventDefault();
		setError(null);

		const abortController = new AbortController();
		try {
			const data = await searchReservations(
				input,
				abortController.signal,
			);

			setReservations(data);
			setinput("");
		} catch (error) {
			if (error.name !== "AbortError") {
				setError(error);
			}
		}
		abortController.abort();
	};



	return (
		<main>
			<div className="col form-group">
				<div className="row d-md-flex my-3">
					<h2>Search for reservation</h2>

					<ErrorAlert error={error} />
				</div>

				<form onSubmit={handleSubmit}>
					<div className="row input-group mb-3 ">
						<input
							type="tel"
							className="form-control"
							name="mobile_number"
							placeholder="Search for customer by phone number"
							required={true}
							value={input}
							onChange={handleChange}
						/>
						<button
							className="btn btn-primary ml-2"
							id="searchBtn"
							type="submit">
							Search
						</button>
					</div>
				</form>
			</div>

			<div className="container-fluid col">
				<div className="row d-md-flex mb-3">
					<h4>Search Result :</h4>
				</div>
				{reservations.length > 0 ? (
					<div className="row d-md-flex mb-3">
						<ReservationList reservations={reservations} />
					</div>
				) : (
					<div
						className="row d-md-flex mb-3 alert text-center">
						No reservations found by the mobile number
					</div>
				)}
			</div>
		</main>
	);
};

export default Search;