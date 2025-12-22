export function save(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

export function get(key) {
  return JSON.parse(localStorage.getItem(key));
}
