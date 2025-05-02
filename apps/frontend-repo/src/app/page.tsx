"use client";

import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { UserProfile } from "@/components/organisms/user-profile";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { store } from "@/store";
import { setUser } from "@/store/slices/authSlice";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress"
import HomeTemplate from "@/components/templates/home-template";

export default function Home() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user_) => {
      if (user_) {
        store.dispatch(setUser(user_))
        setIsLoading(false)
      } else {
        router.replace('/signin')
      }
    })
    return () => unSubscribe()
  }, [])

  const cardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  if (isLoading) {
    return (
      <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress size={40} />
      </Box>
    )
  }

  return (
    <HomeTemplate>
      {user ? (
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          <UserProfile user={user} />
        </motion.div>
      ) : <CircularProgress size={40} />}
    </HomeTemplate>
  );
}
