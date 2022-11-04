/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

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
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}
/**
 * Saves reservation to the database
 * All fields required; date and time must be valid.
 * People must be a number greater than 0
 * @param reservation 
 * the reservation being saved; must not have ID or timestamps properties
 * @param signal 
 * optional AbortController.signal
 * @returns {Promise<reservation>}
 * a promise that resolves the saved reservation, which is given id and timestamps.
 */
export async function createReservation(reservation, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: reservation }),
    signal,
  };
  return await fetchJson(url, options, []);
}

/**
 * Retrieves all existing tables.
 * @returns {Promise<[tables]>}
 *  a promise that resolves to an array of tables saved in the database.
 */
export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  return await fetchJson(url, {signal}, []);
}

/**
 * Saves table to the database
 * All fields required and are validated;
 * @param table 
 * the table being saved; must not have ID or timestamps properties
 * @param signal 
 * optional AbortController.signal
 * @returns {Promise<table>}
 * a promise that resolves the saved tables, which is given ids and timestamps.
 */

export async function createTable(table, signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({data: table}),
    signal,
  };
  return await fetchJson(url, options, []);
}

/**
 * Updates reservation status to 'seated'
 * Requires only table input from form
 * @param table_id
 * the table reservation is being seated at
 * @param reservation_id
 * reservation being seated
 * @param signal 
 * optional AbortController.signal
 * @returns {Promise<table>}
 * a promise that updates the reservation status and updates the table availability.
 */
export async function updateToSeated(table_id, reservation_id) {
  const url = `${API_BASE_URL}/tables/${table_id}/seat`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({data: {reservation_id: reservation_id}}),
  }
  return await fetchJson(url, options, []);
}