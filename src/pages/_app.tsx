import "@/styles/globals.less";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import theme from "@/theme/themeConfig";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    const token = Cookies.get("access_token");

    const publicPages = ["/login"];

    if (!token && !publicPages.includes(router.pathname)) {
      console.log("replace");
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return null;

  return (
    <ConfigProvider theme={theme}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
