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
 *  the url for the request.
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

// Posts new reservation in the database
export async function postReservations(reservation, signal) {
  const url = `${API_BASE_URL}/reservations`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: reservation }),
    signal,
  };
  return await fetchJson(url, options, {});
}
// Post new table in the database
export async function postTables(table, signal) {
  const url = `${API_BASE_URL}/tables`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: table }),
    signal,
  };
  return await fetchJson(url, options, {});
}

// list all of the existing tables in the database
export async function listTables(signal) {
  const url = `${API_BASE_URL}/tables`;
  return await fetchJson(url, { signal });
}

// sends a get request to API to return the table with the matching_id
export async function readReservation(reservation_id, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}`;
  return await fetchJson(url, { signal });
}

// seats a reservation by table_id
export async function seatTable(table, reservation_id, signal) {
  const { table_id } = table;
  console.log("table_id", table_id);
  const url = `${API_BASE_URL}/tables/${table_id}/seat`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({
      data: { reservation_id: reservation_id },
    }),
    signal,
  };
  return await fetchJson(url, options, {});
}

// Sends a delete request to database, request updates table status to free and reservation status to finished
export async function finishTable(table_id, signal) {
  const url = `${API_BASE_URL}/tables/${table_id}/seat`;
  const options = {
    method: "DELETE",
    headers,
    signal,
  };
  return await fetchJson(url, options, {});
}

// Sends a put request to database, request updates  reservation status to cancelled
export async function cancelReservationStatus(reservation_id, status, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}/status`;

  const option = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { status: status } }),
    signal,
  };

  return await fetchJson(url, option, {});
}

// Sends a get request to API using mobile number as a query,
// API returns all the reservations with a matching phone number
export async function searchReservationByPhone(mobile_number, signal) {
  const url = `${API_BASE_URL}/reservations?mobile_number=${mobile_number}`;
  return await fetchJson(url, { signal });
}

// Sends a put request to API that updates the reservation with the matching id.
export async function updateReservation(form, reservation_id, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}`;
  const option = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: form }),
    signal,
  };

  return await fetchJson(url, option, {});
}