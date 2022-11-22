import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { listTables, readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import SeatForm from "./SeatForm";

function Seat() {
    const [tables, setTables] = useState([]);
    const [tablesError, setTablesError] = useState(null);
    const [reservation, setReservation] = useState(null);
    const { reservation_id } = useParams();

    useEffect(() => {
        const loadRes = async () => {
            const data = await readReservation(reservation_id);
            setReservation(() => data);
        }
        
        loadRes();   
    }, [reservation_id]);
    useEffect(loadTables, [reservation]);


    function loadTables() {
        const abortController = new AbortController();
        setTablesError(null);
        if (reservation) {
            listTables({ reservation_date: reservation.reservation_date }, abortController.signal)
                .then(setTables)
                .catch(setTablesError)
        }
        return () => abortController.abort();
    }

    return (
        <>
            <ErrorAlert error={tablesError} />
            <h3>Seat </h3>

            {reservation ? <SeatForm reservation_id={reservation_id} reservation_date={reservation.reservation_date} tables={tables} />  : null}
        </>
    )
}

export default Seat;
