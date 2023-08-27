import React from 'react';
import { useHistory } from 'react-router-dom';
import ErrorAlert from '../layout/ErrorAlert';

export default function FormTable({ table, setTable, submitHandler, error }) {
	const history = useHistory();

	function changeHandler({ target: { name, value } }) {
		const newValue = name === 'capacity' ? parseInt(value, 10) : value;

		setTable((previousTable) => ({
			...previousTable,
			[name]: newValue,
		}));
	}

	return (
		<div className='d-flex justify-content-center text-center '>
		<div className="panel panel-default w-25">
			<div className="panel-heading text-center">
				<h2>New Table</h2>
			</div>
			<div className="panel-body d-flex justify-content-center">
				<form onSubmit={submitHandler} className="w-100">
					<ErrorAlert className="alert alert-danger" error={error} />
					<div className="form-group">
						<label htmlFor="table_name">Table Name</label>
						<input
							id="table_name"
							name="table_name"
							required={true}
							type="text"
							value={table.table_name}
							onChange={changeHandler}
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="capacity">Capacity</label>
						<input
							id="capacity"
							name="capacity"
							required={true}
							type="text"
							value={table.capacity}
							onChange={changeHandler}
							className="form-control"
						/>
					</div>
					<div className="panel-footer d-flex justify-content-between">
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
						<button
							type="button"
							onClick={history.goBack}
							className="btn btn-secondary"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
		</div>
	);
}
