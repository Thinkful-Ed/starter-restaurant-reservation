import React, { useState, useEffect } from "react";
import { listTables } from "../utils/api";



export default function SeatReservation() {
    const [tables, setTables] = useState([]);
    const [tablesError, setTablesError] = useState(null);

    useEffect(loadTables, [])

    function loadTables() {
      const abortController = new AbortController();
      listTables(abortController.signal)
        .then(setTables)
        .catch(setTablesError);
      return () => abortController.abort();
    }

    console.log(tables)

    return (
        <>
        <h4>Seat Reservation</h4>
        <div className="dropdown-container">
            <select name="table_id" >
                {tables.map((table) => (
                    <option value="table.table_id">
                        {table.table_id} - {table.capacity}
                    </option>
                ))}
            </select>


        </div>
        
        
        
        
        </>

    )
}