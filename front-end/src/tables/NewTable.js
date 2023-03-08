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
    const [displayError, setDisplayError] = useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        formData.capacity = Number(formData.capacity);
        const table = formData;
       
        setDisplayError(null);
        let errorExists = false;
        if(!formData.capacity || formData.capacity < 1){
            setDisplayError("Capacity must be at least 1")
            errorExists = true;
        }
        if(!formData.table_name || formData.table_name.length < 2){
            setDisplayError("Table name must be longer")
            errorExists = true;
        }

        if(!errorExists){
            callCreateTable(table);
        }
    }

    const [createTableError, setCreateTableError] = useState(null)
    function callCreateTable(table) {
        const abortController = new AbortController();
        createTable(table, abortController.signal)
        .then(history.push('/dashboard'))
        .catch(setCreateTableError)
        return() => abortController.abort()
    }

    const errorDiv = displayError ? 
    <div className="error alert alert-danger error-div">
      <p>{displayError}</p>
    </div> : '';

    return (
        <>
        <h3>Create a New Table</h3>
        <form name="createTable" onSubmit={handleSubmit}>
            <table>
                <tbody>
                <tr>
                    <td>
                        <input
                            id="table_name"
                            name="table_name"
                            type="text"
                            onChange={handleChange}
                            value={formData.table_name}
                            placeholder="Table Name"
                            className="input-field"
                            />
                    </td>
                    </tr>

                    <tr>
                    <td>
                        <input
                            id="capacity"
                            name="capacity"
                            type="number"
                            min="1"
                            onChange={handleChange}
                            value={formData.capacity}
                            placeHolder="Capacity"
                            class="input-field"
                            style={{margin: 5}}
                            />
                    </td>
                    </tr>

                    <tr>
                    <td>
                        <button 
                        type="submit" 
                        onClick={handleSubmit}
                        class="btn btn-success"
                        >Submit
                        </button>
                        <button 
                        type="cancel" 
                        onClick={goBack} 
                        class="btn btn-danger"
                        style={{margin: 5}}
                        >Cancel
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
        {errorDiv}
        </>
    )
}