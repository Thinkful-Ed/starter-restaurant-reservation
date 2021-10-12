import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listTables, getReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import SeatButtons from "../tables/SeatButtons";
//useparams to get res id

function SeatReservation() {

  const [inputData, setInputData] = useState({ table_id: null });

  console.log(inputData);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState("");

  const [reservations, setReservations] = useState([]);
  const [reservationError, setReservationError] = useState(null);

  const { reservation_id } = useParams();
  //console.log(reservation_id);

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
  }, [reservation_id, inputData]);
  console.log("reservations", reservations);

  function changeHandler({ target }) {
    setInputData(target.value);
  }


  const chooseTable = tables.map(({ table_id, table_name, capacity }) => (
    <option key={table_id} value={table_id}>
      {table_name} - {capacity}
    </option>
  ));

  const info = reservations.map(({ people, last_name, reservation_id }) => (
    <h2 key={reservation_id}>
      {last_name} party of {people}
    </h2>
  ));

  

  return (
    <>
      <h1>Seat Reservation</h1>
      {info}
      <form>
        <label>Table# - Capacity</label>
        <div>
          <select
            name="table_id"
            className="width auto"
            onChange={changeHandler}
          >
            {chooseTable}
          </select>
        </div>
        <div>
          <SeatButtons inputData={inputData} tables={tables} reservation_id={reservation_id}/>
        </div>
      </form>
      <ErrorAlert error={tablesError} />
      <ErrorAlert error={reservationError} />
    </>
  );
}

export default SeatReservation;
