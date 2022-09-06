import React, { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservation() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    table_name: "",
    capacity: 0,
  });
  const [newReservationError, setNewReservationError] = useState(null);

  const handleInputChange = (event) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  async function handleSubmit(event) {
    event.preventDefault();
    setNewReservationError(null);
    try {
      formData.capacity = Number(formData.capacity);
      const newTable = await createTable(formData);
      console.log(newTable);
      console.log(newTable.error);
      const formDate = formData.reservation_date;
      history.push(`/dashboard?date=${formDate}`);
    } catch (error) {
      if (error.name !== "AbortError") setNewReservationError(error);
    }
  }

  return (
    <main>
      <h1>New Table</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="table_name" className="col-sm-2 col-form-label">
            Table name
          </label>
          <input
            required
            type="text"
            name="table_name"
            id="table_name"
            onChange={handleInputChange}
          />
          <label for="capacity" className="col-sm-2 col-form-label">
            Capacity
          </label>
          <input
            required
            type="number"
            name="capacity"
            id="capacity"
            onChange={handleInputChange}
          />
          <div>
            <ErrorAlert error={newReservationError} />
            <button className="btn btn-primary mr-1" type="submit">
              Submit
            </button>
            <button
              className="btn btn-secondary mr-1"
              onClick={() => history.goBack(1)}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default NewReservation;
