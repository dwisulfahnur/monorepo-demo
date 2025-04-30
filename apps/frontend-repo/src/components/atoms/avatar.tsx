"use client"

import MuiAvatar, { type AvatarProps as MuiAvatarProps } from "@mui/material/Avatar"
import { useThemeStore } from "@/store/hooks"

interface AvatarProps extends MuiAvatarProps {
  name?: string
  src?: string
  size?: "small" | "medium" | "large" | "xlarge"
}

export function Avatar({ name, src, size = "medium", ...props }: AvatarProps) {
  const {isDark} = useThemeStore()

  // Get initials from name
  const getInitials = (name?: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Size mapping
  const sizeMap = {
    small: { width: 40, height: 40, fontSize: "1rem" },
    medium: { width: 64, height: 64, fontSize: "1.5rem" },
    large: { width: 96, height: 96, fontSize: "2rem" },
    xlarge: { width: 128, height: 128, fontSize: "2.5rem" },
  }

  const { width, height, fontSize } = sizeMap[size]

  return (
    <MuiAvatar
      src={src}
      alt={name || "User"}
      sx={{
        width,
        height,
        fontSize,
        fontWeight: 600,
        bgcolor: isDark ? "secondary.main" : "primary.main",
        color: "white",
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
        border: "4px solid",
        borderColor: isDark ? "rgba(30, 30, 30, 0.95)" : "rgba(255, 255, 255, 0.95)",
        ...props.sx,
      }}
      {...props}
    >
      {!src && getInitials(name)}
    </MuiAvatar>
  )
}
