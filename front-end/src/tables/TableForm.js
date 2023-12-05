import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function TableForm() {
  const [formData, setFormData] = useState({
    table_name: "",
    capacity: "",
  });
  const [nameIsTwoChars, setNameIsTwoChars] = useState(true);
  const [capacityIsOverOne, setCapacityIsOverOne] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();

  function handleNewTableSubmit(newTable) {
    newTable = { ...newTable, capacity: Number(newTable.capacity) };
    setTablesError(null); // Clear any previous errors
    createTable(newTable)
      .then((data) => {
        history.push("/dashboard");
      })
      .catch((error) => {
        // Handle API request errors here
        console.error("Error creating table:", error);
        setTablesError(error); // Set the error state for rendering in UI
      });
  }

  const handleChange = ({ target }) => {
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [target.name]: target.value,
      };
      return updatedFormData;
    });
  };

  function handleCancel() {
    history.goBack();
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormSubmitted(true); // Set the formSubmitted state to true
    // Additional logic or API calls can be added here
    if (capacityIsOverOne && nameIsTwoChars) {
      handleNewTableSubmit(formData)
    }
  }

  useEffect(() => {
    
    function validateTableName(name) {
      return name.length >= 2;
    }
  
    function validateCapacity(capacity) {
      return Number(capacity) >= 1;
    }
  
    // Validate functions return boolean values
    const isNameValid = validateTableName(formData.table_name);
    const isCapacityValid = validateCapacity(formData.capacity);
  
    // Update state based on validation results
    setNameIsTwoChars(isNameValid);
    setCapacityIsOverOne(isCapacityValid);
  }, [formData.table_name, formData.capacity, formSubmitted]);

  return (
    <div>
      <ErrorAlert error={tablesError} />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="table_name">Table Name:</label>
          <input
            type="text"
            className="form-control"
            id="table_name"
            name="table_name"
            placeholder="Table Name"
            onChange={handleChange}
            value={formData.table_name}
            required
          />
          {formSubmitted && !nameIsTwoChars && (
            <div className="alert alert-danger">
              <p>Table name must be at least two characters.</p>
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity:</label>
          <input
            type="number"
            className="form-control"
            id="capacity"
            name="capacity"
            placeholder="Capacity"
            onChange={handleChange}
            value={formData.capacity}
            required
          />
          {formSubmitted && !capacityIsOverOne && (
            <div className="alert alert-danger">
              <p>Capacity must be at least 1.</p>
            </div>
          )}
        </div>
        <div>
          <button onClick={handleCancel} className="btn btn-secondary m-1">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary m-1"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default TableForm;