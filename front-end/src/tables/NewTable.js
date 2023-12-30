import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

export default function NewTable() {
	const initialFormState = {
		table_name: "",
		capacity: 0,
	};
	const history = useHistory();
	const [formData, setFormData] = useState({ ...initialFormState });
	const [reservationsError, setReservationsError] = useState(null);

	// HANDLERS
	const handleChange = ({ target }) => {
		setFormData({
			...formData,
			[target.name]: target.value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/tables/new`,
				{
					data: formData,
				},
			);
			history.push("/dashboard");
		} catch (err) {
			if (err.response) {
				setReservationsError(err.response.data);
			}
		}
	};
	const handleCancel = () => {
		history.goBack();
	};

	return (
		<div className="component">
			<h1>New Table</h1>
			<hr />
			<div className="form-component m-5">
				<form onSubmit={handleSubmit}>
					<div className="form-group col col-md-8 col-lg-6">
						<label htmlFor="table_name">Table Name</label>
						<input
							type="text"
							className="form-control"
							name="table_name"
							placeholder="Name of the table"
							onChange={handleChange}
							value={formData.table_name}
						/>
					</div>
					<div className="form-group col col-md-4 col-lg-2">
						<label htmlFor="capacity">Capacity</label>
						<input
							type="number"
							className="form-control"
							name="capacity"
							onChange={handleChange}
							value={formData.capacity}
						/>
					</div>
					<button type="submit" className="btn btn-outline-dark m-2">
						Submit
					</button>
					<button
						onClick={handleCancel}
						className="btn btn-outline-secondary m-2 ml-4"
					>
						Cancel
					</button>
				</form>
				<ErrorAlert error={reservationsError} />
			</div>
		</div>
	);
}
