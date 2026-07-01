let ready = false;

const listeners = new Set();

export function isAppReady() {
  return ready;
}

export function setAppReady(value = true) {
  if (ready === value) return;

  ready = value;

  listeners.forEach((listener) => listener(ready));
}

export function subscribeAppReady(listener) {
  listeners.add(listener);

  // Immediately notify with current state
  listener(ready);

  return () => listeners.delete(listener);
}