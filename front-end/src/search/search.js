import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ResTable from "../dashboard/ReservationDash/ResTable";
import ErrorAlert from "../layout/ErrorAlert";

export default function Search(){
    const [reservations, setReservations] = useState([]);
    const [input, setInput] = useState("");
    const [errs, setErrs] = useState(null);

    function handleChange(event){
        setInput(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        const abortController = new AbortController();
        listReservations({ mobile_number: input }, abortController.signal)
            .then(setReservations)
            .catch((err) => {
                setErrs({ message: err.message });
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Search Reservations</h1>
                <ErrorAlert error={errs} />
                <div className="form-group">
                    <label htmlFor="mobile_number">
                        Search by phone number
                    </label>
                    <input 
                        name="mobile_number"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
                <button className="btn btn-primary" type="submit">
                    Search
                </button>
                {reservations.length ? (
                   <ResTable
                    reservations={reservations}
                    setReservations={setReservations}
                    setError={setErrs}
                   />
                ) : (
                    <h2>Reservation not found</h2>
                )}
            </form>
        </div>
    )
}

