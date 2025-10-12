import { LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Avatar } from "antd";
import styles from "./UserMenu.module.less";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

type MenuItem = Required<MenuProps>["items"][number];

function UserMenu({ logoutTime }: { logoutTime: number }) {
  const router = useRouter();
  const items: MenuItem[] = [
    {
      label: (
        <>
          <span>Rafał</span>
          <span>Wylogowanie za {logoutTime}m</span>
        </>
      ),
      key: "user-menu",
      icon: <Avatar icon={"RK"} />,
      children: [
        {
          label: "Wyloguj",
          key: "logout",
          icon: <LogoutOutlined />,
          danger: true,
        },
      ],
    },
  ];

  const logout: MenuProps["onClick"] = async () => {
    const refresh_token = Cookies.get("refresh_token");
    if (!refresh_token) return;

    await api.post("/auth/logout", { refreshToken: refresh_token });
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");

    router.push("/login");
  };

  return (
    <Menu
      className={styles["own-menu-user"]}
      onClick={logout}
      mode="horizontal"
      items={items}
      selectedKeys={[]} // it will deactivate selected key after click
    />
  );
}

export { UserMenu };
