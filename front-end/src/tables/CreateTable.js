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
  const [tablesError, setTablesError] = useState(null);

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
      setTablesError(error);
    }
    return abortController;
  };

  return (
    <div className="container-fluid d-flex flex-column w-75">
      <h1 className="p-4 m-2 text-center fs-1 fw-bold">Create a Table</h1>
      <div className="d-flex row justify-content-center">
        <form
          className="p-4 m-4 rounded-4 bg-transparent"
          style={{ width: "30rem" }}
          onSubmit={handleSubmit}
        >
          <div className="row">
            <div className="col-md-12 p-2">
              <input
                name="table_name"
                className="form-control"
                placeholder="Table Name"
                id="table_name"
                required={true}
                onChange={handleChange}
                value={newTable.table_name}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 p-2">
              <input
                name="capacity"
                type="number"
                placeholder="Capacity"
                className="form-control"
                id="capacity"
                required
                onChange={handleChange}
                value={newTable.capacity}
              />
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
                className="btn btn-outline-danger "
              >
                Cancel
              </button>
            </div>
            <div className="col-6 p-2 d-flex justify-content-end">
              <button type="submit" className="btn btn-info">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <ErrorAlert error={tablesError} />
    </div>
  );
}

export default CreateTable;
