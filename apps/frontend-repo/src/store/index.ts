import { combineReducers, configureStore } from "@reduxjs/toolkit"
import themeReducer from "./slices/themeSlice"
import userReducer from "./slices/userSlice"
import authReducer from "./slices/authSlice"

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
