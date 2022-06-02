import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, updateTable, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservationForm() {
    // state and hooks
    const INITIAL_FORM_STATE = {
        table_id: "",
        reservation_id: ""
    }
    const [formData, setFormData] = useState({ ...INITIAL_FORM_STATE });
    const [tablesError, setTablesError] = useState(null);
    const [reservationError, setReservationError] = useState(null);
    const [tables, setTables] = useState([]);
    const [reservation, setReservation] = useState("Reservation info here");
    const history = useHistory();
    const { reservation_id } = useParams();


    // load tables and current seat reservation with useEffect
    useEffect(loadSeats, []);

    function loadSeats() {
        const abortController = new AbortController();
        setReservationError(null);
        readReservation(reservation_id, abortController.signal)
            .then(setReservation)
            .catch(setReservationError);

        setTablesError(null);
        listTables(abortController.signal)
            .then(setTables)
            .catch(setTablesError);
        return () => abortController.abort();
    }
    // handlers
    const handleChange = event => {
        const {target} = event;
        setFormData({
            ...formData, 
            [target.name]: target.value,
            reservation_id: reservation.reservation_id
        })
        console.log("handle change form data", formData);
    }

    const handleSubmit = event => {
        event.preventDefault();
        // const value = event.target.table_id.value;
        // console.log("dropdown value", event.target.table_id.value);
        console.log("form data", formData);
        // if (reservation.people < value) {
        // }
        updateTable({ ...formData })
            .then(() => {
                history.push(`/dashboard?date=${reservation.reservation_date}`);
            })
            .catch(error => {
                setTablesError(error);
            });
    }


    console.log("tables (seat reservation page)", tables);
    console.log("reservation (seat reservation page)", reservation);
    // error message

    let mappedTables;
    if (Array.isArray(tables)) mappedTables = tables.map(table => {
        return (
            <option key={table.table_id} value={table.table_id}>{table.table_name} - {table.capacity}</option>
        )
    });

    let reservationInfo;
    if (reservation) reservationInfo = `#${reservation.reservation_id} - ${reservation.first_name} ${reservation.last_name} on ${reservation.reservation_date} at ${reservation.reservation_time} for ${reservation.people}`;

    return (
        <form name="seat-reservation" onSubmit={handleSubmit}>
            <h1>Seat Reservation</h1>
            <ErrorAlert error={reservationError} />
            <ErrorAlert error={tablesError} />
            <h3>{reservationInfo}</h3>
            <div className="form-group">
                <div className="row">
                    <div className="col">
                        <label htmlFor="table_id">Seat at:</label>
                        <select
                            id="table_id"
                            name="table_id"
                            className="form-control"
                            required
                            onChange={handleChange}
                        >
                            <option>Select a table</option>
                            {mappedTables}
                        </select>
                    </div>
                </div>
            </div>
            <button className="btn btn-danger mr-2" type="cancel" onClick={() => history.go(-1)}>Cancel</button>
            <button className="btn btn-primary" type="submit">Submit</button>
        </form>
    )
}

export default SeatReservationForm;