/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router";

//import components
import TableForm from "./TableForm";
import ErrorAlert from "../layout/ErrorAlert";

//import utility functions
import { createTable } from "../utils/api";

const TableCreate = () => {
	const history = useHistory();

	const initialFormState = {
		table_name: "",
		capacity: "",
	};

	const [formData, setFormData] = useState({ ...initialFormState });
	const [error, setError] = useState(null);

	const cancelHandler = () => {
		history.goBack();
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		setError(null);
		const abortController = new AbortController();
		formData.capacity = Number(formData.capacity);

		try {
			await createTable(formData, abortController.signal);
			history.push("/");
		} catch (error) {
			setError(error);
		}
		return () => abortController.abort();
	};

	const changeHandler = ({ target: { name, value } }) => {
		setFormData((previousFormData) => ({
			...previousFormData,
			[name]: value,
		}));
	};

	return (
		<main>
			<ErrorAlert error={error} />
			<TableForm
				submitHandler={submitHandler}
				cancelHandler={cancelHandler}
				formData={formData}
				changeHandler={changeHandler}
			/>
		</main>
	);
};

export default TableCreate;
