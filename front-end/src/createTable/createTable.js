import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";


export default function CreateTable() {
    const history = useHistory();
    const initialFormState = {
        table_name: "",
        capacity: 0,
    }

    const [formData, setFormData] = useState({...initialFormState});
    const [reservationsError, setReservationsError] = useState(null);

    const changeHandler = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setReservationsError(null);
            await createTable({...formData, capacity: Number(formData.capacity)});
            history.push("/dashboard")
        } catch (error) {
            setReservationsError(error);
            console.log(error);
        };
        }

    function cancelHandler() {
        history.goBack();
    }

    return (
    <div>
      <h1>Create Table</h1>
      <ErrorAlert error={reservationsError} />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col">
            <label>
              Table Name
              <input
                name="table_name"
                type="text"
                className="form-control"
                required=""
                placeholder="Table Name"
                value={formData.table_name}
                onChange={changeHandler}
              ></input>
            </label>
          </div>
          <div className="form-group col">
            <label>
              Capacity
              <input
                name="capacity"
                type="number"
                className="form-control"
                required=""
                placeholder=""
                value={formData.capacity}
                onChange={changeHandler}
              ></input>
            </label>
          </div>
        </div>
        <button className="btn btn-secondary mr-2 cancel" type="button" onClick={cancelHandler}>Cancel</button>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  );
}