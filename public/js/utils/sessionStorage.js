export function getSessionStorage(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

export function setSessionStorage(key, value) {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }

  sessionStorage.setItem(key, value);
}

export function removeSessionStorage(key) {
  sessionStorage.removeItem(key);
}

export function clearSessionStorage() {
  sessionStorage.clear();
}
