import { Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress } from "@mui/material"
import { FormEvent, useEffect, useState } from "react"
import { store } from "@/store"
import { useUserStore, useThemeStore } from "@/store/hooks"
import { AlertMessage } from "@/components/molecules/alert-message"
import userActions from "@/store/actions/userActions"

interface UserDataUpdateFormProps {
  open: boolean
  onClose: () => void
  initialData?: {
    totalAverageWeightRatings?: string
    numberOfRents?: string
  }
}

export function UserDataUpdateForm({ open, onClose, initialData }: UserDataUpdateFormProps) {
  const { isDark } = useThemeStore()
  const { updateUserState } = useUserStore()
  const [formData, setFormData] = useState({
    numberOfRents: "",
    totalAverageWeightRatings: "",
  })

  useEffect(() => {
    if (!!initialData) {
      setFormData({
        totalAverageWeightRatings: initialData.totalAverageWeightRatings ?? "",
        numberOfRents: initialData.numberOfRents ?? "",
      })
    }
  }, [initialData])

  useEffect(() => {
    if (updateUserState.isSuccess) {
      onClose()
    }
  }, [updateUserState.isSuccess])

  // Reset form when dialog is closed
  useEffect(() => {
    if (!open) {
      setFormData({ numberOfRents: '', totalAverageWeightRatings: '' })
    }
  }, [open])

  const handleUpdateUserData = (e?: FormEvent) => {
    if (e) e.preventDefault()
    const updatedData = {
      numberOfRents: Number(formData.numberOfRents),
      totalAverageWeightRatings: Number(formData.totalAverageWeightRatings),
      recentlyActive: Math.floor((new Date()).getTime() / 1000),
    }
    store.dispatch(userActions.updateUserDataThunk(updatedData))
  }

  // Close dialog only on success or cancel
  const handleClose = () => {
    if (!updateUserState.isLoading) {
      onClose()
    }
  }

  return (
    <Dialog
      component={"form"}
      onSubmit={handleUpdateUserData}
      open={open}
      onClose={handleClose}
      fullWidth
      disableEscapeKeyDown={updateUserState.isLoading}
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
        Update User Data
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 4 }}>
          {updateUserState.isError && (
            <AlertMessage
              message={updateUserState.error || "Failed to update user data"}
              severity="error"
            />
          )}
          <TextField
            label="Average Weight Ratings"
            type="number"
            value={formData.totalAverageWeightRatings}
            onChange={(e) => setFormData({ ...formData, totalAverageWeightRatings: e.target.value })}
            fullWidth
            disabled={updateUserState.isLoading}
          />
          <TextField
            label="Number of Rents"
            type="number"
            value={formData.numberOfRents}
            onChange={(e) => setFormData({ ...formData, numberOfRents: e.target.value })}
            fullWidth
            disabled={updateUserState.isLoading}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          disabled={updateUserState.isLoading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpdateUserData}
          variant="contained"
          disabled={updateUserState.isLoading}
        >
          {updateUserState.isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Update"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )
} 