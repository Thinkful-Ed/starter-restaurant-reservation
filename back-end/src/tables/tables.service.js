// stub data
const tables = [];
let id = 0;

//stub service handlers
const list = () => Promise.resolve(tables);
const create = (table) => {
  tables.push({
    ...table,
    table_id: id++,
    reservation_id: -1,
  });
  return Promise.resolve(table);
};
const seatReservation = (tableId, reservationId) => {
  const tableIndex = tables.findIndex((table) => table.table_id === tableId);
  if (tableIndex === -1) return Promise.reject("Invalid table_id.");

  tables[tableIndex].reservation_id = reservationId;
  return Promise.resolve(tables[tableIndex]);
};

module.exports = { list, create, seatReservation };
