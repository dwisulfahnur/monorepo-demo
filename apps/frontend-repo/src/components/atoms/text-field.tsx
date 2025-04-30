"use client"

import type { ReactNode } from "react"
import MuiTextField, { TextFieldProps } from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import { motion } from "framer-motion"

interface CustomTextFieldProps {
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export function TextField({ startIcon, endIcon, ...props }: CustomTextFieldProps & TextFieldProps) {
  return (
    <MuiTextField
      fullWidth
      component={motion.div}
      // initial={{ opacity: 0, y: 10 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.3 }}
      margin="normal"
      slotProps={{
        input: {
          ...props.slotProps,
          startAdornment: startIcon ? (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ) : undefined,
          endAdornment: endIcon ? (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ) : undefined,
        }
      }}
      {...props}
    />
  )
}
