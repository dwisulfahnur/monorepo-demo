"use client"

import { SocialButton } from "@/components/atoms/social-button"
import { Google as GoogleIcon } from "@mui/icons-material"

interface GoogleButtonProps {
  onClick: () => void
  isLoading?: boolean
}

export function GoogleButton({ onClick, isLoading = false }: GoogleButtonProps) {
  return (
    <SocialButton
      icon={<GoogleIcon sx={{ color: "#4285F4" }} />}
      provider="google"
      onClick={onClick}
      isLoading={isLoading}
      sx={{
        color: "rgba(0, 0, 0, 0.87)",
        borderColor: "rgba(0, 0, 0, 0.12)",
        backgroundColor: "white",
        "&:hover": {
          borderColor: "rgba(0, 0, 0, 0.25)",
          backgroundColor: "rgba(255, 255, 255, 0.88)",
        },
        transition: "all 0.2s ease-in-out",
      }}
    >
      Continue with Google
    </SocialButton>
  )
}
