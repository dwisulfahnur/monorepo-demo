"use client";

import { useEffect, ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "@/lib/theme"
import { setTheme } from "@/store/slices/themeSlice";
import { useThemeStore } from "@/store/hooks";
import { store } from "@/store";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const { themeMode } = useThemeStore()

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme) {
        store.dispatch(setTheme(savedTheme as 'light' | 'dark'))
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        store.dispatch(setTheme("dark"))
      }

      // Add listener for system theme changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem("theme")) {
          store.dispatch(setTheme(e.matches ? "dark" : "light"))
        }
      }

      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  // Save theme preference to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", themeMode)
      document.documentElement.setAttribute("data-theme", themeMode)
    }
  }, [themeMode])

  const theme = themeMode === "light" ? lightTheme : darkTheme
  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  )
}