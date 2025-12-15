// theme-sync.tsx
import { useEffect } from "react";
import { Uniwind } from "uniwind";
import { useAppStore } from "../store";

export function ThemeSync() {
  const theme = useAppStore((s) => s.theme);
  const hydrated = useAppStore((s) => s._hasHydrated);

  useEffect(() => {
    if (!hydrated) return;
    console.log('theme ', theme);
    Uniwind.setTheme(theme);
  }, [theme, hydrated]);

  return null;
}
