import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function CreateTable() {
	const initTable = {
		table_name: "",
		capacity: 0,
	};

	const history = useHistory();

	const [table, setTable] = useState(initTable);

	const cancelClickHandler = () => {
		history.goBack();
	};

    const submitHandler = (event)=>{
        event.preventDefaults()
    }
    
	const formChangeHandler = (event) => {
		const tableKey = event.target.name;
		const tableValue = event.target.value;
        setTable({...table,[tableKey]:tableValue})
	};

    console.log(table)
	return (
		<div>
			<h1>Add Table</h1>
			<div>
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
				</form>
				<div className="mb-3">
					<button
						type="button"
						className="btn btn-danger"
						onClick={cancelClickHandler}
					>
						Cancel
					</button>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}
