import React from 'react';

function TableHeader({headers}) {
    return ( 
        <div>
            <h5>
                {headers.map((header, index)=> <span key={`${header}-${index}`}>{header}</span>)}
            </h5>
        </div>
     );
}

export default TableHeader;