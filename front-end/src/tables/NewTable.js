import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createTable } from "../utils/api";

function NewTable() {
    const history = useHistory();
    const initFormData = {
        table_name: "",
        capacity: "",
    }
    const [formData, setFormData] = useState(initFormData);
    const [errors, setErrors] = useState({});

    //handle errors function
    const mapErrors = Object.keys(errors).map((error, index) => (
        <div className="alert alert-danger" role="alert">{error}</div>
    ));

    //handle change function
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    //handle submit function
    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortCon = new AbortController();
        formData.capacity = parseInt(formData.capacity);
        try {
          await createTable(formData, abortCon.signal);
    
          setErrors({});
          history.push("/dashboard");
        } catch (error) {
          if (!errors[error.message]) {
            setErrors({ ...errors, [error.message]: 1 });
          }
        }
        return () => abortCon.abort();
    };

    return (
        <main>
            <div className="createErrors">{mapErrors ? mapErrors : null}</div>
            <h1>New Table</h1>
            <div className="d-md-flex mb-3">
                <form className="col-12" onSubmit={handleSubmit}>
                    <div className="row form-group">
                        <label htmlFor="table_name">Table Name</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            id="tableName"
                            name="table_name"
                            value={formData.table_name}
                            onChange={handleChange}
                            placeholder="Table Name"
                            required
                        />
                    </div>
                    <div className="row form-group">
                        <label htmlFor="capacity">Capacity</label>
                        <input
                            type="number"
                            className="form-control form-control-lg"
                            id="capacity"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            placeholder="1"
                            required
                        />
                    </div>
                    <div className="row">
                        <button className="btn btn-secondary mr-2" onClick={() => history.goBack()}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default NewTable;