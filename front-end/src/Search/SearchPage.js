import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "./SearchBar";
import ReservationList from "../dashboard/ReservationList";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SearchPage() {

    const [mobileNumber, setMobileNumber] = useState("");
    const [reservations, setReservations] = useState([]);
    const [errors, setErrors] = useState(null);
    const history = useHistory();

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
                <ReservationList reservations={reservations} onSearchPage={true} />
            </div>
        </main>
    )
}

export default SearchPage;