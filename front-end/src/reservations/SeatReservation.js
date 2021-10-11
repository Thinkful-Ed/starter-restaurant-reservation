import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listTables, getReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

//useparams to get res id

function SeatReservation() {
  
  const [inputData, setInputData] = useState({ table_id: null });
  console.log(inputData)
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState("");

  const [reservations, setReservations] = useState([]);
  const [reservationError, setReservationError] = useState(null);

    const { reservation_id } = useParams();
  console.log(reservation_id);

  //get tables
  useEffect(() => {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }, []);

  //get reservation data
  useEffect(() => {
    const abortController = new AbortController();
    setReservationError(null);

    getReservation(reservation_id, abortController.signal)
      .then(setReservations) 
      .catch(setReservationError);

    return () => abortController.abort();
  }, [reservation_id]);

  function changeHandler({ target }) {
    setInputData({
      ...inputData,
      [target.name]:
        target.name === "table_id" ? Number(target.value) : target.value,
    });
  }

const chooseTable = tables.map(({ table_id, table_name, capacity }) => ( 
      <option key={table_id} value={table_id}>
        {table_name} - {capacity}
      </option>
));

  
  return (
    <>
      <h1>Seat Reservation</h1>
      <div className="d-flex">
      <select name="table_id">
      <option defaultValue>Table: # - Capacity: #</option>
 {chooseTable}
 </select>
</div>
     <ErrorAlert error={tablesError} />
     <ErrorAlert error={reservationError} />
     </>
  );
}

export default SeatReservation;
