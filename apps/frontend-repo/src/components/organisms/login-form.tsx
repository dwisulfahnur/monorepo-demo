"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Box, Grid, Divider } from "@mui/material"
import { Email as EmailIcon } from "@mui/icons-material"
import { Button } from "@/components/atoms/button"
import { FormField } from "@/components/molecules/form-field"
import { PasswordField } from "@/components/molecules/password-field"
import { AlertMessage } from "@/components/molecules/alert-message"
import { GoogleButton } from "@/components/molecules/google-button"
import { Text } from "@/components/atoms/typography"
import { useAuthStore, useThemeStore } from "@/store/hooks"
import { store } from "@/store"
import authActions from "@/store/actions/authActions"
import { resetAuthState } from "@/store/slices/authSlice"

export function LoginForm() {
  const router = useRouter()
  const { isDark } = useThemeStore()
  const { emailLogin, googleLogin, error } = useAuthStore()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    if (emailLogin.isSuccess || googleLogin.isSuccess) {
      // Add a small delay to show the success message
      setTimeout(() => {
        router.replace('/');
        // Clear the login state after redirect
        store.dispatch(resetAuthState());
      }, 1000);
    }
  }, [emailLogin.isSuccess, googleLogin.isSuccess, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleEmailLogin = async () => {
    store.dispatch(authActions.emailLoginThunk({
      email: formData.email,
      password: formData.password,
    }))
  }

  const handleGoogleLogin = async () => {
    store.dispatch(authActions.googleLoginThunk())
  }

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    handleEmailLogin()
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <AnimatePresence>
        {error && <AlertMessage message={error} severity="error" />}
        {(emailLogin.isSuccess || googleLogin.isSuccess) && (
          <AlertMessage
            message="Login successful! Redirecting..."
            severity="success"
          />
        )}
      </AnimatePresence>

      <motion.div variants={formVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <FormField
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            required
            startIcon={<EmailIcon color="action" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <PasswordField
            id="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              background: isDark
                ? "linear-gradient(90deg, #3D1A54 0%, #EC4899 100%)"
                : "linear-gradient(90deg, #6366F1 0%, #EC4899 100%)",
              "&:hover": {
                background: isDark
                  ? "linear-gradient(90deg, #2E1341 0%, #DB2777 100%)"
                  : "linear-gradient(90deg, #4F46E5 0%, #DB2777 100%)",
              },
              transition: "background 0.3s ease",
            }}
            isLoading={emailLogin.isLoading}
            onClick={() => handleSubmit()}
          >
            Sign In
          </Button>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Box sx={{ my: 3, position: "relative" }}>
            <Divider>
              <Text
                variant="body2"
                color="text.secondary"
                sx={{
                  px: 1,
                  backgroundColor: "transparent",
                  position: "relative",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
              >
                OR
              </Text>
            </Divider>
          </Box>
        </motion.div>

        <motion.div variants={itemVariants}>
          <GoogleButton
            onClick={handleGoogleLogin}
            isLoading={googleLogin.isLoading}
          />
        </motion.div>
      </motion.div>
    </Box>
  )
}
