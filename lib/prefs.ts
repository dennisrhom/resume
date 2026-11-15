/**
 * Reader preferences from the Appearance panel, plus whether the Contents and
 * Appearance panels are pinned to the sidebars. The source of truth is a
 * data-* attribute on <html> (CSS reads it), mirrored to localStorage.
 * An inline script in the root layout applies the saved values before first paint.
 */
export const PREF_OPTIONS = {
  size: ["small", "standard", "large"],
  width: ["standard", "wide"],
  color: ["auto", "light", "dark"],
  toc: ["pinned", "hidden"],
  appearance: ["pinned", "hidden"],
} as const;

export type PrefKey = keyof typeof PREF_OPTIONS;
export type PrefValue<K extends PrefKey> = (typeof PREF_OPTIONS)[K][number];

export const DEFAULT_PREFS: { [K in PrefKey]: PrefValue<K> } = {
  size: "standard",
  width: "standard",
  color: "light",
  toc: "pinned",
  appearance: "pinned",
};

export const STORAGE_KEY = "minipedia-prefs";

/** Attributes for <html> in the server render. */
export const defaultHtmlAttrs = Object.fromEntries(
  Object.entries(DEFAULT_PREFS).map(([k, v]) => [`data-${k}`, v]),
) as Record<`data-${PrefKey}`, string>;

/** Runs in <head> before paint. Kept dependency-free and ES5 so it runs anywhere. */
export const prefsInlineScript = `(function(){try{var d=document.documentElement,p=JSON.parse(localStorage.getItem(${JSON.stringify(
  STORAGE_KEY,
)})||"{}"),o=${JSON.stringify(PREF_OPTIONS)};for(var k in o){if(o[k].indexOf(p[k])>-1)d.setAttribute("data-"+k,p[k])}}catch(e){}})()`;
