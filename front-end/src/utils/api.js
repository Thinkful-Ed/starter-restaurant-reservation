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

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    value && url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime)
    .then( (result) => {
      return result;
    });
}

export async function createTable(table, signal){
  const url = `${API_BASE_URL}/tables`;
  const options = {
    method : "POST",
    headers,
    body : JSON.stringify({ data : table }), 
    signal : signal,
  }
  const newTable = await fetchJson(url, options);
  return newTable;
}
  
export async function listTables(signal){
  const url = `${API_BASE_URL}/tables`;
  const options = {
    method : "GET",
    headers,
    signal : signal,
  }
  const tables = await fetchJson(url, options);
  return tables;
}

export async function updateTable(tableId, reservation_id){
  const url = `${API_BASE_URL}/tables/${tableId}/seat`;
  const options = {
    method : "PUT",
    headers,
    body : JSON.stringify({ data : {reservation_id,} }),
  }
  const updated = await fetchJson(url, options);
  return updated;
}

export async function readReservation(reservation_id, signal){
  const url = `${API_BASE_URL}/reservations/${reservation_id}`;
  const options = {
    method : "GET",
    headers,
    signal,
  }
  const reservation = await fetchJson(url, options)
    .then(formatReservationDate)
    .then(formatReservationTime);
  return reservation;
}