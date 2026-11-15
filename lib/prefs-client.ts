import { useSyncExternalStore } from "react";
import { DEFAULT_PREFS, PREF_OPTIONS, type PrefKey, type PrefValue, STORAGE_KEY } from "./prefs";

/** Client-side store for the Appearance preferences. Only import from Client Components. */

function readStored(): Partial<Record<PrefKey, string>> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

/** Re-apply saved values (React's dev-mode remount resets <html> attributes). */
export function applyStoredPrefs() {
  const stored = readStored();
  for (const key of Object.keys(PREF_OPTIONS) as PrefKey[]) {
    const v = stored[key];
    if (v && (PREF_OPTIONS[key] as readonly string[]).includes(v)) {
      document.documentElement.setAttribute(`data-${key}`, v);
    }
  }
  notify();
}

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export function setPref<K extends PrefKey>(key: K, value: PrefValue<K>) {
  document.documentElement.setAttribute(`data-${key}`, value);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readStored(), [key]: value }));
  } catch {
    // Storage blocked (private mode, disabled site data): the choice still applies to this page view.
  }
  notify();
}

export function usePref<K extends PrefKey>(key: K): PrefValue<K> {
  return useSyncExternalStore(
    subscribe,
    () => (document.documentElement.getAttribute(`data-${key}`) ?? DEFAULT_PREFS[key]) as PrefValue<K>,
    () => DEFAULT_PREFS[key],
  );
}
