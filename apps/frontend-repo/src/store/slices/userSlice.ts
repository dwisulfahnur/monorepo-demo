import { createSlice } from '@reduxjs/toolkit';
import { IUser } from "@packages/shared/types/user"
import userActions from '../actions/userActions';

type RequestState = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error?: string | null;
}

type UserState = {
  fetchUser: RequestState;
  updateUser: RequestState;
  data?: IUser;
}

const initialRequestState: RequestState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null
}

const initialState: UserState = {
  fetchUser: initialRequestState,
  updateUser: initialRequestState,
  data: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => { 
      state.data = action.payload 
    },
    clearUser: (state) => { 
      state.data = undefined;
      state.fetchUser = initialRequestState;
      state.updateUser = initialRequestState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Cases
      .addCase(userActions.fetchUserDataThunk.pending, (state) => {
        state.fetchUser = {
          isLoading: true,
          isError: false,
          isSuccess: false,
          error: null
        };
      })
      .addCase(userActions.fetchUserDataThunk.fulfilled, (state, action) => {
        state.fetchUser = {
          isLoading: false,
          isError: false,
          isSuccess: true,
          error: null
        };
        state.data = action.payload;
      })
      .addCase(userActions.fetchUserDataThunk.rejected, (state, action) => {
        state.fetchUser = {
          isLoading: false,
          isError: true,
          isSuccess: false,
          error: action.payload as string || 'Failed to fetch user data'
        };
      })

      // Update User Cases
      .addCase(userActions.updateUserDataThunk.pending, (state) => {
        state.updateUser = {
          isLoading: true,
          isError: false,
          isSuccess: false,
          error: null
        };
      })
      .addCase(userActions.updateUserDataThunk.fulfilled, (state, action) => {
        state.updateUser = {
          isLoading: false,
          isError: false,
          isSuccess: true,
          error: null
        };
        state.data = action.payload;
      })
      .addCase(userActions.updateUserDataThunk.rejected, (state, action) => {
        state.updateUser = {
          isLoading: false,
          isError: true,
          isSuccess: false,
          error: action.error.message || 'Failed to update user data'
        };
      });
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
