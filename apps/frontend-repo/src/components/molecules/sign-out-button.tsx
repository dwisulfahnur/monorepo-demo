import { Button } from "@/components/atoms/button"
import LogoutIcon from '@mui/icons-material/Logout';
import { motion } from "framer-motion"

interface SignOutButtonProps {
  onClick: () => void
  isDark: boolean
  isLoading?: boolean
}

export function SignOutButton({ onClick, isDark, isLoading = false }: SignOutButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Button
        variant="outlined"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={onClick}
        sx={{
          borderRadius: 2,
          py: 1.2,
          px: 3,
          borderWidth: 2,
          borderColor: "error.main",
          "&:hover": {
            borderWidth: 2,
            backgroundColor: isDark ? "rgba(239, 68, 68, 0.1)" : "rgba(239, 68, 68, 0.05)",
          },
          transition: "all 0.2s ease",
        }}
        isLoading={isLoading}
      >
        Sign Out
      </Button>
    </motion.div>
  )
} 