import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function CreateTable() {
	const initTable = {
		table_name: "",
		capacity: 0,
	};

	const history = useHistory();

	const [table, setTable] = useState(initTable);
	const [tableError, setTableError] = useState(null);

	const cancelClickHandler = () => {
		history.goBack();
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		try {
			const abortController = new AbortController();
			await createTable({ data: table }, abortController.signal);
			history.push("/dashboard");
		} catch (error) {
			setTableError(error);
		}
	};

	const formChangeHandler = (event) => {
		const tableKey = event.target.name;
		let tableValue = event.target.value;
		if (tableKey === "capacity" && tableValue) {
			tableValue = parseInt(tableValue);
		}

		setTable({ ...table, [tableKey]: tableValue });
	};

	return (
		<div
			style={{
				margin: "10px",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<h1>Add Table</h1>
			<ErrorAlert error={tableError} />
			<div
				className="card container-fluid"
				style={{ maxWidth: "700px", padding: "10px" }}
			>
				<form onSubmit={submitHandler}>
					<div className="mb-3">
						<label htmlFor="table_name" className="form-label">
							Table Name
						</label>
						<input
							required
							name="table_name"
							type="text"
							className="form-control"
							minLength="2"
							value={table.table_name}
							onChange={formChangeHandler}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="capacity" className="form-label">
							Capacity
						</label>
						<input
							required
							name="capacity"
							type="number"
							className="form-control"
							value={table.capacity}
							onChange={formChangeHandler}
						></input>
					</div>
					<div className="mb-3">
						<button
							type="button"
							className="btn btn-danger"
							onClick={cancelClickHandler}
							style={{ margin: "0 5px" }}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="btn btn-primary"
							style={{ margin: "0 5px" }}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
