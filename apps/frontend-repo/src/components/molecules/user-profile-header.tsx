import { Box, Typography } from "@mui/material"
import { motion } from "framer-motion"
import { Avatar } from "@/components/atoms/avatar"
import { User } from "firebase/auth"

interface UserProfileHeaderProps {
  user: User
}

export function UserProfileHeader({ user }: UserProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Avatar name={user.displayName || undefined} src={user.photoURL || undefined} size="large" />
        <Typography variant="h5" sx={{ mt: 2, fontWeight: 600 }}>
          {user.displayName ?? undefined}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {user.email}
        </Typography>
      </Box>
    </motion.div>
  )
} 