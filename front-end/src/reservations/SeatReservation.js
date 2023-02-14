import React, { useState, useEffect } from "react";
import { readReservation, listTables, updateTable } from "../utils/api";
import { useParams, useHistory } from "react-router";



export default function SeatReservation() {
    const history = useHistory();
    const [tables, setTables] = useState([]);
    const [tablesError, setTablesError] = useState(null);
    const [currentReservation, setCurrentReservation] = useState();
    const [currentReservationError, setCurrentReservationError] = useState(null);
    const {reservation_id} = useParams();
    const [selectedTable, setSelectedTable] = useState("");
    const [checkError, setCheckError] = useState("")

    // Load the current reservation's info
    function loadReservation() {
        const abortController = new AbortController();
        readReservation(reservation_id, abortController.signal)
            .then(setCurrentReservation)
            .catch(setCurrentReservationError);
        return () => abortController.abort();
    }
    useEffect(loadReservation, []);
   

    // Load the List of tables
    function loadTables() {
        const abortController = new AbortController();
        listTables(abortController.signal)
        .then(setTables)
        .catch(setTablesError);
        return () => abortController.abort();
    }
    useEffect(loadTables, [reservation_id]);
    
    function checkData(currentReservation, selectedTable){
        // TODO unused variables
        const { table_id, capacity, status } = selectedTable;
        const { people, reservation_id } = currentReservation;

        if(status != 'free'){
            setCheckError(`Table is not`)
        }
        if(people > capacity){
            setCheckError(`Party is too large for this table`)
        }
    }

    const errorDiv = checkError
    ? <div className="error alert alert-danger">
                <p>{checkError}</p>
            </div>
            : ``;

    const handleChange = ({ target }) => {
        setSelectedTable(tables.find((table) => (
            table.table_id == target.value
        )))
    }

    const [updateError, setUpdateError] = useState(null);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        checkData(currentReservation, selectedTable);
        if(!checkError){
            updateTable(selectedTable.table_id, currentReservation.reservation_id)
            .then(() => history.push('/dashboard'))
            .catch(setUpdateError)
        }

    }

    const goBack = (event) => {
        event.preventDefault();
        history.goBack();
    }

    const tableOptions = tables.map((table) => (
        <option key={table.table_id} value={table.table_id}>
            {`${table.table_name} - ${table.capacity}`}
        </option>
    ))

    return (
        <>
        <h4>Seat Reservation for #{reservation_id}</h4>
        <form onSubmit={handleSubmit}>
            <div className="dropdown-container">
                <select 
                    name="table_id" 
                    id="table_id"
                    onChange={handleChange}
                    required   
                    >
                <option value="">Select a table</option>
                {tableOptions}
                </select>
            </div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
                <button type="cancel" onClick={goBack}>Cancel</button>
            <div>
                {errorDiv}
            </div>
        </form>



        
        
        
        
        </>

    )
}