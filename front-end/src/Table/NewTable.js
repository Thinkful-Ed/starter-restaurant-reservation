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
    try {
      form.capacity = parseInt(form.capacity);
      const newPost = await postTable(form);

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
      <form onSubmit={submitHandle}>
        <label htmlFor="table_name">Table Name</label>
        <input
          type="text"
          name="table_name"
          id="table_name"
          onChange={changeHandle}
          value={form?.table_name}
        />
        <label htmlFor="capacity" name="capacity">
          Capacity
        </label>
        <input
          type="number"
          name="capacity"
          id="capacity"
          onChange={changeHandle}
          value={form?.capacity}
        />
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={cancelHandle}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTable;
