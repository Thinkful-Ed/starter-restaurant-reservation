// Data for Table Columns
const DataForTable = [
  {
    table_name: '21',
    table_id: 1,
    table_status: 'Occupied',
    seat: '2',
  },
  {
    table_name: '21',
    table_id: 2,
    table_status: 'Free',
    seat: '4',
  },
  {
    table_name: '21',
    table_id: 3,
    table_status: 'Occupied',
    seat: '3',
  },
]

// Data for Reservation Status
const DataForReservation = [
  {
    id: '1',
    reservation_id: '1',
    reservation_status: 'booked',
    seat: 'seat',
    first_name: 'Rick',
    last_name: 'Sanchez',
    mobile_number: '202-555-0164',
    reservation_date: '2020-12-31',
    reservation_time: '20:00:00',
    people: 6,
  },
  {
    id: '2',
    reservation_id: '2',
    reservation_status: 'booked',
    seat: 'seat',
    first_name: 'Frank',
    last_name: 'Palicky',
    mobile_number: '202-555-0153',
    reservation_date: '2020-12-30',
    reservation_time: '20:00',
    people: 1,
  },
  {
    id: '3',
    reservation_id: '3',
    reservation_status: 'booked',
    seat: 'seat',
    first_name: 'Bird',
    last_name: 'Person',
    mobile_number: '808-555-0141',
    reservation_date: '2020-12-30',
    reservation_time: '18:00',
    people: 1,
  },
  {
    id: '4',
    reservation_id: '4',
    reservation_status: 'cancelled',
    seat: 'seat',
    first_name: 'Tiger',
    last_name: 'Lion',
    mobile_number: '808-555-0140',
    reservation_date: '2025-12-30',
    reservation_time: '18:00',
    people: 3,
  },
]

// Reservation Data
module.exports = {
  DataForReservation: DataForReservation,
  DataForTable: DataForTable,
}
