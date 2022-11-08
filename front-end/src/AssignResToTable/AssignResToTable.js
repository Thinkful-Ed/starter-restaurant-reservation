import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";

const {
  //  listReservations,
  listTables,
  seatReservation,
} = require("../utils/api");

function AssignResToTable() {
  const { reservation_id } = useParams();
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [seat, setSeat] = useState(null);

  const history = useHistory();

  useEffect(loadTables, [reservation_id]);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);

    return () => abortController.abort();
  }

  const selectOptions = tables.map((table) => (
    <option key={table.table_id} value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ));

  function handleSeatChange(event) {
    setSeat(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    await seatReservation(seat, reservation_id, abortController.signal);
    history.push(`/dashboard`);
    return () => abortController.abort();
  };

  //list the table that has the reservation_id
  //   selectOptions will be each table's table_id

  //receive seat reservation by prop
  //filter tables for reservation id === null && seat > reservation party
  //use .map to create data set for list of tables

  return (
    <React.Fragment>
      <main>
        <h1>Seat Reservation</h1>
        <h3>Hello</h3>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div className="row">
              <div className="form-group col">
                <label htmlFor="table_id">Seat at:</label>
                <select
                  name="table_id"
                  id="table_id"
                  className="form-control"
                  onChange={handleSeatChange}
                  required
                >
                  <option defaultValue>Select a table</option>
                  {selectOptions}
                </select>
              </div>
            </div>
            <button className="btn btn-primary mr-1" type="submit">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => history.goBack()}
            >
              Cancel
            </button>
          </fieldset>
        </form>
        <ErrorAlert error={tablesError} />
      </main>
    </React.Fragment>
  );
}

export default AssignResToTable;
