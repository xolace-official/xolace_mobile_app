// app-theme-context.tsx
import React, { createContext, useCallback, useContext, useMemo } from "react";
import { Uniwind, useUniwind } from "uniwind";
import type { ThemeName } from "../types";
import { useTheme, useSetTheme } from "../store";

interface AppThemeContextType {
  currentTheme: ThemeName;
  isLight: boolean;
  isDark: boolean;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
}

const AppThemeContext = createContext<AppThemeContextType | undefined>(
  undefined,
);

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // This tells you what Uniwind currently has applied
  const { theme: appliedTheme } = useUniwind();

  // This is your persisted choice (source of truth)
  const storedTheme = useTheme();
  const setStoredTheme = useSetTheme();

  // Prefer store as "currentTheme" since it's the user's choice
  const currentTheme = storedTheme;

  const isLight = useMemo(
    () => appliedTheme === "light" || appliedTheme.endsWith("-light"),
    [appliedTheme],
  );

  const isDark = useMemo(
    () => appliedTheme === "dark" || appliedTheme.endsWith("-dark"),
    [appliedTheme],
  );

  const setTheme = useCallback(
    (newTheme: ThemeName) => {
      console.log("newTheme ", newTheme);
      setStoredTheme(newTheme); // persists
      Uniwind.setTheme(newTheme); // immediate apply
    },
    [setStoredTheme],
  );

  const toggleTheme = useCallback(() => {
    // toggle based on what is actually applied (more accurate than stored)
    const t = appliedTheme as ThemeName;

    switch (t) {
      case "light":
        return setTheme("dark");
      case "dark":
        return setTheme("light");

      case "lavender-light":
        return setTheme("lavender-dark");
      case "lavender-dark":
        return setTheme("lavender-light");

      case "mint-light":
        return setTheme("mint-dark");
      case "mint-dark":
        return setTheme("mint-light");

      case "sky-light":
        return setTheme("sky-dark");
      case "sky-dark":
        return setTheme("sky-light");

      case "system":
      default:
        // pick your preferred behavior for system
        return setTheme("system");
    }
  }, [appliedTheme, setTheme]);

  const value = useMemo(
    () => ({
      currentTheme,
      isLight,
      isDark,
      setTheme,
      toggleTheme,
    }),
    [currentTheme, isLight, isDark, setTheme, toggleTheme],
  );

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const ctx = useContext(AppThemeContext);
  if (!ctx) throw new Error("useAppTheme must be used within AppThemeProvider");
  return ctx;
};
