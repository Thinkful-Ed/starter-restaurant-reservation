import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables } from "../utils/api";

function SeatReservation() {
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState([]);
  const [seatError, setSeatError] = useState(null);

  const history = useHistory();
  const { reservation_id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadTables() {
      const response = await listTables(abortController.signal);
      const APITable = response;
      setTables(() => APITable);
    }
    loadTables();
    return abortController.abort();
  }, [reservation_id]);

  const handleChange = ({ target }) => {
    setTableId(target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      // API for seat goes here
      history.push(`/dashboard`);
    } catch (error) {
      setSeatError(error);
    }
    return abortController;
  };

  const tableOptions = tables.map((table) => (
    <option key={table.table_id} value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ));

  return (
    <div>
      <form
        className="row row-cols-lg-auto g-3 align-items-center p-4 m-4 flex w-75 mx-auto bg-light"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center col-md-12">Select a Table</h1>
        <div className="col-12 p-2">
          <select 
          className="form-select w-100" 
          required={true}
          name="table_id"
          aria-label="Default select example"
          onChange={handleChange}
          >
            <option defaultValue={0}>Select a table</option>
            {tableOptions}
          </select>
        </div>
        <div className="col-6 p-2 d-flex justify-content-start">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <div className="col-6 p-2 d-flex justify-content-end">
          <button
            onClick={(event) => {
              event.preventDefault();
              history.goBack();
            }}
            className="btn btn-danger "
          >
            Cancel
          </button>
        </div>
      </form>
      <ErrorAlert error={seatError} />
    </div>
  );
}

export default SeatReservation;
