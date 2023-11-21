import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createTable } from "../utils/api";

function TableForm() {
  const history = useHistory();
  const initialFormData = {
    table_name: "",
    capacity: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

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

  const validateExists = (value) => {
    if (typeof value === "number") {
      return value;
    }
    return value && value.trim();
  };

  const validateForm = (formData) => {
    const errors = {};
    if (!validateExists(formData["table_name"])) {
      errors.table_name = "Please enter a name for this table.";
    }
    if (formData["table_name"].match(/\S{2}/) === null) {
      errors.table_name =
        "Please enter at least two characters for the table name.";
    }
    if (formData["capacity"] <= 0) {
      errors.capacity = "Please enter a table capacity of at least 1 person.";
    }

    return errors;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let errors = {};
    errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      //Display any errors
      Object.keys(errors).forEach((key) => {
        alert(errors[key]);
      });
      return false;
    }
    createTable(formData)
      .then(() => {
        setFormData(initialFormData);
      })
      .then(() => {
        history.push(`/dashboard`);
      });
  };

  return (
    <div>
      <form>
        <label htmlFor="table_name">
          Table Name
          <input
            type="text"
            id="table_name"
            name="table_name"
            onChange={onChangeHandler}
            value={formData.table_name}
          ></input>
        </label>
        <label htmlFor="capacity">
          Capacity
          <input
            type="number"
            id="capacity"
            name="capacity"
            onChange={onChangeHandler}
            value={formData.capacity}
          ></input>
        </label>
        <button type="submit" onClick={submitHandler}>
          Submit
        </button>
        <button onClick={cancelHandler}>Cancel</button>
      </form>
    </div>
  );
}

export default TableForm;
