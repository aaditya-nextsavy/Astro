const LOADER_KEY = "astro-site-loader-seen";

// sessionStorage: the loader shows once per tab session and again after the tab/window is closed
function getStorage() {
  if (typeof window === "undefined") return null;

  try {
    // drop the old flag that used to persist for days
    window.localStorage.removeItem(LOADER_KEY);
  } catch {}

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function hasSeenSiteLoader() {
  const storage = getStorage();

  if (!storage) return false;

  return storage.getItem(LOADER_KEY) === "true";
}

export function markSiteLoaderSeen() {
  const storage = getStorage();

  if (!storage) return;

  storage.setItem(LOADER_KEY, "true");
}
