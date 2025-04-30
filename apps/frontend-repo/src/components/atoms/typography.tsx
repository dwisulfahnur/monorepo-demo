"use client"

import { Typography as MuiTypography, type TypographyProps } from "@mui/material"

export function Heading({ children, ...props }: TypographyProps) {
  return (
    <MuiTypography component="h1" variant="h5" align="center" gutterBottom {...props}>
      {children}
    </MuiTypography>
  )
}

export function Subheading({ children, ...props }: TypographyProps) {
  return (
    <MuiTypography variant="body2" color="text.secondary" align="center" {...props}>
      {children}
    </MuiTypography>
  )
}

export function Text({ children, ...props }: TypographyProps) {
  return (
    <MuiTypography variant="body1" {...props}>
      {children}
    </MuiTypography>
  )
}
