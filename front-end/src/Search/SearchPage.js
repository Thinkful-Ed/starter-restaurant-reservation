import React, { useState } from "react";
import SearchBar from "./SearchBar";
import ReservationList from "../dashboard/ReservationList";
import { listReservations, cancelReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SearchPage() {

    const [mobileNumber, setMobileNumber] = useState("");
    const [reservations, setReservations] = useState([]);
    const [errors, setErrors] = useState(null);

    function onCancel(reservation_id) {
        cancelReservation(reservation_id)
            .then(() => {
                listReservations({ mobile_number: mobileNumber })
                    .then(setReservations);
            })
            .catch(setErrors);
    }

    function handleChange(event) {
        setMobileNumber(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(mobileNumber);

        setErrors(null);
        setReservations([]);

        // call listReservations
        listReservations({ mobile_number: mobileNumber })
            .then((response) => {
                setReservations(response);
            })
            .catch(setErrors);
    }

    return (
        <main>
            <h1>Search Reservations</h1>
            <ErrorAlert error={errors} />
            <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} mobileNumber={mobileNumber} />
            <div className="row">
                <ReservationList reservations={reservations} onSearchPage={true} onCancel={onCancel} />
            </div>
        </main>
    )
}

export default SearchPage;