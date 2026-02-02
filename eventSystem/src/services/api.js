async function apiRequest(endpoint, options = {}) {
  const {
    method = "GET",
    body = null,
    headers = {},
    token = null,
    timeout = 10000, // 10 seconds
  } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(endpoint, {
      method,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    // auto parse json (or text if not json)
    const contentType = res.headers.get("content-type");
    const data = contentType && contentType.includes("application/json")
      ? await res.json()
      : await res.text();

    // handle errors
    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        data,
        error: data?.message || "Request failed",
      };
    }

    return {
      ok: true,
      status: res.status,
      data,
      error: null,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      data: null,
      error: err.name === "AbortError" ? "Request timeout" : err.message,
    };
  } finally {
    clearTimeout(timer);
  }
}
