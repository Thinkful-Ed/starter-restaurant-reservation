import React, { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";



export default function NewTable() {
    const history = useHistory();

    const goBack = (event) => {
        event.preventDefault();
        history.goBack();
    };

    const initialFormState = {
        table_name: "",
        capacity: "",
    }

    const [formData, setFormData] = useState(initialFormState);

    const handleChange = ({ target }) => {
        setFormData({...formData, [target.name]:target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        formData.capacity = Number(formData.capacity);
        const table = formData;
        ///ERRROR
        //CHECK INPUTS
        async function callCreateTable() {
            try{
                await createTable(table)
                history.push('/dashboard')
            }
            catch(error) {
                console.log(error)
                throw error;
            }
        }
        callCreateTable();
    }
    
    return (
        <>
        <h3>Create a new Table</h3>
        <form name="createTable" onSubmit={handleSubmit}>
            <table>
                <tr>
                    <td>
                        <input
                            id="table_name"
                            name="table_name"
                            type="text"
                            onChange={handleChange}
                            value={formData.table_name}
                            placeholder="Table Name"
                            />
                    </td>

                    <td>
                        <input
                            id="capacity"
                            name="capacity"
                            type="number"
                            min="1"
                            onChange={handleChange}
                            value={formData.capacity}
                            placeHolder="Capacity"
                            />
                    </td>

                    <td>
                        <button type="submit" 
                        onClick={handleSubmit}
                        >Submit</button>
                        <button type="cancel" onClick={goBack}>Cancel</button>
                    </td>
                </tr>
            </table>
        </form>
        </>
    )
}