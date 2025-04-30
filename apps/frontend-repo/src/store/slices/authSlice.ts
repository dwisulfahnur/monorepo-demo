import { User } from "firebase/auth"
import { createSlice } from "@reduxjs/toolkit";
import authActions from "@/store/actions/authActions";

type LoginState = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: string | null;
};

type AuthState = {
  user: User | null;
  emailLogin: LoginState;
  googleLogin: LoginState;
  signOut: LoginState;
};

const initialLoginState: LoginState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null,
};

const initialState: AuthState = {
  user: null,
  emailLogin: initialLoginState,
  googleLogin: initialLoginState,
  signOut: initialLoginState,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.emailLogin = initialLoginState;
      state.googleLogin = initialLoginState;
      state.signOut = initialLoginState;
    },
    resetAuthState: (state) => {
      state.emailLogin = initialLoginState;
      state.googleLogin = initialLoginState;
      state.signOut = initialLoginState;
    },
  },
  extraReducers: (builder) => {
    // Email Login
    builder
      .addCase(authActions.emailLoginThunk.pending, (state) => {
        state.emailLogin = {
          ...initialLoginState,
          isLoading: true,
        };
      })
      .addCase(authActions.emailLoginThunk.fulfilled, (state, action) => {
        state.emailLogin = {
          ...initialLoginState,
          isSuccess: true,
        };
        state.user = action.payload;
      })
      .addCase(authActions.emailLoginThunk.rejected, (state, action) => {
        console.log(action.payload)
        state.emailLogin = {
          ...initialLoginState,
          isError: true,
          error: action.payload as string || 'Failed to login with email',
        };
      })

      // Google Login
      .addCase(authActions.googleLoginThunk.pending, (state) => {
        state.googleLogin = {
          ...initialLoginState,
          isLoading: true,
        };
      })
      .addCase(authActions.googleLoginThunk.fulfilled, (state, action) => {
        state.googleLogin = {
          ...initialLoginState,
          isSuccess: true,
        };
        state.user = action.payload;
      })
      .addCase(authActions.googleLoginThunk.rejected, (state, action) => {
        console.log(action.payload)
        state.googleLogin = {
          ...initialLoginState,
          isError: true,
          error: action.payload as string || 'Failed to login with Google',
        };
      })

      // Sign Out
      .addCase(authActions.signOutThunk.pending, (state) => {
        state.signOut = {
          ...initialLoginState,
          isLoading: true,
        };
      })
      .addCase(authActions.signOutThunk.fulfilled, (state) => {
        state.signOut = {
          ...initialLoginState,
          isSuccess: true,
        };
        state.user = null;
      })
      .addCase(authActions.signOutThunk.rejected, (state, action) => {
        console.log(action.payload)
        state.signOut = {
          ...initialLoginState,
          isError: true,
          error: action.payload as string || 'Failed to sign out',
        };
      });
  },
});

export const { setUser, clearUser, resetAuthState } = authSlice.actions;
export default authSlice.reducer; 
