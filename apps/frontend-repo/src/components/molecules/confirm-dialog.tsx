"use client"

import { useThemeStore } from "@/store/hooks"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  type DialogProps,
  CircularProgress,
  Box,
} from "@mui/material"

interface ConfirmDialogProps extends Omit<DialogProps, "onClose"> {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  isLoading: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading,
  onConfirm,
  onCancel,
  ...props
}: ConfirmDialogProps) {
  const { isDark } = useThemeStore()

  return (
    <Dialog
      {...props}
      onClose={onCancel}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            overflow: "hidden",
          }
        }
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 600,
          background: isDark
            ? "linear-gradient(90deg, #3D1A54 0%, #EC4899 100%)"
            : "linear-gradient(90deg, #6366F1 0%, #EC4899 100%)",
          color: "white",
          py: 1.4,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <DialogContentText>{message}</DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          disabled={isLoading}
          onClick={onCancel}
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 3,
            borderColor: isDark ? "rgba(255, 255, 255, 0.23)" : "rgba(0, 0, 0, 0.23)",
            color: isDark ? "white" : "inherit",
          }}
        >
          {cancelText}
        </Button>
        <Button
          disabled={isLoading}
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{
            borderRadius: 2,
            px: 3,
            boxShadow: "0 4px 14px rgba(239, 68, 68, 0.4)",
          }}
          autoFocus
        >
          {isLoading ? <CircularProgress size={24} /> : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
