import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, seatTables } from "../utils/api";

function SeatReservation() {
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState();
  const [seatError, setSeatError] = useState(null);

  const history = useHistory();
  const { reservation_id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    listTables(abortController.signal)
      .then((response) => setTables(response))
      .catch((error) => setSeatError(error));
    return () => abortController.abort();
  }, [reservation_id]);

  const handleChange = ({ target }) => {
    setTableId(target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!tableId || tableId === "0") {
      setSeatError({
        message: "You must select a table before seating a reservation.",
      });
      return;
    }
    const abortController = new AbortController();
    try {
      await seatTables(reservation_id, tableId);
      history.push(`/dashboard`);
    } catch (error) {
      setSeatError(error);
    }
    return () => abortController.abort();
  };

  const tableOptions = tables.map((table) => (
    <option key={table.table_id} value={table.table_id}>
      Name: {table.table_name} - Capacity: {table.capacity}
    </option>
  ));

  return (
    <div className="container-fluid d-flex flex-column w-75">
      <h1 className="p-4 m-2 text-center fs-1 fw-bold">Select a Table</h1>
      <div className="d-flex row justify-content-center">
        <form
          className="p-4 m-4 rounded-4 bg-transparent"
          style={{ width: "30rem" }}
          onSubmit={handleSubmit}
        >
          <div className="row">
            <div className="col-md-12 p-2">
              <select
                className="form-select form-control"
                required
                name="table_id"
                aria-label="Default select example"
                onChange={handleChange}
              >
                <option defaultValue={0}>Select a Table</option>
                {tableOptions}
              </select>
            </div>
          </div>
          {/* Buttons */}
          <div className="row">
            <div className="col-6 p-2">
              <button
                onClick={(event) => {
                  event.preventDefault();
                  history.goBack();
                }}
                className="btn btn-outline-danger"
              >
                Cancel
              </button>
            </div>

            <div className="col-6 p-2 d-flex justify-content-end">
              <button type="submit" className="btn btn-info px-4">
                Seat
              </button>
            </div>
          </div>
        </form>
        <ErrorAlert error={seatError} />
      </div>
    </div>
  );
}

export default SeatReservation;
