export default async function apiRequest(
  url,
  method = "GET",
  body = null,
  headers = {},
) {
  try {
    const isFormData = body instanceof FormData;

    const options = {
      method,
      credentials: "include",
      headers: {
        // Only apply JSON header when NOT FormData
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...headers,
      },
    };

    // Correct body handling
    if (body !== null && body !== undefined) {
      options.body = isFormData ? body : JSON.stringify(body);
    }

    const response = await fetch(url, options);

    // Better error handling
    const rawText = await response.text();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${rawText}`);
    }

    // Safe JSON parsing fallback
    try {
      return rawText ? JSON.parse(rawText) : {};
    } catch {
      return rawText;
    }
  } catch (err) {
    console.error("API request failed:", err);
    throw err;
  }
}