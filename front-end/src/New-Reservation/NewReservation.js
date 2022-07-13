import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api"
import { today } from "../utils/date-time"
import ErrorAlert from "../layout/ErrorAlert";


function NewReservation() {
    const history = useHistory()
	const initReservation = {
		first_name: "",
		last_name: "",
		mobile_number: "",
		reservation_date: today(),
		reservation_time: "",
		people: 0,
	};

	const [reservation, setReservation] = useState(initReservation);
	const [reservationError,setReservationError] = useState(null)

    const submitHandler = async (event)=>{
        event.preventDefault()
        try{
			const abortController = new AbortController()
        	await createReservation({data:reservation}, abortController.signal)
		}catch(error){
			setReservationError(error)
		}
		if(!reservationError){
			history.push(`/dashboard?=${reservation.reservation_date}`)
		}
        
    }
	
	const cancelButtonHandler = (event)=>{
		history.goBack()
	}
    
	const formChangeHandler = (event) => {
		const resKey = event.target.name;
		const resValue = event.target.value;
		setReservation({ ...reservation, [resKey]: resValue });
	};
    
	return (
		<div className="card">
			<div class="card-body">
				
			
			<h1>New Reservation</h1>
			<ErrorAlert error={reservationError} />
			<form onSubmit={submitHandler}>
				<div className="mb-3">
					<label for="first_name" className="form-label">
						First Name
					</label>
					<input
						onChange={formChangeHandler}
						type="text"
						required
						className="form-control"
						name="first_name"
						id="first_name"
						value={reservation.first_name}
					/>
				</div>
				<div className="mb-3">
					<label for="last_name" className="form-label">
						Last Name
					</label>
					<input
						onChange={formChangeHandler}
						type="text"
						required
						className="form-control"
						name="last_name"
						id="last_name"
						value={reservation.last_name}
					/>
				</div>
				<div className="mb-3">
					<label for="mobile_number" className="form-label">
						Mobile Number
					</label>
					<input
						onChange={formChangeHandler}
						type="tel"
						required
						className="form-control"
						name="mobile_number"
						id="mobile_number"
						value={reservation.mobile_number}
					/>
				</div>
				<div className="mb-3">
					<label for="reservation_date" className="form-label">
						Date of Reservation
					</label>
					<input
						onChange={formChangeHandler}
						type="date"
						required
						className="form-control"
						name="reservation_date"
						id="reservation_date"
						min={today()}
						value={reservation.reservation_date}
					/>
				</div>
				<div className="mb-3">
					<label for="reservation_time" className="form-label">
						Time of Reservation
					</label>
					<input
						onChange={formChangeHandler}
						type="time"
						required
						className="form-control"
						name="reservation_time"
						id="reservation_time"
						value={reservation.reservation_time}
					/>
				</div>
				<div className="mb-3">
					<label for="people" className="form-label">
						Party Size
					</label>
					<input
						onChange={formChangeHandler}
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
					<button type="button" onClick={cancelButtonHandler} className="btn btn-danger">
						Cancel
					</button>
					
					<button type="submit"  className="btn btn-primary">
						Submit
					</button>
				</div>
			</form>
			</div>
		</div>
	);
}

export default NewReservation;
