import React, { useState } from "react";
import SearchForm from "./SearchForm";
import DashboardReservationList from "../dashboard/DashboardReservationList";

function Search() {
    const [reservations, setReservations] = useState([])
    const [reservationsError, setReservationsError] = useState(null)
    const [searchSubmitted, setSearchSubmitted] = useState(false)
    const statusToDisplay = [
        "seated",
        "booked",
        "finished",
        "cancelled"
    ]

    return <div>
        <h3>Find a Reservation</h3>
        <SearchForm setReservations={setReservations} setReservationsError={setReservationsError} setSearchSubmitted={setSearchSubmitted}/>
        <h5>Search Results</h5>
        {searchSubmitted && 
                (reservations.length > 0
                ? <DashboardReservationList reservations={reservations} reservationsError={reservationsError} statusToDisplay={statusToDisplay}/>
                : <p>No reservations found</p>)
        }
    </div>
}

export default Search