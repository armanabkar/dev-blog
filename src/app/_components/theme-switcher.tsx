"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import styles from "./switch.module.css";

type ColorSchemePreference = "system" | "dark" | "light";
const STORAGE_KEY = "nextjs-blog-starter-theme";
const modes: ColorSchemePreference[] = ["system", "dark", "light"];

/**
 * Inline script executed before hydration to prevent FOUC.
 * It sets the initial theme (reads localStorage) and applies it immediately.
 */
const NoFOUCScript = `(() => {
  try {
    const STORAGE_KEY = "${STORAGE_KEY}";
    const [SYSTEM, DARK, LIGHT] = ["system", "dark", "light"];
    const modifyTransition = () => {
      const css = document.createElement("style");
      css.id = "no-transition-style";
      css.textContent = "*,*:after,*:before{transition:none !important;}";
      document.head.appendChild(css);
      return () => {
        // force reflow then remove
        getComputedStyle(document.body);
        setTimeout(() => {
          const el = document.getElementById("no-transition-style");
          if (el && el.parentNode) el.parentNode.removeChild(el);
        }, 1);
      };
    };

    const applyMode = (mode) => {
      const restore = modifyTransition();
      const media = matchMedia("(prefers-color-scheme: dark)");
      const systemMode = media.matches ? DARK : LIGHT;
      const resolved = mode === SYSTEM ? systemMode : mode;
      if (resolved === DARK) document.documentElement.classList.add(DARK);
      else document.documentElement.classList.remove(DARK);
      document.documentElement.setAttribute("data-mode", mode);
      restore();
    };

    const stored = localStorage.getItem(STORAGE_KEY) || SYSTEM;
    applyMode(stored);

    // keep in sync with system preference changes (best-effort)
    try {
      const m = matchMedia("(prefers-color-scheme: dark)");
      if (typeof m.addEventListener === "function") {
        m.addEventListener("change", () => {
          const newStored = localStorage.getItem(STORAGE_KEY) || SYSTEM;
          applyMode(newStored);
        });
      } else if (typeof m.addListener === "function") {
        m.addListener(() => {
          const newStored = localStorage.getItem(STORAGE_KEY) || SYSTEM;
          applyMode(newStored);
        });
      }
    } catch (e) {
      // ignore
    }
  } catch (e) {
    // ignore errors (CSP or environment)
  }
})();`;

/**
 * Client-side helper that uses the same logic as the injected script
 * to apply a mode immediately (and without relying on globals).
 */
function applyModeToDOM(mode: ColorSchemePreference) {
  const SYSTEM = "system";
  const DARK = "dark";
  const LIGHT = "light";

  const css = document.createElement("style");
  css.textContent = "*,*:after,*:before{transition:none !important;}";
  css.dataset.ts = "1";
  document.head.appendChild(css);

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const systemMode = media.matches ? DARK : LIGHT;
  const resolved = mode === SYSTEM ? systemMode : mode;

  if (resolved === DARK) document.documentElement.classList.add(DARK);
  else document.documentElement.classList.remove(DARK);

  document.documentElement.setAttribute("data-mode", mode);

  // cleanup (allow next tick to paint then remove transition blocker)
  getComputedStyle(document.body);
  setTimeout(() => {
    if (css.parentNode) css.parentNode.removeChild(css);
  }, 1);
}

/**
 * The button that toggles theme.
 * Initial state is "system" to avoid SSR/client mismatch.
 * After mount we read stored value and sync.
 */
const Switch = () => {
  const [mode, setMode] = useState<ColorSchemePreference>("system");
  const mediaRef = useRef<MediaQueryList | null>(null);

  // On mount: read stored mode and set up listeners
  useEffect(() => {
    // Read stored value (client-only)
    try {
      const stored =
        (localStorage.getItem(STORAGE_KEY) as ColorSchemePreference | null) ??
        "system";
      setMode(stored);
      // Apply immediately to DOM so UI updates match the pre-hydration script
      applyModeToDOM(stored);
    } catch (e) {
      // ignore if localStorage access is blocked
    }

    // media query listener (respond to system theme change only if mode === 'system')
    const m = window.matchMedia("(prefers-color-scheme: dark)");
    mediaRef.current = m;

    const handleMedia = () => {
      const stored =
        (localStorage.getItem(STORAGE_KEY) as ColorSchemePreference | null) ??
        "system";
      if (stored === "system") {
        applyModeToDOM("system");
      }
    };

    if (typeof m.addEventListener === "function")
      m.addEventListener("change", handleMedia);
    else if (typeof m.addListener === "function") m.addListener(handleMedia);

    // storage event to sync across tabs
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        const newVal = (e.newValue as ColorSchemePreference | null) ?? "system";
        setMode(newVal);
        applyModeToDOM(newVal);
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      if (m) {
        if (typeof m.removeEventListener === "function")
          m.removeEventListener("change", handleMedia);
        else if (typeof m.removeListener === "function")
          m.removeListener(handleMedia);
      }
      window.removeEventListener("storage", onStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When mode changes (via the button), persist and apply
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (e) {
      // ignore (CSP or storage blocked)
    }
    applyModeToDOM(mode);
  }, [mode]);

  const handleModeSwitch = () => {
    setMode((prev) => {
      const idx = modes.indexOf(prev);
      return modes[(idx + 1) % modes.length];
    });
  };

  return (
    <button
      aria-pressed={mode === "dark"}
      title={`Theme: ${mode}`}
      className={styles.switch}
      onClick={handleModeSwitch}
    />
  );
};

export const ThemeSwitcher = () => {
  return (
    <>
      {/* runs before hydration — sets initial theme to avoid FOUC */}
      <Script
        id="theme-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: NoFOUCScript }}
      />
      <Switch />
    </>
  );
};
