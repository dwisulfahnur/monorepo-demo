"use client"

import { Container, Box, Paper } from "@mui/material"
import { ThemeToggleButton } from "@/components/atoms/theme-toggle-button"
import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/hooks"

interface HomeTemplateProps {
  children: ReactNode
}

const MotionPaper = motion.create(Paper)

export default function HomeTemplate({ children }: HomeTemplateProps) {
  const { isDark } = useThemeStore()

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isDark
          ? "linear-gradient(135deg, #1E293B 0%, #3D1A54 100%)"
          : "linear-gradient(135deg, #6366F1 0%, #EC4899 100%)",
        py: 4,
        transition: "background 0.5s ease",
      }}
    >
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <MotionPaper
            elevation={3}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{
              p: 4,
              width: "100%",
              borderRadius: 4,
              backdropFilter: "blur(10px)",
              background: isDark ? "rgba(30, 30, 30, 0.95)" : "rgba(255, 255, 255, 0.95)",
              transition: "background 0.3s ease",
            }}
          >
            {children}
          </MotionPaper>

          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            sx={{
              mt: 4,
              textAlign: "center",
              color: "white",
              fontSize: "0.875rem",
            }}
          >
            © {new Date().getFullYear()} MonoRepoDemo. All rights reserved.
          </Box>
        </Box>
      </Container>

      <ThemeToggleButton />
    </Box>
  )
}
