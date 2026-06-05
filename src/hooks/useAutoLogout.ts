import api from "@/lib/api";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const AUTO_LOGOUT_TIME_BY_15_MIN = 15 * 60 * 1000;

export function useAutoLogout() {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout>(null);
  const remainingTimeIntervalRef = useRef<NodeJS.Timeout>(null);
  const lastResetTime = useRef(0);
  const [remainingTime, setRemainingTime] = useState(() => AUTO_LOGOUT_TIME_BY_15_MIN);

  const startTimer = () => {
    timerRef.current = setTimeout(async () => {
      const refresh_token = Cookies.get("refresh_token");
      if (!refresh_token) return;

      await api.post("/auth/logout", { refreshToken: refresh_token });
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      router.push("/login");
    }, AUTO_LOGOUT_TIME_BY_15_MIN);

    lastResetTime.current = Date.now();

    remainingTimeIntervalRef.current = setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, 1000);
  }

  const getRemainingTime = () => {
    const result = AUTO_LOGOUT_TIME_BY_15_MIN - (Date.now() - lastResetTime.current);
    const resultToMinutes = Math.floor(result / 1000 / 60);
    return Math.max(0, resultToMinutes);
  };

  useEffect(() => {
    startTimer();

    const resetTimer = () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        if (remainingTimeIntervalRef.current) {
          clearInterval(remainingTimeIntervalRef.current);
        }
        startTimer();
    };

    window.addEventListener('keyup', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);

    return () => {
        window.removeEventListener('keyup', resetTimer);
        window.removeEventListener('keydown', resetTimer);
        window.removeEventListener('click', resetTimer);
        timerRef.current && clearTimeout(timerRef.current);
        remainingTimeIntervalRef.current && clearInterval(remainingTimeIntervalRef.current);
    };
  }, [router]);

  return remainingTime;
}