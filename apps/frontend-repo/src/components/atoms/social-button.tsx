"use client"

import type { ReactNode } from "react"
import MuiButton, { ButtonProps } from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import { motion } from "framer-motion"

interface SocialButtonProps extends ButtonProps {
  icon: ReactNode
  provider: string
  isLoading?: boolean
}


export function SocialButton({ icon, provider, isLoading, children, ...props }: SocialButtonProps) {
  return (
    <MuiButton
      fullWidth
      component={motion.div}
      variant="outlined"
      startIcon={isLoading ? undefined : icon}
      disabled={isLoading}
      whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.98 }}
      sx={{
        justifyContent: "flex-start",
        py: 1.2,
        px: 2,
        borderWidth: 2,
        ...props.sx,
      }}
      {...props}
    >
      {isLoading ? <CircularProgress size={24} /> : children}
    </MuiButton>
  )
}
