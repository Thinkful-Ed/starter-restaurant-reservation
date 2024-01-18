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
    async function loadTables() {
      const response = await listTables(abortController.signal);
      const APITable = response;
      setTables(() => APITable);
    }
    loadTables();
    return () => abortController.abort();
  }, [reservation_id]);

  const handleChange = ({ target }) => {
    setTableId(target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await seatTables(reservation_id, tableId);
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
      <h1 className="p-4 m-4 text-center">Select a Table</h1>
      <form
        className="p-4 m-4 bg-light border border-info-subtle d-flex align-items-center"
        onSubmit={handleSubmit}
      >
        <div className="w-50 p-2">
          <select 
          className="custom-select" 
          required={true}
          name="table_id"
          aria-label="Default select example"
          onChange={handleChange}
          >
            <option defaultValue={0}>Select a Table</option>
            {tableOptions}
          </select>
        </div>
        <div className="ml-auto pr-3">
          <button type="submit" className="btn btn-primary d-flex justify-content-end">
            Submit
          </button>
        </div>
        <div className="">
          <button
            onClick={(event) => {
              event.preventDefault();
              history.goBack();
            }}
            className="btn btn-danger d-flex justify-content-end"
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
