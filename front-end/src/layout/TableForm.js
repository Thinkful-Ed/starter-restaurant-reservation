import React from "react";
import { useHistory } from "react-router-dom";

function TableForm({ handleSubmit, handleChange, formData }) {
  const history = useHistory();

  return (
    <div>
      <h1 className="mb-2">Create a Table</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="table_name">Table Name</label>
          <input
            type="text"
            className="form-control"
            id="table_name"
            placeholder="Table Name"
            name="table_name"
            onChange={handleChange}
            value={formData.table_name}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input
            type="number"
            className="form-control"
            id="capacity"
            placeholder="Capacity"
            name="capacity"
            onChange={handleChange}
            value={formData.capacity}
            required
          />
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.goBack()}
        >
           Cancel
        </button>
        <button type="submit" className="btn btn-info mx-3">
         Submit
        </button>
      </form>
    </div>
  );
}

export default TableForm;
