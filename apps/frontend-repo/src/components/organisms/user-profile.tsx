"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Box, CircularProgress } from "@mui/material"
import { User } from "firebase/auth"
import { useUserStore, useThemeStore, useAuthStore } from "@/store/hooks"
import { store } from "@/store"
import authActions from "@/store/actions/authActions"
import userActions from "@/store/actions/userActions"

import { UserProfileHeader } from "@/components/molecules/user-profile-header"
import { UserInfoCard } from "@/components/molecules/user-info-card"
import { UserDataActions } from "@/components/molecules/user-data-actions"
import { SignOutButton } from "@/components/molecules/sign-out-button"
import { UserDataUpdateForm } from "@/components/organisms/user-data-update-form"
import { ConfirmDialog } from "@/components/molecules/confirm-dialog"
import { AlertMessage } from "@/components/molecules/alert-message"

export function UserProfile({ user }: { user: User }) {
  const router = useRouter()
  const { isDark } = useThemeStore()
  const { userData, fetchUserState, updateUserState } = useUserStore()
  const { signOut } = useAuthStore()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)

  const loadUserInfo = () => {
    store.dispatch(userActions.fetchUserDataThunk())
  }

  const handleSignOut = async () => {
    try {
      await store.dispatch(authActions.signOutThunk())
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  useEffect(() => {
    if (signOut.isSuccess) router.replace('/signin')
  }, [signOut.isSuccess])

  return (
    <Box sx={{ textAlign: "center" }}>
      <UserProfileHeader user={user} />
      <UserDataActions
        onLoadUserInfo={loadUserInfo}
        onOpenUpdateDialog={() => setIsUpdateDialogOpen(true)}
        isLoading={fetchUserState.isLoading}
      />

      {fetchUserState.isLoading ? (
        <Box sx={{ mb: 4 }}>
          <CircularProgress />
        </Box>
      ) : fetchUserState.isError ? (
        <AlertMessage
          message={fetchUserState.error || "Failed to fetch user info"}
          severity="error"
        />
      ) : fetchUserState.isSuccess && !userData ? (
        <AlertMessage
          message={"There is no user info yet"}
          severity="info"
        />
      ) : fetchUserState.isSuccess && userData ? (
        <UserInfoCard {...userData} />
      ) : null}

      {updateUserState.isLoading && (
        <AlertMessage
          message="Updating user data..."
          severity="info"
        />
      )}
      {updateUserState.isError && (
        <AlertMessage
          message={updateUserState.error || "Failed to update user data"}
          severity="error"
        />
      )}

      <Box sx={{ mt: 4 }}>
        <SignOutButton
          onClick={() => setIsDialogOpen(true)}
          isDark={isDark}
          isLoading={signOut.isLoading}
        />
      </Box>

      <UserDataUpdateForm
        open={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
        initialData={userData ? {
          totalAverageWeightRatings: userData?.totalAverageWeightRatings?.toString(),
          numberOfRents: userData?.numberOfRents?.toString(),
        } : undefined}
      />

      <ConfirmDialog
        open={isDialogOpen}
        title="Sign Out"
        message="Are you sure you want to sign out of your account?"
        confirmText="Sign Out"
        cancelText="Cancel"
        isLoading={signOut.isLoading}
        onConfirm={handleSignOut}
        onCancel={() => setIsDialogOpen(false)}
      />
    </Box>
  )
}
