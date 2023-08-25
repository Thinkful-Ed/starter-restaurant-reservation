import React from 'react';
import { useState } from 'react';
import FormTable from './FormTable';
import { createTable } from '../utils/api';
import { useHistory } from 'react-router-dom';

export default function NewTable() {
	const history = useHistory();
	const initialFormState = {
		table_name: '',
		capacity: '',
	};

	const [table, setTable] = useState(initialFormState);
	const [error, setError] = useState(null);

	async function submitHandler(event) {
		event.preventDefault();
		try {
			await createTable(table);
			history.push(`/dashboard`);
		} catch (error) {
			setError(error);
		}
	}

	return (
		<div>
			<FormTable
				table={table}
				setTable={setTable}
				submitHandler={submitHandler}
				error={error} />
		</div>
	);
}
