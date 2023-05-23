import React, { useState } from "react";
import SearchForm from "./SearchForm";

function Search() {
    const [reservations, setReservations] = useState([])
    const [reservationsError, setReservationsError] = useState(null)

    return <div>
        <SearchForm setReservations={setReservations} setReservationsError={setReservationsError}/>
        {reservations.map(reservation=><p>{reservation.first_name}</p>)}
    </div>
}

export default Search

//MODULARIZE THE RESERVATION LIST TO BE INPUTTED ON THIS PAGE