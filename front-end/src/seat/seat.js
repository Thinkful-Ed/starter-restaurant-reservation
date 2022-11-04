import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listTables, updateSeat } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function Seat() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [tables, setTables] = useState([]);
  const [seatData, setSeatData] = useState("");
  const [tableError, setTableError] = useState(null);
  const [seatError, setSeatError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setTableError);
    return () => abortController.abort();
  }, [reservation_id]);

  function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    updateSeat(seatData, reservation_id, abortController.signal)
      .then(() => {
        history.push("/dashboard");
        setSeatData("");
      })
      .catch(setSeatError);
    return () => abortController.abort();
  }

  function handleChange(event) {
    setSeatData(event.target.value);
  }

  function handleCancel() {
    history.goBack();
  }

  if (tables) {
    return (
      <>

        <ErrorAlert error={tableError} />
        <ErrorAlert error={seatError} />

        <div className="my-4 d-flex justify-content-center">
          <h3> Current Reservation: {reservation_id} </h3>
        </div>

        <form className="form-group" onSubmit={handleSubmit}>
          <div className="col mb-3">
            <label className="form-label" htmlFor="table_id">
              Select Table
            </label>
            <select
              className="form-control bg-secondary bg-opacity-10"
              name="table_id"
              id="table_id"
              value={seatData}
              onChange={handleChange}
            >
              <option value=""> Table Name - Capacity </option>
              {tables.map((table) => {
                return (
                  <option
                    key={table.table_id}
                    value={table.table_id}
                    required={true}
                  >
                    {`${table.table_name} - ${table.capacity}`}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="btns d-flex justify-content-center mt-5">
          <button className="btn btn-primary mr-2" type="submit">
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          </div>
        </form>
      </>
    );
  } else {
    return (
      <div>
        <h1> No open tables to seat </h1>
      </div>
    );
  }
}
