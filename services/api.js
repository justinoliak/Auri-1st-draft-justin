// API service for making network requests

const BASE_URL = "https://api.example.com";

export async function fetchWithAuth(endpoint, options = {}) {
  // Get auth token from secure storage or context
  const token = ""; // Replace with actual token retrieval

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export const api = {
  // User related endpoints
  user: {
    login: (credentials) =>
      fetchWithAuth("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    getProfile: () => fetchWithAuth("/user/profile"),
  },

  // Journal related endpoints
  journal: {
    getEntries: () => fetchWithAuth("/journal/entries"),
    createEntry: (entry) =>
      fetchWithAuth("/journal/entries", {
        method: "POST",
        body: JSON.stringify(entry),
      }),
  },
};
