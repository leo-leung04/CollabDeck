const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api";

async function fetchJson<T>(path: string): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Request to ${url} failed with ${res.status}: ${text || res.statusText}`
    );
  }

  return res.json() as Promise<T>;
}

export const apiClient = {
  fetchJson
};


