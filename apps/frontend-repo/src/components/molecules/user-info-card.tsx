"use client"

import { useThemeStore } from "@/store/hooks"
import { Box, Typography, Divider, Tooltip } from "@mui/material"
import { IUser } from "@packages/shared/types/user"
import { motion } from "framer-motion"
import TimeAgo from 'react-timeago'


export function UserInfoCard({ totalAverageWeightRatings, numberOfRents, recentlyActive }: IUser) {
  const { isDark } = useThemeStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.06)",
          boxShadow: isDark ? "0 4px 20px rgba(0, 0, 0, 0.2)" : "0 4px 20px rgba(0, 0, 0, 0.05)",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
          mb: 3,
        }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          User Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Average Weight Ratings
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {totalAverageWeightRatings}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Number of Rents
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {numberOfRents}
            </Typography>
          </Box>
          {recentlyActive && (

            <Box>
              <Typography variant="body2" color="text.secondary">
                Recently Active
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                <Tooltip title={new Date(recentlyActive * 1000).toLocaleString()} placement="right" arrow>
                  <TimeAgo date={recentlyActive * 1000} />
                </Tooltip>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </motion.div>
  )
}
