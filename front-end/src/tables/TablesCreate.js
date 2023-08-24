import React, { useState } from "react";
import { useHistory } from "react-router";

//import components
import TablesForm from "./TablesForm";
import ErrorAlert from "../layout/ErrorAlert";

//import utility functions
import { createTable } from "../utils/api";

function TablesCreate(){
	const history = useHistory();

	const initialFormdata = {
		table_name: "",
		capacity: "",
	};

	const [formData, setFormData] = useState({ ...initialFormdata });
	const [error, setError] = useState(null);

	function handleCancel(){
		history.goBack();
	};

	const handleSubmit = async (event) => {
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

    function handleChange(e){
        setFormData((previousFormData) => ({
          ...previousFormData,
          [e.target.name]: e.target.value,
        }));
      };

	return (
		<div>
			<ErrorAlert error={error} />
			<TablesForm
				handleSubmit={handleSubmit}
				handleCancel={handleCancel}
				formData={formData}
				handleChange={handleChange}
			/>
		</div>
	);
};

export default TablesCreate;