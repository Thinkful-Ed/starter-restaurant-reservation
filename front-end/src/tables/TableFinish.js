/** @format */

import React from "react";
import ErrorAlert from "../layout/ErrorAlert";

//Render a button with optional error alert dependent on the presence of table.reservation_id. The button triggers a "clickHandler" function when clicked, passing the event object and the `table.table_id` as arguments (user story #5)
//function takes three arguments: table prop represents the table data; error prop is used to display any errors that occur
function TableFinish({ table, clickHandler, error }) {
	//render the component: conditional based on the presence of reservation Id in the table prop
	return (
		table.reservation_id && (
			<div>
				<ErrorAlert error={error} />
				<button
					className="btn btn-danger"
					type="button"
					onClick={(element) => clickHandler(element, table.table_id)}>
					Finish
				</button>
			</div>
		)
	);
}

export default TableFinish;
