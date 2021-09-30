import React, { useState } from "react";

import { useHistory, useParams } from "react-router-dom";

function SeatReservation({ reservations, tables }) {
  const history = useHistory();

  const [tableId, setTableId] = useState(0);
  const [errors, setErrors] = useState([]);

  const { reservation_id } = useParams();

  if (!tables || !reservations) return null;

  const handleChange = ({ target }) => setTableId(target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateSeat()) {
      history.push(`/dashboard`);
    }
  };

  function validateSeat() {
    const foundErrors = [];

    const foundTable = tables.find((table) => table.table_id === tableId);
    const foundReservation = reservations.find(
      (reservation) => reservation.reservation_id === reservation_id
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
      <option value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    ));
  };
  return (
    <form>
      <label htmlFor="table_id">Choose table:</label>
      <select
        name="table_id"
        id="table_id"
        value={tableId}
        onChange={handleChange}
      >
        {tableOptionsJSX}
      </select>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      <button type="button" onClick={history.goBack}>
        Cancel
      </button>
    </form>
  );
}

export default SeatReservation;
