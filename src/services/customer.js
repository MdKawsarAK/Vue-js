const baseUrl = 'http://localhost:5173/';

export async function fetchData(endpoint, options = {}) {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer TOKEN', // if needed
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Fetch Error:', err);
    throw err;
  }
}