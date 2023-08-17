import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ErrorAlert from "../layout/ErrorAlert";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

function NewTable() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    table_name: "",
    capacity: "",
  });
  const [error, setError] = useState(null);
  const [errorCapacity, setErrorCapacity] = useState(false);
  const [errorTableName, setErrorTableName] = useState(false);
  function handleChange({ target }) {
    const updatedFormData = {
      ...formData,
      [target.name]: target.value,
    };
    if (target.name === "capacity") {
      setErrorCapacity(updatedFormData.capacity < 1);
    }
    if (target.name === "table_name") {
      setErrorTableName(updatedFormData.table_name.length < 2);
    }
    setFormData(updatedFormData);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const newErrors = [];
    if (errorCapacity) {
      newErrors.push({ message: "Capacity must be 1 or more." });
    }
    if (errorTableName) {
      newErrors.push({ message: "Table name must be 2 or more characters." });
    }
    if (errorTableName || errorCapacity) {
      setError({ message: newErrors });
      return;
    } else {
      const abortController = new AbortController();
      const signal = abortController.signal;
      formData.capacity = Number(formData.capacity);
      try {
        await axios.post(
          `${API_BASE_URL}/tables`,
          { data: formData },
          { signal }
        );
        history.push(`/dashboard`);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
      }
      return () => abortController.abort();
    }
  }

  function handleCancel() {
    history.goBack();
  }

  return (
    <div>
      <form className="form-group" onSubmit={handleSubmit}>
        <label htmlFor="table_name">Table Name:</label>
        <input
          className="form-control"
          id="table_name"
          type="text"
          name="table_name"
          onChange={handleChange}
          value={formData.table_name}
          required
        />
        <label htmlFor="capacity">Capacity:</label>
        <input
          className="form-control"
          id="capacity"
          type="number"
          name="capacity"
          onChange={handleChange}
          value={formData.capacity}
          required
        />
        <button className="btn btn-primary m-1" type="submit">
          Submit
        </button>
        <button className="btn btn-danger m-1" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      <ErrorAlert error={error} />
    </div>
  );
}

export default NewTable;
