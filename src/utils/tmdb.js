const BASE = "https://api.themoviedb.org/3";

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

async function get(path, params = {}) {
  const url = new URL(path, BASE);

  const combined = {
    ...(params || {}),
    api_key: apiKey,
    language: "en-US",
  };

  Object.keys(combined).forEach((key) => {
    const val = combined[key];
    if (val !== undefined && val !== null) url.searchParams.append(key, String(val));
  });

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB request failed: ${res.status}`);
  const data = await res.json();
  return { data };
}

const tmdb = { get };
export default tmdb;