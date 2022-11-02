import React from 'react';

function TablesForm({table, setTable, submitHandler, cancelHandler}) {
    const changeHandler = ({ target }) => {
        setTable({ ...table, [target.name]: target.value });
      };
    
      const changeNumber = ({ target }) => {
        setTable({ ...table, [target.name]: Number(target.value) });
      };
    return ( 
        <div>
            <h2>Create a new table:</h2>
            <form onSubmit={submitHandler}>
                <label>
                    Table Name:
                    <input
                    onChange={changeHandler}
                    value={table.table_name}
                    type="text"
                    id="table_name"
                    name="table_name"
                    required
                    >
                    </input>
                </label>
                <label>
                    Capacity:
                    <input
                    onChange={changeNumber}
                    value={table.capacity}
                    type="number"
                    id="capacity"
                    name="capacity"
                    required
                    >
                    </input>
                </label>
                <button type='submit'>Submit</button>
                <button type='button' onClick={cancelHandler}>Cancel</button>
            </form>
        </div>
     );
}

export default TablesForm;