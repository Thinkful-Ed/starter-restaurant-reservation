import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines tables form for creating a new table.
 * @returns {JSX.Element}
 */

export const TableForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [tableErrors, setTableErrors] = useState(null);

  useEffect(() => {
    myFunction();
    return () => {
      setFormData({});
    };
  }, []);

  const myFunction = () => {
    setFormData({
      table_name: "",
      capacity: 0,
    });
  };

  const onChangeHandler = (event) => {
    const property = event.target.name;
    const value =
      property === "capacity" ? Number(event.target.value) : event.target.value;
    setFormData({
      ...formData,
      [property]: value,
    });
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const abortController = new AbortController();

    createTable(formData, abortController.signal)
      .then(() => history.push(`/dashboard`))
      .catch(setTableErrors);
    return () => abortController.abort();
  };

  return (
    <div>
      <ErrorAlert error={tableErrors} />
      <form>
        <div>
          <label htmlFor="table_name">
            Table Name
            <input
              type="text"
              id="table_name"
              name="table_name"
              onChange={onChangeHandler}
              value={formData.table_name ? formData.table_name : ""}
            ></input>
          </label>
        </div>
        <div>
          <label htmlFor="capacity">
            Capacity
            <input
              type="number"
              min="0"
              id="capacity"
              name="capacity"
              onChange={onChangeHandler}
              value={formData.capacity ? formData.capacity : ""}
            ></input>
          </label>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={submitHandler}
        >
          Submit
        </button>
        <button className="btn btn-danger" onClick={cancelHandler}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TableForm;
