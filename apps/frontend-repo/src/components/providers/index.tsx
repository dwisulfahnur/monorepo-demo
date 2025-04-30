"use client"

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/store"
import ThemeProvider from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ReduxProvider store={store}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
      </ReduxProvider>
    </AppRouterCacheProvider>
  )
}