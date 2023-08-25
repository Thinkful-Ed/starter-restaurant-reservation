import React from 'react';

export default function TablesList({ tables }) {
	console.log(tables);
	return (
		<div>
			{tables.length === 0 ? (
				<p>No tables found.</p>
			) : (
				<div>
					{tables.map((table) => (
						<div key={table.id}>
							<div className="card">
								<div className="card-body">
									<p>Table Name: {table.table_name}</p>
									<p>Capacity: {table.capacity}</p>
									<p data-table-id-status={table.table_id}>
										{table.reservation_id ? 'Occupied' : 'Free'}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
