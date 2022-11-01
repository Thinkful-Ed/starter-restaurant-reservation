import React, { useState } from 'react';

function TablesInfo({table, key}) {
    const [currentTable, setCurrentTable] = useState(table)
    return ( 
        <tr key={key}>
            <td>{currentTable.table_id}</td>
            <td>{currentTable.table_name}</td>
            <td>{currentTable.capacity}</td>
            <td>{currentTable.reservation_id}</td>
            <td>{currentTable.table_status}</td>
        </tr>
     );
}

export default TablesInfo;