import React from "react"
import {useHistory} from "react-router-dom"

function TableForm({handleSubmitTable, handleChangeTable, tableForm}){

    const history = useHistory()
    return (
        <>
        <h2>
            Create a table
        </h2>
        <form onSubmit={handleSubmitTable}>
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <label htmlFor="table_name">
                            Table Name
                        </label>
                        <input
                        name="table_name"
                        id="table_name"
                        className="form-control"
                        required
                        // minLength={2}
                        onChange={handleChangeTable}
                        value={tableForm.table_name}
                        >
                        </input>
                    </div>
                    <div className="col-sm">
                        <label htmlFor="capacity">
                        Capacity
                        </label>
                        <input
                            name="capacity"
                            id="capacity"
                            className="form-control"
                            required
                            // min="1"
                            onChange={handleChangeTable}
                            value={tableForm.capacity}
                           >
                        </input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm">
                        <button type="cancel" className="btn btn-secondary" onClick={()=> history.push("/")}>Cancel</button>
                        <button type="submit" className="btn btn-primary" value="submit">Submit</button>
                    </div>
                </div>
            </div>
            
        


        </form>
        </>
    )
}

export default TableForm