import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { postTable } from "../utils/api";
import { useHistory } from "react-router-dom";

function NewTable() {
  const [form, setForm] = useState({ table_name: "", capacity: "" });
  const [error, setError] = useState(null);
  const history = useHistory();

  function changeHandle(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submitHandle(event) {
    event.preventDefault();
    const abortController = new AbortController()
    try {
      form.capacity = parseInt(form.capacity);
      const newPost = await postTable(form, abortController.signal);

      if (newPost.error) {
        throw newPost.error.message;
      }
      history.push("/dashboard");
    } catch (err) {
      setError(err);
    }
  }

  function cancelHandle() {
    history.goBack();
  }

  return (
    <div>
      <ErrorAlert error={error} />
      <form
        onSubmit={submitHandle}
        className="d-flex flex-column col-6 text-center m-auto font-weight-bolder"
      >
        <h2>Create Table</h2>
        <div className="my-2">
          <div className="bg-info text-white border-bottom border-dark">
            <label htmlFor="table_name">Table Name</label>
          </div>
          <input
            className="w-100"
            type="text"
            name="table_name"
            id="table_name"
            onChange={changeHandle}
            value={form?.table_name}
          />
        </div>

        <div className="my-2">
          <div className="bg-info text-white border-bottom border-dark">
            <label htmlFor="capacity" name="capacity">
              Capacity
            </label>
          </div>
          <input
            className="w-100"
            type="number"
            name="capacity"
            id="capacity"
            onChange={changeHandle}
            value={form?.capacity}
          />
        </div>

        <div className="btn-group border border-dark rounded-lg">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <button
            type="button"
            onClick={cancelHandle}
            className="btn btn-danger"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTable;
