import { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import {
  assignReservationToTable,
  listTables,
  readReservation,
  readTable,
} from "../utils/api";

//Page: /reservations/:reservation_id/seat
function SeatReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState({});
  const [, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [, setTablesError] = useState(null);
  const [selectedTable_id, setSelectedTable_id] = useState("");
  const [selectedTableObj, setSelectedTableObj] = useState({});

  function loadPage() {
    const abortController = new AbortController();
    setReservationsError(null);
    console.log("reservation_id", reservation_id);
    readReservation(reservation_id)
      .then(setReservation)
      .then(() => {
        console.log("reservation", reservation);
      })
      .catch(setReservationsError);
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  useEffect(loadPage, []);

  const tableRows = tables.map((table) => {
    return (
      <option value={table.table_id} key={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  async function submitHandler(event) {
    event.preventDefault();
    // validateReservationRequest();
    assignReservationToTable(selectedTable_id, reservation_id);
  }

  const handleChange = (event) => {
    setSelectedTable_id(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <h1>Seat Reservation #{reservation_id}</h1>
      <form>
        <p>Choose a table for the reservation:</p>
        <label htmlFor="table_selection">
          <select
            id="table_selection"
            name="table_selection"
            onChange={handleChange}
          >
            <option>Select a table</option>
            {tableRows}
          </select>
        </label>
        <button type="Submit" onClick={submitHandler}>
          Submit
        </button>
        <button onClick={() => history.goBack()}>Cancel</button>
      </form>
    </div>
  );
}

export default SeatReservation;
