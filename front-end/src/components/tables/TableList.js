import React from 'react';

export const TableList = ({ table, handleFinish }) => {
  return (
    <div className='group-col'>
      {table.map((table) => (
        <div key={table.table_id}>
          <div>
            <div>
              <div>
                <h3>Table {table.table_name}</h3>
                <div>
                  <h5>{table.capacity} seats </h5>
                  <p data-table-id-status={table.table_id}>
                    &nbsp;/ &nbsp;{table.occupied ? 'occupied' : 'free'}
                  </p>
                </div>
              </div>
            </div>
            <div>
              {table.occupied ? (
                <button
                  data-table-id-finish={table.table_id}
                  onClick={() => handleFinish(table.table_id)}
                >
                  Finish
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
