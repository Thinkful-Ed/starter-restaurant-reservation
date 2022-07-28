import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function NewTable() {
  const history = useHistory();

  const initialFormState = { table_name: "", capacity: "" };

  const [formData, setFormData] = useState(initialFormState);

  const changeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const preSubmit = {
      table_name: formData.table_name,
      capacity: parseInt(formData.capacity),
    };
    console.log(preSubmit); // NEED TO IMPLEMENT preSubmit TO BACKEND

    history.push("/dashboard");
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <>
      <h1>Create Table</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group ">
          <input
            type="text"
            name="table_name"
            className="form-control mb-3"
            placeholder="Name"
            minLength="2"
            onChange={changeHandler}
            value={formData.table_name}
          />
          <input
            type="number"
            name="capacity"
            className="form-control"
            placeholder="Capacity"
            min="1"
            onChange={changeHandler}
            value={formData.capacity}
          />
        </div>
        <div className="form-group row mt-3">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button onClick={cancelHandler} className="btn btn-secondary ml-2">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
