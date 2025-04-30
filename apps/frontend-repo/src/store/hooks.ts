import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// User specific hooks
export const useUserStore = () => {
  const userData = useAppSelector((state) => state.user.data)
  const fetchUserState = useAppSelector((state) => state.user.fetchUser)
  const updateUserState = useAppSelector((state) => state.user.updateUser)

  return {
    userData,
    fetchUserState,
    updateUserState,
    isLoading: fetchUserState.isLoading || updateUserState.isLoading,
    isError: fetchUserState.isError || updateUserState.isError,
    error: fetchUserState.error || updateUserState.error,
  }
}

// Theme specific hooks
export const useThemeStore = () => {
  const themeMode = useAppSelector((state) => state.theme.mode)
  const isDark = themeMode === 'dark'

  return {
    themeMode,
    isDark,
  }
}

// Auth specific hooks
export const useAuthStore = () => {
  const user = useAppSelector((state) => state.auth.user)
  const emailLogin = useAppSelector((state) => state.auth.emailLogin)
  const googleLogin = useAppSelector((state) => state.auth.googleLogin)
  const signOut = useAppSelector((state) => state.auth.signOut)

  return {
    user,
    emailLogin,
    googleLogin,
    signOut,
    isLoading: emailLogin.isLoading || googleLogin.isLoading || signOut.isLoading,
    isError: emailLogin.isError || googleLogin.isError || signOut.isError,
    error: emailLogin.error || googleLogin.error || signOut.error,
  }
} 