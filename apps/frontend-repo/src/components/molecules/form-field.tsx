"use client"

import type React from "react"

import { TextField } from "@/components/atoms/text-field"
import type { ReactNode } from "react"

interface FormFieldProps {
  id: string
  label: string
  type?: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  autoComplete?: string
  autoFocus?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export function FormField({
  id,
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  autoComplete,
  autoFocus = false,
  startIcon,
  endIcon,
}: FormFieldProps) {
  return (
    <TextField
      id={id}
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      startIcon={startIcon}
      endIcon={endIcon}
    />
  )
}
