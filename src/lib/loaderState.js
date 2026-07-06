const LOADER_KEY = "astro-site-loader-seen";

function getStorage() {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
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
