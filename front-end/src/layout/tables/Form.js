import { createTable } from "../../utils/api";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import "../Form.css"

const Form = () => {


    const history = useHistory(); 

    const [tableError, setTableError] = useState(null);

    const [table, setTable] = useState({
                                table_name: "",
                                capacity: ""
                              });

    const { table_name, capacity } = table;



    function handleChange(e) {
        setTable({ ...table, [e.target.name]: e.target.value })
    }

    function handleCancel() {
        history.goBack();
    }

    function handleSubmit(e) {
            e.preventDefault();
            const abortController = new AbortController();
            setTableError(null);
            createTable({...table, capacity: parseInt(table.capacity)}, abortController.signal)
              .then(() => {
                history.push(`/dashboard`);
              })
              .catch(setTableError);
            return () => abortController.abort();
        }

    return ( 
        <div>
        <ErrorAlert error={tableError} />
        <form onSubmit={handleSubmit}>

            <label htmlFor="table_name">Table Name</label>

            <input 
            type="text"
            className="form-control"
            id="table_name"
            name="table_name"
            value={table_name}
            placeholder="Table Name"
            onChange={handleChange}
            />

            <label htmlFor="capacity">Capacity</label>

            <input
            type="text"
            className="form-control"
            id="capacity"
            name="capacity" 
            value={capacity}
            placeholder="Capacity"
            onChange={handleChange}
            />
            <div className="form-buttons">
           <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
           </button>

           <button type="submit" className="btn btn-primary">
            Submit
           </button>
           </div>

        </form>
        </div>
     );
}
 
export default Form;