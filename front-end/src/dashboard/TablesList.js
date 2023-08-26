import React from 'react';

export default function TablesList({ tables, handleFinish }) {
  return (
    <div className=''>
			<h3>Tables</h3>
      {tables.length === 0 ? (
        <p>No tables found.</p>
      ) : (
        <div className='d-flex flex-wrap'>
          {tables.map((table) => (
            <div key={table.table_id} className=" w-25 h-25 mb-3">
              <div className="card">
                <h5 className="card-header"> {table.table_name}</h5>
                <div className="card-body">
                  <p className="card-text">Capacity: {table.capacity}</p>
                  <p className="card-text" data-table-id-status={table.table_id}>
                    {table.reservation_id ? 'Occupied' : 'Free'}
                  </p>
                </div>
                <div className="card-footer">
                  {table.reservation_id && (
                    <button
                      className="btn btn-primary"
                      data-table-id-finish={table.table_id}
                      onClick={() => handleFinish(table.table_id)}>
                      Finish
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
