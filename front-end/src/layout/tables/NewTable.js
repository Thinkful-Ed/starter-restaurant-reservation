import React, { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";


function NewTable(){

    const [tableError, setTableError] = useState(null);
    const [table, setTable]=useState({
        table_name:"",
        capacity:"",
    });
    const history = useHistory();

    function submitHandler(event){
        event.preventDefault();
        table.capacity = Number(table.capacity);
        createTable(table)
            .then( () => {history.push("/dashboard");} )
            .catch( setTableError );
    }

    function changeHandler({target: {name, value}}){
        setTable( (table) => ({...table, [name]: value}));
    }

    function cancelHandler(){
        history.goBack();
    }

    return(
        <form onSubmit={submitHandler} className="border border-1 p-4 m-4">
            <div>
                <ErrorAlert error={tableError} />
            </div>
            <div className="card">
                <div className="card-header alert alert-primary">New Table</div>
                <div className="card-body">
                    <div className="row border border-2">
                    <div className="form-group col-4">
                            <label htmlFor="table_name">Table Name</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-primary text-white">
                                        <i className="oi oi-comment-square"></i>
                                    </span>
                                </div>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="table_name"
                                    id="table_name"
                                    minLength="2"
                                    required
                                    value={table.table_name}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                        <div className="form-group col-4">
                            <label htmlFor="capacity">Capacity</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-primary text-white">
                                        <i className="oi oi-grid-two-up"></i>
                                    </span>
                                </div>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="capacity"
                                    id="capacity"
                                    min="1"
                                    required
                                    value={table.capacity}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                        <div className="form-group col-4 align-self-end">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button type="button" className="btn btn-secondary ml-2" onClick={cancelHandler}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default NewTable;