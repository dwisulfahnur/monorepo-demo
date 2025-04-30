"use client"

import { Alert, type AlertProps } from "@mui/material"
import { motion, AnimatePresence } from "framer-motion"

interface AlertMessageProps extends AlertProps {
  message: string | Error | { message: string }
}

export function AlertMessage({ message, severity = "error", ...props }: AlertMessageProps) {
  if (!message) return null

  const displayMessage = typeof message === 'string' 
    ? message 
    : message instanceof Error 
      ? message.message 
      : message.message

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Alert
          severity={severity}
          sx={{
            mb: 2,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
          {...props}
        >
          {displayMessage}
        </Alert>
      </motion.div>
    </AnimatePresence>
  )
}
