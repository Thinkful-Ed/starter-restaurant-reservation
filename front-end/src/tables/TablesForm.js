import React from "react";

function TablesForm({ handleSubmit, handleCancel, handleChange, formData }) {
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-3 pt-3">Create new table</h2>
      <fieldset>
        <legend>Table Details</legend>
        <div className="mb-3">
          <label htmlFor="table_name" className="form-label">
            Table name
          </label>
          <input
            type="text"
            className="form-control"
            id="table_name"
            name="table_name"
            value={formData.table_name}
            onChange={handleChange}
            required
            placeholder="Table name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="capacity" className="form-label">
            Capacity
          </label>
          <input
            type="number"
            className="form-control"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
            placeholder="1"
            min={1}
          />
        </div>
      </fieldset>
      <div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button type="button" className="btn btn-danger ml-2" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TablesForm;
