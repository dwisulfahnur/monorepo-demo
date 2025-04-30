"use client"

import { IconButton, Tooltip, Zoom } from "@mui/material"
import { LightMode, DarkMode } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { toggleTheme } from "@/store/slices/themeSlice"
import { useThemeStore } from "@/store/hooks"
import { store } from "@/store"

export function ThemeToggleButton() {
  // const dispatch = useDispatch()
  const { themeMode } = useThemeStore()

  const handleToggleTheme = () => {
    store.dispatch(toggleTheme())
  }

  return (
    <Tooltip
      title={`Switch to ${themeMode === "light" ? "dark" : "light"} mode`}
      slots={{ transition: Zoom }}
      placement="left"
      arrow
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.5,
        }}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={handleToggleTheme}
          aria-label={`Switch to ${themeMode === "light" ? "dark" : "light"} mode`}
          sx={{
            backgroundColor: themeMode === "light" ? "primary.main" : "secondary.main",
            color: "white",
            width: 56,
            height: 56,
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            "&:hover": {
              backgroundColor: themeMode === "light" ? "primary.dark" : "secondary.dark",
              transform: "scale(1.05)",
            },
            transition: "all 0.3s ease",
          }}
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {themeMode === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>
      </motion.div>
    </Tooltip>
  )
}
