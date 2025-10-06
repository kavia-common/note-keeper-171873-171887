 /**
  * PUBLIC_INTERFACE
  * Safe getter for JSON data from localStorage with fallback.
  */
export function getJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/**
 * PUBLIC_INTERFACE
 * Safe setter for JSON data to localStorage.
 */
export function setJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
