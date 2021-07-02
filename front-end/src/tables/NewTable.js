import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import ErrorAlert from "../layout/ErrorAlert";

import { createTable } from "../utils/api";

export default function NewTable({ loadDashboard }) {
  const history = useHistory();

  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    table_name: "",
    capacity: "",
  });

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]:
        target.name === "capacity" ? Number(target.value) : target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const abortController = new AbortController();

    if (validateFields()) {
      createTable(formData, abortController.signal)
        .then(loadDashboard)
        .then(() => history.push(`/dashboard`))
        .catch(setError);
    }

    return () => abortController.abort();
  }

  function validateFields() {
    let foundError = null;

    if (formData.table_name === "" || formData.capacity === "") {
      foundError = { message: "Please fill out all fields." };
    } else if (formData.table_name.length < 2) {
      foundError = { message: "Table name must be at least 2 characters." };
    }

    setError(foundError);

    return foundError === null;
  }

  return (
    <form>
      <ErrorAlert error={error} />

      <label className="form-label" htmlFor="table_name">
        Table Name:&nbsp;
      </label>
      <input
        className="form-control"
        name="table_name"
        id="table_name"
        type="text"
        minLength={2}
        onChange={handleChange}
        value={formData.table_name}
        required
      />

      <label className="form-label" htmlFor="capacity">
        Capacity:&nbsp;
      </label>
      <input
        className="form-control"
        name="capacity"
        id="capacity"
        type="number"
        min={1}
        onChange={handleChange}
        value={formData.capacity}
        required
      />

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
