"use client"

import { createTheme, type Theme } from "@mui/material/styles"

const createAppTheme = (mode: "light" | "dark"): Theme => {
  const isDark = mode === "dark"

  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#6366F1", // Indigo
        light: "#818CF8",
        dark: "#4F46E5",
      },
      secondary: {
        main: "#EC4899", // Pink
        light: "#F472B6",
        dark: "#DB2777",
      },
      success: {
        main: "#10B981", // Emerald
      },
      error: {
        main: "#EF4444", // Red
      },
      warning: {
        main: "#F59E0B", // Amber
      },
      info: {
        main: "#3B82F6", // Blue
      },
      background: isDark
        ? {
          default: "#121212",
          paper: "#1E1E1E",
        }
        : {
          default: "#F9FAFB",
          paper: "#FFFFFF",
        },
      text: isDark
        ? {
          primary: "#F3F4F6",
          secondary: "#D1D5DB",
        }
        : {
          primary: "#111827",
          secondary: "#6B7280",
        },
    },
    typography: {
      fontFamily: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
      h5: {
        fontWeight: 700,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 12,
            fontWeight: 600,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: isDark
                ? "0 10px 25px -5px rgba(236, 72, 153, 0.4)"
                : "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
            },
          },
          contained: {
            boxShadow: isDark ? "0 4px 14px 0 rgba(236, 72, 153, 0.39)" : "0 4px 14px 0 rgba(99, 102, 241, 0.39)",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 12,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
              },
              "&.Mui-focused": {
                boxShadow: isDark ? "0 0 0 3px rgba(236, 72, 153, 0.2)" : "0 0 0 3px rgba(99, 102, 241, 0.2)",
              },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            transition: "background-color 0.3s ease, color 0.3s ease",
          },
          elevation3: {
            boxShadow: isDark ? "0 10px 30px -5px rgba(0, 0, 0, 0.3)" : "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: "background-color 0.3s ease, color 0.3s ease",
          },
        },
      },
    },
  })
}

export const lightTheme = createAppTheme("light")
export const darkTheme = createAppTheme("dark")

export default lightTheme
