import { Box, Button } from "@mui/material"
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';

interface UserDataActionsProps {
  onLoadUserInfo: () => void
  onOpenUpdateDialog: () => void
  isLoading: boolean
}

export function UserDataActions({
  onLoadUserInfo,
  onOpenUpdateDialog,
  isLoading
}: UserDataActionsProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 4 }}>
      <Button
        variant="contained"
        startIcon={<RefreshIcon />}
        onClick={onLoadUserInfo}
        disabled={isLoading}
      >
        Load User Info
      </Button>
      <Button
        variant="outlined"
        startIcon={<EditIcon />}
        onClick={onOpenUpdateDialog}
      >
        Update User Data
      </Button>
    </Box>
  )
} 