// @ts-check

import { HttpError } from '../classes/HttpError.js'


/**
 * Performs an HTTP request using the Fetch API.
 * Throws an HttpError if the response is not ok.
 * 
 * @param {string} url - The URL to send the request to.
 * @param {RequestInit} options - Optional configuration options for the request.
 * @returns {Promise<any>} - A promise that resolves to the JSON response.
 * @throws {HttpError} - If the HTTP response is not ok.
 */
export async function simpleFetch (url, options) {
  const result = await fetch(url, options);
  if (!result.ok) {
    throw new HttpError(result);
  }
  
  let isJsonResponse = result.headers.get('Content-Type')?.includes('application/json');
  if (isJsonResponse) {
    return (await result.json());
  }
  return (await result.text());
}