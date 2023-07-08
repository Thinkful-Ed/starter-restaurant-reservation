/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router";

//component imports
import ErrorAlert from "../layout/ErrorAlert";
import TableForm from "./TableForm";

//utility functions
import { createTable } from "../utils/api";

//Handle the creation of a table by rendering the imported table form with the create table utility to input table details, submit the form, and handle any errors
function TableCreate() {
	const history = useHistory();
	const initialFormState = {
		table_name: " ",
		capacity: " ",
	};
	const [formData, setFormData] = useState({ ...initialFormState });
	const [error, setError] = useState(null);
	const cancelHandler = () => {
		history.goBack();
	};
	//handle form submission; prevent default; error state set to null
	const submitHandler = async (event) => {
		event.preventDefault();
		setError(null);
		//abort controller  is created in case of needing to cancel the API request
		const abortController = new AbortController();
		//convert capacity value to a number
		formData.capacity = Number(formData.capacity);
		//call createTable with formdata and aborController as parameters to create a table via an API request.
		try {
			await createTable(formData, abortController.signal);
			history.push("/");
		} catch (error) {
			setError(error);
		}
		return () => abortController.abort();
	};

	//the change handler updates the formData state with the new value
	const changeHandler = ({ target: { name, value } }) => {
		setFormData((previousFormData) => ({
			...previousFormData,
			[name]: value,
		}));
	};
	//render the component; display any error stored in the error state
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
}

export default TableCreate;
