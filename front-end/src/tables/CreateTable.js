import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";

function CreateTable() {
  const initialFormState = {
    table_name: "",
    capacity: "",
  };

  const [newTable, setNewTable] = useState(initialFormState);
  const [reservationsError, setReservationsError] = useState(null);

  const history = useHistory();

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "capacity") {
      value = Number(value);
    }
    setNewTable({
      ...newTable,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createTable(newTable);
      history.push(`/dashboard`);
    } catch (error) {
      setReservationsError(error);
    }
    return abortController;
  };

  return (
    <div>
      <form
        className="row g-3 p-4 m-4 flex w-75 mx-auto bg-light"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center col-md-12">Make a Table</h1>
        <div className="col-md-12 p-2">
          <input
            name="table_name"
            className="form-control"
            placeholder="Table Name "
            id="table_name"
            onChange={handleChange}
            value={newTable.table_name}
          />
        </div>
        <div className="col-md-12 p-2">
          <input
            name="capacity"
            type="number"
            placeholder="Capacity"
            className="form-control"
            id="capacity"
            onChange={handleChange}
            value={newTable.capacity}
          />
        </div>
        <div className="col-6 p-2 d-flex justify-content-start">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <div className="col-6 p-2 d-flex justify-content-end">
          <button onClick={() => history.goBack()} className="btn btn-danger ">
            Cancel
          </button>
        </div>
      </form>
      <ErrorAlert error={reservationsError} />
    </div>
  );
}

export default CreateTable;
