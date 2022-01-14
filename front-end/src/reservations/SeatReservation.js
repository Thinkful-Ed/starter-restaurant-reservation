import React, { useEffect, useState } from "react";
import { listTables, updateTable } from "../utils/api";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

const SeatReservation = () => {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const [selectValue, setSelectValue] = useState("");

  const { reservationId } = useParams();

  const history = useHistory();

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setError(null);
    listTables(abortController.signal).then(setTables).catch(setError);
    return () => abortController.abort();
  }

  function changeHandler(e) {
    setSelectValue({ [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    const abortController = new AbortController()
    e.preventDefault();
    updateTable(reservationId, Number(selectValue.table_id), abortController.signal)
      .then(() => history.push("/dashboard"))
      .catch(setError);

    return () => abortController.abort()
  };
  return (
    <div>
      <h1 className="text-center create-header">Seat a Reservation</h1>
      <ErrorAlert error={error} />

      <form onSubmit={handleSubmit} className="text-center">
        {tables && (
          <div className="form-group">
            <select name="table_id" required onChange={changeHandler} className="seat-select">
              <option value=""></option>
              {tables.map((table) => (
                <option value={table.table_id} key={table.table_id}>
                  {table.table_name} - {table.capacity}
                </option>
              ))}
            </select>
          </div>
        )}
        <button className="btn btn-danger" onClick={history.goBack}>Cancel</button>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SeatReservation;