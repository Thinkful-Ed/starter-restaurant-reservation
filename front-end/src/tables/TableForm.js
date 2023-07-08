/** @format */

import React from "react";

// To allow user to assign a reservation to a specific table and
// so that user will then be able to know which tables are occupied/free,
// provde a table creation form so that use can name/identify specific tables
function TableForm({ submitHandler, cancelHandler, changeHandler, formData }) {
	return (
		<form onSubmit={changeHandler}>
			<fieldset>
				<h2 className="mb-3 pt-3">Create a New Table</h2>
				<div className="mb-3">
					<label
						className="form-label"
						htmlFor="table_name">
						{" "}
						Table Name
					</label>
					<input
						className="form_contorl"
						name="table_name"
						id="table_name"
						type="text"
						value={formData.table_name}
						maxLength="100"
						minLength="2"
						onChange={changeHandler}
					/>
				</div>
				<div className="mb-3">
					<label
						className="form_label"
						htmlFor="capacity">
						Capacity
					</label>
					<input
						className="form-control"
						name="capacity"
						id="capacity"
						type="number"
						required={true}
						value={formData.capacity}
						onChange={changeHandler}
						min={1}
					/>
				</div>
				<div>
					<button
						type="submit"
						className="btn btn-primary">
						Submit
					</button>
					<button
						type="button"
						className="btn btn-secondary"
						onClick={cancelHandler}>
						Cancel
					</button>
				</div>
			</fieldset>
		</form>
	);
}

export default TableForm;
