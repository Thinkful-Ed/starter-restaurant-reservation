/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";


const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

// Since the route in the backend does not exists I use an array for now

export async function createReservation(reservation, signal){
  const url=`${API_BASE_URL}/reservations`;
  const options={
    method : "POST",
    headers,
    body: JSON.stringify({ data: reservation }),
    signal,
  }
  const newReservation = await fetchJson(url, options);
  reservations.push(newReservation);//to have copy of reservation to share between components
  return newReservation;
}


/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

let reservations = []; //to have copy of reservation to share between components
export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    value && url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime)
    .then( (result) => {
      reservations = [...result];//to have copy of reservation to share between components
      return result;
    });
}

export function getReservationPeople(reservation_id){
  const index = reservations.findIndex( (reservation) => reservation.reservation_id === Number(reservation_id));
  if (index > -1){
    return reservations[index].people;
  }
}

const tables = [
  {table_id: 1, table_name:"#1", capacity:6 ,reservation_id: null,},
  {table_id: 2, table_name:"#2", capacity:6 ,reservation_id: null,},
  {table_id: 3, table_name:"Bar #1", capacity:1 ,reservation_id: null,},
  {table_id: 4, table_name:"Bar #2", capacity:1 ,reservation_id: null,},
];

function nextId(){
  return Date.now();
}
export async function createTable(table, signal){
  const newTable = {...table, table_id: nextId(), reservation_id: null};
  tables.push(newTable);
  return newTable;  
}

export async function listTables(signal){
  // if (params){
  //   return tables.filter( (table) => table.reservation_id === params.reservation_id);
  // }
  return tables;
}

export async function updateTable(tableId, reservation_id){
  const index = tables.findIndex( (table) => table.table_id === Number(tableId) );
  if (index > -1){
    tables[index].reservation_id = Number(reservation_id);
    return tables[index]; 
  }
}