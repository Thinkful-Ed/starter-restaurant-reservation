import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, getReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";
import { assignTable } from "../utils/api";

function SeatReservation() {
  const [tableId, setTableId] = useState( null );
  console.log(tableId)

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState("");

  const [reservation, setReservation] = useState({});
  const [reservationError, setReservationError] = useState(null);

  const { reservation_id } = useParams();
  const history = useHistory();

  //get tables data from API
  useEffect(() => {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
    .then((tables) => {
      setTables(tables)
      setTableId(tables[0].table_id)
    })
    .catch(setTablesError);
    return () => abortController.abort();
  }, []);

  //get reservation data from API
  useEffect(() => {
    const abortController = new AbortController();
    setReservationError(null);

    getReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setReservationError);

    return () => abortController.abort();
  }, [reservation_id]);

  console.log("reservations", reservation);

  //change handler
  function changeHandler({ target }) {
    setTableId(target.value);
  }

  //submit handler to assign table
  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setTablesError(null);

    assignTable(reservation_id, tableId, abortController.signal)
      .then(() => history.push("/dashboard"))
      .catch(setTablesError);
    return () => abortController.abort();
  };

  //cancel Handler
  function cancelHandler(event) {
    event.preventDefault();
    history.push(`/dashboard?date=${today()}`);
  }

  //map and list the table names and capacity
  const chooseTable = tables.map(({ table_id, table_name, capacity }) => (
    <option key={table_id} value={table_id}>
      {table_name} - {capacity}
    </option>
  ));


  //variable to render submit and cancel buttons
  const buttons = () => {
    return (
      <>
        <button
          type="submit"
          onClick={submitHandler}
          className="btn btn-primary mr-5"
        >
          Submit
        </button>
        <button
          type="submit"
          onClick={cancelHandler}
          className="btn btn-danger"
        >
          Cancel
        </button>
      </>
    );
  };

  //JSX
  return (
    <>
      <h1>Seat Reservation</h1>
      <h2 key={reservation.reservation_id}>
      {reservation.last_name}: Party of {reservation.people}
    </h2>
      <div className="d-flex flex-col mt-4">
        <form>
          <label className="">Table# - Capacity</label>
          <select
            className="col text-center mb-5"
            name="table_id"
            onChange={changeHandler}
          >
            {chooseTable}
          </select>
        </form>
        <div className="col-5 mt-4 mr-auto">{buttons()}</div>
      </div>
      <ErrorAlert error={tablesError} />
      <ErrorAlert error={reservationError} />
    </>
  );
}

export default SeatReservation;
