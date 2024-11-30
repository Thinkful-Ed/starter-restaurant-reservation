import React from "react";
import { useHistory } from "react-router-dom";



function TableForm({ table, setTable, submitHandler }) {
   
    const history = useHistory();

    function cancelHandler() {
        history.goBack();
    }

    
    function changeHandler(event) {
        const { name, value } = event.target;
        setTable((previousTable) => ({
            ...previousTable,
            [name]: name === "capacity" ? Number(value) : value,
        }));
    }


return (
    <form onSubmit={(event) => submitHandler(event, table)} className="mb-4">
        <div className="mb-3">
                <label className="form-label" htmlFor="table_name">
                    Table Name
                </label>
                <input
                    className="form-control"
                    id="table_name"
                    name="table_name"
                    type="text"
                    placeholder="Table Name"
                    // pattern="^[a-zA-Z0-9'-. ]+$"
                    value={table.table_name}
                    onChange={changeHandler}
                    required={true}
                />
        </div>
           
        <div className="mb-3">
            <label className="form-label" htmlFor="capacity">
                Capacity
            </label>
            <input  
                className="form-control"
                id="capacity"
                name="capacity"
                type="number"
                min= {1}
                value={table.capacity}
                onChange={changeHandler}
                required={true}
            />
        </div>

        <div className="mb-3"> 
            <button         
                type="button" 
                className="btn btn-secondary mr-2"
                onClick={cancelHandler}
            >Cancel
            </button>
          
            <button
                type="submit"
                className="btn btn-primary"
            >Submit
            </button>
        </div>    
    </form> 
);

}

export default TableForm;