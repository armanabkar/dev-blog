"use client";

import styles from "./switch.module.css";
import { memo, useEffect, useState } from "react";

declare global {
  var updateDOM: () => void;
}

type ColorSchemePreference = "system" | "dark" | "light";

const STORAGE_KEY = "nextjs-blog-starter-theme";
const modes: ColorSchemePreference[] = ["system", "dark", "light"];

/** function to be executed on the client to avoid FOUC */
export const NoFOUCScript = (storageKey: string) => {
  const [SYSTEM, DARK, LIGHT] = ["system", "dark", "light"];

  const modifyTransition = () => {
    const css = document.createElement("style");
    css.textContent = "*,*:after,*:before{transition:none !important;}";
    document.head.appendChild(css);

    return () => {
      getComputedStyle(document.body);
      setTimeout(() => {
        // remove only if still attached
        if (css.parentNode) document.head.removeChild(css);
      }, 1);
    };
  };

  const media = matchMedia(`(prefers-color-scheme: ${DARK})`);

  window.updateDOM = () => {
    const restoreTransitions = modifyTransition();
    const mode = localStorage.getItem(storageKey) ?? SYSTEM;
    const systemMode = media.matches ? DARK : LIGHT;
    const resolvedMode = mode === SYSTEM ? systemMode : mode;
    const classList = document.documentElement.classList;
    if (resolvedMode === DARK) classList.add(DARK);
    else classList.remove(DARK);
    document.documentElement.setAttribute("data-mode", mode);
    restoreTransitions();
  };

  // run immediately and keep listener
  window.updateDOM();
  media.addEventListener("change", window.updateDOM);
};

let updateDOM: () => void;

/**
 * Switch button to quickly toggle user preference.
 */
const Switch = () => {
  const [mode, setMode] = useState<ColorSchemePreference>(() => {
    try {
      const v =
        typeof localStorage !== "undefined" &&
        localStorage.getItem(STORAGE_KEY);
      return (v ?? "system") as ColorSchemePreference;
    } catch {
      return "system";
    }
  });

  useEffect(() => {
    // store global function reference if available
    updateDOM =
      typeof window !== "undefined" ? window.updateDOM ?? (() => {}) : () => {};

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY)
        setMode((e.newValue ?? "system") as ColorSchemePreference);
    };
    addEventListener("storage", onStorage);
    return () => removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {}
    // safe-call if defined
    try {
      updateDOM && updateDOM();
    } catch {}
  }, [mode]);

  const handleModeSwitch = () => {
    const index = modes.indexOf(mode);
    setMode(modes[(index + 1) % modes.length]);
  };
  return (
    <button
      suppressHydrationWarning
      className={styles.switch}
      onClick={handleModeSwitch}
    />
  );
};

/**
 * Inject NoFOUCScript on client after mount.
 * This avoids rendering a <script> tag in the server HTML and prevents hydration mismatch.
 */
const Script = memo(() => {
  useEffect(() => {
    // execute the helper directly on client
    NoFOUCScript(STORAGE_KEY);
    // no cleanup for media listener because NoFOUCScript registers a listener on window.matchMedia
    // that you may optionally remove here if you export the listener reference.
  }, []);
  return null;
});

/**
 * This component applies classes and transitions entirely on client.
 */
export const ThemeSwitcher = () => {
  return (
    <>
      <Script />
      <Switch />
    </>
  );
};
