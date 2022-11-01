import React from 'react';

function TableHeader({headers}) {
    return ( 
        <thead>
            <tr>
                {headers.map((header, index)=> <th key={`${header}-${index}`}>{header}</th>)}
            </tr>
        </thead>
     );
}

export default TableHeader;