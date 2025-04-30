import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, signInWithPopup, signOut, User } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

const authActions = {
  emailLoginThunk: createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
    'auth/emailLogin',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (error) {
        return rejectWithValue(error as string || 'Failed to login with email');
      }
    }
  ),

  googleLoginThunk: createAsyncThunk<User, void, { rejectValue: string }>(
    'auth/googleLogin',
    async (_, { rejectWithValue }) => {
      try {
        const userCredential = await signInWithPopup(auth, googleProvider);
        return userCredential.user;
      } catch (error) {
        return rejectWithValue(error as string || 'Failed to login with Google');
      }
    }
  ),

  signOutThunk: createAsyncThunk<void, void, { rejectValue: string }>(
    'auth/signOut',
    async (_, { rejectWithValue }) => {
      try {
        await signOut(auth);
      } catch (error) {
        return rejectWithValue(error as string || 'Failed to sign out');
      }
    }
  ),
};

export default authActions;