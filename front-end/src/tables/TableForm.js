import React from "react";
import { useHistory } from "react-router-dom";

function TableForm({ handleSubmit, handleChange, handleCancel, table }) {
  const history = useHistory();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="table_name">
            Table Name
            <input
              type="text"
              id="table_name"
              name="table_name"
              placeholder="Table Numb i.e. Bar #3"
              required
              onChange={handleChange}
              value={table.table_name}
              className="form-control"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="capacity">
            Table Capacity
            <input
              type="number"
              id="capacity"
              name="capacity"
              placeholder="Table Capacity"
              required
              onChange={handleChange}
              value={table.capacity}
              className="form-control"
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="btn btn-secondary mx-1"
        >
          Cancel
        </button>
      </form>
    </>
  );
}

export default TableForm;
