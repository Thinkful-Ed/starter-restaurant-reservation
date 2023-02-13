import React, { useState, useEffect } from "react";
import { listTables } from "../utils/api";
import { readReservation } from "../utils/api";
import { useParams } from "react-router";


export default function SeatReservation() {
    const [tables, setTables] = useState([]);
    const [tablesError, setTablesError] = useState(null);
    const [currentReservation, setCurrentReservation] = useState();
    const [currentReservationError, setCurrentReservationError] = useState(null);
    const {reservation_id} = useParams();

    // Load the current reservation's info
    function loadReservation() {
        const abortController = new AbortController();
        readReservation(reservation_id, abortController.signal)
            .then(setCurrentReservation)
            .catch(setCurrentReservationError);
        return () => abortController.abort();
    }
   
    useEffect(loadReservation, [])

    // Load the List of tables
    function loadTables() {
        const abortController = new AbortController();
        listTables(abortController.signal)
        .then(setTables)
        .catch(setTablesError);
        return () => abortController.abort();
    }
    useEffect(loadTables, [])




    
    return (
        <>
        <h4>Seat Reservation</h4>
        <div className="dropdown-container">
            <select name="table_id" >
                {tables.map((table) => (
                    <option key="table.table_id" value="table.table_id">
                        {table.table_id} - {table.capacity}
                    </option>
                ))}
            </select>


        </div>
        
        
        
        
        </>

    )
}