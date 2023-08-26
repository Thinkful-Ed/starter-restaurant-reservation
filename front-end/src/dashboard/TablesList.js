import React from 'react';

export default function TablesList({ tables, handleFinish}) {



	return (
		<div>
			{tables.length === 0 ? (
				<p>No tables found.</p>
			) : (
				<div>
					{tables.map((table) => (
						<div key={table.table_id}>
							<div className="card">
								<div className="card-header">
									<p>Table Name: {table.table_name}</p>
								</div>
								<div className="card-body">
									<p>Capacity: {table.capacity}</p>
									<p data-table-id-status={table.table_id}>
										{table.reservation_id ? 'Occupied' : 'Free'}
									</p>
								</div>
								<div className='card-footer'>
									{table.reservation_id ? (
										<button
											className="btn btn-primary"
											data-table-id-finish={table.table_id}
											onClick={handleFinish}>
											Finish
										</button>
										
									) : (
										<></>
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
