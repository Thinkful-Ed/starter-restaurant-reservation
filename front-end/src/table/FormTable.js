import React from 'react';
import ErrorAlert from '../layout/ErrorAlert';
import { useHistory } from 'react-router-dom';

export default function FormTable({ table, setTable, submitHandler, error }) {
	const history = useHistory();

	function changeHandler({ target: { name, value } }) {
		const newValue = name === 'capacity' ? parseInt(value, 10) : value;
		console.log(`Changing ${name} to ${value}`);

		setTable((previousTable) => ({
			...previousTable,
			[name]: newValue,
		}));
	}

	return (
		<div className="card">
			<div className="card-header text-center ">
				<h2>New Table</h2>
				<div className="d-flex justify-content-center card-body">
					<form onSubmit={submitHandler}>
						<ErrorAlert className="alert alert-danger" error={error} />
						<div>
							<div className="card text-center">
								<label>Table Name</label>
								<input
									id="table_name"
									name="table_name"
									required={true}
									type="text"
									value={table.table_name}
									onChange={changeHandler}
								/>
							</div>
							<div className="card text-center">
								<label>Capacity</label>
								<input
									id="capacity"
									name="capacity"
									required={true}
									type="text"
									value={table.capacity}
									onChange={changeHandler}
								/>
							</div>
						</div>

						<div className="card-footer d-flex justify-content-between">
							<button type="submit">Submit</button>
							<button type="button" onClick={history.goBack}>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
