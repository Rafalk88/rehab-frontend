import axios from "axios";
import Cookies from "js-cookie";

export const refreshToken = async () => {
  const refresh_token = Cookies.get("refresh_token");
  if (!refresh_token) return;

  try {
    const res = await axios.post("/auth/refresh-token", {
      refreshToken: refresh_token,
    });
    const { access_token, refresh_token: new_refresh } = res.data;

    Cookies.set("access_token", access_token, {
      secure: true,
      sameSite: "strict",
    });
    Cookies.set("refresh_token", new_refresh, {
      secure: true,
      sameSite: "strict",
    });

    return access_token;
  } catch (err) {
    console.error("Refresh token error", err);
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    window.location.href = '/login';
  }
};
