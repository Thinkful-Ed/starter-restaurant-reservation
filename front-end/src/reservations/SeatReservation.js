import { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { listTables } from "../utils/api";

function SeatReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const submitHandler = (event) => {
    event.preventDefault();
  };

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const tableRows = tables.map((table) => {
    return (
      <option value={table.table_id} key={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  return (
    <div>
      <h1>Seat Reservation #{reservation_id}</h1>
      <form>
        <p>Choose a table for the reservation:</p>
        <label htmlFor="table">
          <select name="table_id">{tableRows}</select>
        </label>
        <button onSubmit={submitHandler}>Submit</button>
        <button onClick={() => history.goBack()}>Cancel</button>
      </form>
    </div>
  );
}

export default SeatReservation;
