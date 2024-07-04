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
      const abortController = new AbortController()
      setTables([]);
      setSeatReservationErrors([]);
      async function loadTables() {
        try{
          const tablesList = await listTables(abortController.signal);
          setTables(tablesList);
        }
        catch(error){
          setSeatReservationErrors([error]);
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
            setSeatReservationErrors([errorMessages]);
            abortController.abort();
            return;
        }
       
        try {
            const response = await seatReservation( tableId, reservation_id, abortController.signal);
            console.log("Reservation seated successfully:", response);
            history.push("/dashboard");
        } 
        catch (error) {
            console.error("Error during reservation seating:", error);
            setSeatReservationErrors([error.response?.data?.error || error.message || "Unknown error occurred."]);
            abortController.abort();
        }
    
      };

return (
    <div>
        <h1 className="mb-3">Seat Reservation</h1>
        <ErrorAlert errors={seatReservationErrors} />
        <div><SeatReservationForm  tables ={tables} tableId ={tableId} setTableId={setTableId} submitHandler={submitHandler} /></div> 
    </div>
  );

}

export default SeatReservation;