/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://capstonereservationbackend.onrender.com";

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
 * Saves reservation to the database.
 * @param reservation
 *  the reservation to save, which must have an `id` property
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<[reservation]>}
 *  a promise that resolves the saved reservation, which will now have an `id` property.
 */
export async function createReservation(reservation, signal) {
  const url = `${API_BASE_URL}/reservations`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({data:reservation}),
    signal,
  };
  return await fetchJson(url, options, {});
}



/**
 * Retrieves the reservation with the specified `reservationId`
 * @param reservationId
 *  the `id` property matching the desired reservation.
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<any>}
 *  a promise that resolves to the saved reservation.
 */
export async function readReservation(reservationId, signal) {
  const url = `${API_BASE_URL}/reservations/${reservationId}`;
  return await fetchJson(url, { signal }, {});
}

/**
 * Updates an existing reservation
 * @param updatedReservation
 *  the reservation to save, which must have an `id` property.
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to the updated reservation.
 */
export async function updateReservation(updatedReservation, signal) {
  const url = `${API_BASE_URL}/reservations/${updatedReservation.id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({data:updatedReservation}),
    signal,
  };
  return await fetchJson(url, options, updatedReservation);
}

/**
 * Retrieves all existing tables.
 * @returns {Promise<[table]>}
 *  a promise that resolves to a possibly empty array of tables saved in the database.
 */

export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  return await fetchJson(url, { headers, signal }, []);
}


/**
 * Saves table to the database.
 * @param table
 *  the table to save, which must have an `id` property
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<[table]>}
 *  a promise that resolves the saved table, which will now have an `id` property.
 */
export async function createTable(table, signal) {
  const url = `${API_BASE_URL}/tables`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({data:table}),
    signal,
  };
  return await fetchJson(url, options, {});
}

/**
 * Updates an existing table
 * @param updateTable
 *  the reservation to save, which must have an `id` property.
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to the updated reservation.
 */
export async function updateTable(tableId,reservationId, signal) {
  const url = `${API_BASE_URL}/tables/${tableId}/seat`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({data:{reservation_id: reservationId}}),
    signal,
  };
  return await fetchJson(url, options, {});
}

/**
 * Finish an existing table
 * @param finishTable
 *  the reservation to save, which must have an `id` property.
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to the updated reservation.
 */
export async function finishTable(tableId, signal) {
  const url = `${API_BASE_URL}/tables/${tableId}/seat`;
  const options = {
    method: "DELETE",
    headers,
    signal,
  };
  return await fetchJson(url, options, {});
}
