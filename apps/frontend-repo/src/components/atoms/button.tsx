"use client"

import MuiButton, { ButtonProps } from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import { motion } from "framer-motion"

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean
}


export function Button({ children, isLoading, disabled, variant = "contained", ...props }: CustomButtonProps) {
  return (
    <MuiButton
      component={motion.div}
      disabled={isLoading || disabled}
      variant={variant}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {isLoading ? (
        <CircularProgress
          size={24}
          sx={{
            color: variant === "contained" ? "white" : "primary.main",
          }}
        />
      ) : (
        children
      )}
    </MuiButton>
  )
}
