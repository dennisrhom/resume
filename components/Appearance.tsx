"use client";

import { useId, useLayoutEffect } from "react";
import type { PrefKey, PrefValue } from "@/lib/prefs";
import { applyStoredPrefs, setPref, usePref } from "@/lib/prefs-client";
import { Dropdown } from "./Dropdown";

type Group<K extends PrefKey> = { key: K; label: string; options: [PrefValue<K>, string][] };

const GROUPS = [
  {
    key: "size",
    label: "Text",
    options: [
      ["small", "Small"],
      ["standard", "Standard"],
      ["large", "Large"],
    ],
  } satisfies Group<"size">,
  {
    key: "width",
    label: "Width",
    options: [
      ["standard", "Standard"],
      ["wide", "Wide"],
    ],
  } satisfies Group<"width">,
  {
    key: "color",
    label: "Color",
    options: [
      ["auto", "Automatic"],
      ["light", "Light"],
      ["dark", "Dark"],
    ],
  } satisfies Group<"color">,
];

function PrefGroup<K extends PrefKey>({ group }: { group: Group<K> }) {
  const value = usePref(group.key);
  const id = useId();
  return (
    <div className={`mp-pref mp-pref-${group.key}`} role="radiogroup" aria-labelledby={`${id}-label`}>
      <div className="mp-pref-label" id={`${id}-label`}>
        {group.label}
      </div>
      {group.options.map(([v, label]) => (
        <label key={v} className="mp-radio">
          <input
            type="radio"
            name={`${id}-${group.key}`}
            value={v}
            checked={value === v}
            onChange={() => setPref(group.key, v)}
          />
          {label}
        </label>
      ))}
    </div>
  );
}

function AppearanceForm() {
  return (
    <>
      {GROUPS.map((g) => (
        <PrefGroup key={g.key} group={g as Group<PrefKey>} />
      ))}
    </>
  );
}

/** Appearance pinned in the right sidebar. */
export function AppearancePanel() {
  return (
    <div className="mp-panel">
      <div className="mp-panel-head">
        <h2 className="mp-panel-title">Appearance</h2>
        <button type="button" className="mp-hide" onClick={() => setPref("appearance", "hidden")}>
          hide
        </button>
      </div>
      <AppearanceForm />
    </div>
  );
}

const AppearanceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
    <path
      d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18m0 2v14a7 7 0 0 1 0-14"
      fill="currentColor"
    />
  </svg>
);

/** Header button that opens Appearance when it is not in the sidebar. */
export function AppearanceButton() {
  return (
    <Dropdown className="mp-appearance-btn" label="Appearance" icon={<AppearanceIcon />} align="right">
      {(close) => (
        <div className="mp-panel">
          <div className="mp-panel-head">
            <h2 className="mp-panel-title">Appearance</h2>
            <button
              type="button"
              className="mp-hide mp-pin mp-pin-appearance"
              onClick={() => {
                setPref("appearance", "pinned");
                close();
              }}
            >
              move to sidebar
            </button>
          </div>
          <AppearanceForm />
        </div>
      )}
    </Dropdown>
  );
}

/**
 * The inline script in the root layout applies saved preferences before paint.
 * React's development-mode remount resets <html> attributes, so re-apply them here.
 */
export function PrefsSync() {
  useLayoutEffect(() => applyStoredPrefs(), []);
  return null;
}
