import React, { Component } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { listReservations,createTable } from '../utils/api';
// import ErrorAlert from '../layout/ErrorAlert';
import ErrorAlert from '../layout/ErrorAlert';
import { useParams } from 'react-router';
const apiUrl = process.env.REACT_APP_API_BASE_URL;

//page for creating a new table
//the form is submitted to the server via a post request to apiUrl/tables
//form fields: table_name, capacity
//submit button: submit
//submit handler: create

function NewTable() {

    const history = useHistory();
    const initForm = {table_name: '', capacity: ''};
    const [error, setError] = React.useState(null);
    const [form , setForm] = React.useState(initForm)
    async function submitHandler(event) {
        event.preventDefault();
        form.capacity = parseInt(form.capacity);
        const abortController = new AbortController();
    
        try {
          setError(null);
          await createTable(form, abortController.signal);
          history.push(`/dashboard`);
        } catch (error) {
          setError(error);
        }
      }
    function handleChange(event) {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }


    return(
        <div>
            <h1>New Table</h1>
            <ErrorAlert error={error} />
            <form onSubmit={submitHandler}>
                <label>Table Name:</label>
                <input type="text" name="table_name" value={form.table_name} onChange={handleChange}/>
                <label>Capacity:</label>
                <input type="number" name="capacity" value={form.capacity} onChange={handleChange}/>
                
            </form>
            <button type="submit" onClick={submitHandler}>Submit</button>
            <button type="button" className="btn btn-secondary" onClick={() => history.goBack()}>Cancel</button>
        </div>
    )
}


export default NewTable;