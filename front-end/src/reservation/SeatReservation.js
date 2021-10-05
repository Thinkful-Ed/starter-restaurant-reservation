import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations, seatTable } from "../utils/api";

//On this page, the user chooses a table to seat a reservation at.
function SeatReservation({ loadDashboard, tables }) {
  const history = useHistory();

  const [table_id, setTableId] = useState(0);
  const [reservations, setReservations] = useState([]);
  const [reservationError, setReservationError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [apiError, setApiError] = useState(null);

  const { reservation_id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    setReservationError(null);

    listReservations(null, abortController.signal)
      .then(setReservations)
      .catch(setReservationError);

    return () => abortController.abort();
  }, []);

  if (!tables || !reservations) return null;

  const handleChange = ({ target }) => setTableId(target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Test 1");
    const abortController = new AbortController();

    if (validateSeat()) {
      console.log("Validated");
      seatTable(reservation_id, table_id, abortController.signal)
        .then((data) => {
          console.log("Test 2", data);
          return loadDashboard(data);
        })
        .then(() => history.push(`/dashboard`))
        .catch(setApiError);
    }

    return () => abortController.abort();
  };

  function validateSeat() {
    const foundErrors = [];

    const foundTable = tables.find(
      (table) => table.table_id === Number(table_id)
    );
    const foundReservation = reservations.find(
      (reservation) => reservation.reservation_id === Number(reservation_id)
    );

    if (!foundTable) {
      foundErrors.push("The table you selected does not exist.");
    } else if (!foundReservation) {
      foundErrors.push("This reservation does not exist.");
    } else {
      if (foundTable.status === "occupied") {
        foundErrors.push("The table you selected is currently occupied");
      }
      if (foundTable.capacity < foundReservation.people) {
        foundErrors.push(
          `The table you selected cannot seat ${foundReservation.people} people.`
        );
      }
    }
    setErrors(foundErrors);

    return foundErrors.length === 0;
  }

  const tableOptionsJSX = () => {
    return tables.map((table) => (
      <option key={table.table_id} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    ));
  };

  const errorsJSX = () => {
    return errors.map((error, id) => <ErrorAlert key={id} error={error} />);
  };

  return (
    <form className="form-select">
      {errorsJSX()}
      <ErrorAlert error={apiError} />
      <ErrorAlert error={reservationError} />

      <label className="form-label" htmlFor="table_id">
        Choose table:
      </label>
      <select
        className="form-control"
        name="table_id"
        id="table_id"
        value={table_id}
        onChange={handleChange}
      >
        <option value={0}>Choose A Table</option>
        {tableOptionsJSX()}
      </select>
      <button
        className="btn btn-primary m-1"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <button
        className="btn btn-danger m-1"
        type="button"
        onClick={history.goBack}
      >
        Cancel
      </button>
    </form>
  );
}

export default SeatReservation;
