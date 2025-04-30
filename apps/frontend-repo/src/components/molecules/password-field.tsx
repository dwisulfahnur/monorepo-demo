"use client"

import type React from "react"

import { useState } from "react"
import { IconButton } from "@mui/material"
import { Visibility, VisibilityOff, Lock as LockIcon } from "@mui/icons-material"
import { FormField } from "@/components/molecules/form-field"

interface PasswordFieldProps {
  id: string
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  autoComplete?: string
}

export function PasswordField({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  autoComplete = "current-password",
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const visibilityIcon = (
    <IconButton aria-label="toggle password visibility" onClick={togglePasswordVisibility} edge="end">
      {showPassword ? <VisibilityOff /> : <Visibility />}
    </IconButton>
  )

  return (
    <FormField
      id={id}
      label={label}
      type={showPassword ? "text" : "password"}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      autoComplete={autoComplete}
      startIcon={<LockIcon color="action" />}
      endIcon={visibilityIcon}
    />
  )
}
