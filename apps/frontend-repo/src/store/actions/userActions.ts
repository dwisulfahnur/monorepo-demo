import { createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '@/apis/userApi';
import { IUser } from '@packages/shared/types/user';

const authActions = {
  fetchUserDataThunk: createAsyncThunk(
    'user/fetchUserData',
    async (_, { rejectWithValue }) => {
      try {
        const data = await userApi.fetchUserData();
        return data
      } catch (error) {
        return rejectWithValue(error)
      }
    }
  ),
  updateUserDataThunk: createAsyncThunk(
    'user/updateUserData',
    async (payload: IUser, { rejectWithValue }) => {
      try {
        const data = await userApi.updateUserData(payload);
        return data
      } catch (error) {
        return rejectWithValue(error)
      }
    }
  )
}


export default authActions;

