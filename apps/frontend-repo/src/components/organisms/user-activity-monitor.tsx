import { useEffect, useRef } from "react";
import { store } from "@/store";
import { useUserStore } from "@/store/hooks"
import userActions from "@/store/actions/userActions";

export default function UserActivityMonitor() {
  const { userData } = useUserStore()
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastRecentlyActive = userData?.recentlyActive ?? 0

  const maybeUpdateRecentlyActive = () => {
    const now = Math.floor(Date.now() / 1000);
    if (
      lastRecentlyActive === 0 ||
      now - lastRecentlyActive > 60 // 1 minute in seconds
    ) {
      store.dispatch(userActions.updateUserDataThunk({}));
    }
  };

  const startActivityInterval = () => {
    maybeUpdateRecentlyActive(); // Execute once immediately
    intervalRef.current = setInterval(maybeUpdateRecentlyActive, 60000);
  };

  const stopActivityInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (document.visibilityState === 'visible') {
      startActivityInterval();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        startActivityInterval();
      } else {
        stopActivityInterval();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      stopActivityInterval();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
}
