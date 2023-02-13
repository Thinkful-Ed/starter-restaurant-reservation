import React, { useState } from "react";
import { useHistory } from "react-router";



export default function NewTable() {
    const history = useHistory();

    const goBack = (event) => {
        event.preventDefault();
        history.goBack();
    }

    const initialFormState = {
        table_name: "",
        capacity: "",
    }
    
    return (
        <>
        <h3>Create a new Table</h3>
        <form name="createTable"
                // onSubmit={handleSubmit}
                >
            <table>
                <tr>
                    <td>
                        <input
                            id="table_name"
                            name="table_name"
                            type="text"
                            // onChange={handleChange}
                            value={FormData.table_name}
                            placeholder="Table Name"
                            />
                    </td>

                    <td>
                        <input
                            id="capacity"
                            name="capacity"
                            type="number"
                            min="1"
                            // onChange={handleChange}
                            value={FormData.capacity}
                            placeHolder="Capacity"
                            />
                    </td>

                    <td>
                        <button type="submit" 
                        // onClick={handleSubmit}
                        >Submit</button>
                        <button type="cancel" onClick={goBack}>Cancel</button>
                    </td>
                </tr>
            </table>
        </form>
        </>
    )
}