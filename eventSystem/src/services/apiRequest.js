/**
 * Generic REST API handler
 * @param {string} url - endpoint URL
 * @param {string} method - GET, POST, PUT, DELETE
 * @param {object|null} body - request body for POST/PUT
 * @param {object} headers - optional additional headers
 * @returns {Promise<object>} - JSON response
 */
export default async function apiRequest(
  url,
  method = "GET",
  body = null,
  headers = {},
) {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      credentials: "include", // Required to send cookies (PHPSESSID) with cross-origin requests
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    // Check if the response is not OK
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    // Return parsed JSON (or empty object if no content)
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  } catch (err) {
    console.error("API request failed:", err);
    throw err;
  }
}
