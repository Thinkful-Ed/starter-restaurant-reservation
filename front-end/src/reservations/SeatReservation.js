import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { hasValidTableIdAndReservationId } from "../validations/hasValidTableIdAndReservationId";
import { listTables, seatReservation } from "../utils/api";
import SeatReservationForm from "../forms/SeatReservationForm";

function SeatReservation() {
    const [seatReservationErrors, setSeatReservationErrors] = useState([]);
    const [tables, setTables] = useState([]);
    const [tableId, setTableId] = useState("");
    const { reservation_id } = useParams();
    const history = useHistory();

    useEffect(() => {
      const abortController = new AbortController();
      setTables([]);
      setSeatReservationErrors([]);
      async function loadTables() {
        try {
          const tablesList = await listTables(abortController.signal);
          setTables(tablesList);
          setTableId(tablesList[0]?.table_id || ""); // Initialize tableId with the first table's ID if available
        } catch (error) {
          setSeatReservationErrors([error.response?.data?.error || error.message || "Unknown error occurred."]);
        }
      }
      loadTables();
      return () => abortController.abort();
    }, []);
  
    const submitHandler = async (event) => {
        event.preventDefault();
        const abortController = new AbortController(); 
          
        const validationErrors = hasValidTableIdAndReservationId(tableId, reservation_id);
        if (Object.keys(validationErrors).length > 0) {
            const errorMessages = Object.values(validationErrors).map(error => error.message || error);
            setSeatReservationErrors(errorMessages);
            abortController.abort();
            return;
        }
       
        try {
            const response = await seatReservation(tableId, reservation_id, abortController.signal);
            history.push("/dashboard");
        } catch (error) {
            setSeatReservationErrors([error.response?.data?.error || error.message || "Unknown error occurred."]);
        } finally {
            abortController.abort();
        }
    };

    return (
        <div>
            <h1 className="mb-3">Seat Reservation</h1>
            <ErrorAlert errors={seatReservationErrors} />
            {tables.length > 0 ? (
                <SeatReservationForm tables={tables} tableId={tableId} setTableId={setTableId} submitHandler={submitHandler} />
            ) : (
                <p>Loading tables...</p>
            )}
        </div>
    );
}

export default SeatReservation;
