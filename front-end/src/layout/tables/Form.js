import { useState } from "react";
import { useHistory } from "react-router-dom";

const Form = () => {


    const history = useHistory(); 

    const [table, setTable] = useState({
                                table_name: "",
                                capacity: ""
                              })

    const { table_name, capacity } = table;



    function handleChange(e) {
        setTable({ ...table, [e.target.name]: e.target.value })
    }

    function handleCancel() {
        history.goBack();
    }

    function handleSubmit() {
        history.push(`/dashboard`)
    }

    return ( 
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

           <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
           </button>

           <button type="submit" className="btn btn-primary">
            Submit
           </button>

        </form>
     );
}
 
export default Form;