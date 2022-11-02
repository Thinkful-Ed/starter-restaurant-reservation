import React from 'react';

function SeatTableForm({ tables ,tableData, setTableData, submitHandler, history }) {
    const changeHandler = ({ target }) => {
        setTableData({ ...tableData, [target.name]: target.value });
        console.log(tableData)
      };
    return ( 
        <>
            <form onSubmit={submitHandler}>
                <div>
                    <label>
                        Select Table
                    </label>
                    <select
                        name="table_id"
                        id="table_id"
                        onChange={changeHandler}
                    >
                        <option>Table Name - Capacity</option>
                        {tables.map((table)=> 
                            <option
                                key={table.table_id}
                                value={table.table_id}
                                required={true}
                            >
                                {table.table_name} - {table.capacity}
                            </option>
                        )}
                    </select>
                </div>
                <button type='submit'>Submit</button>
                <button type='button' onClick={()=> history.goBack()}>Cancel</button>
            </form>
        </>
     );
}

export default SeatTableForm;