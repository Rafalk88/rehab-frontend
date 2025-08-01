import { LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Avatar } from "antd";
import styles from "./UserMenu.module.less";

type MenuItem = Required<MenuProps>["items"][number];

function UserMenu({ logoutTime }: { logoutTime: number }) {
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

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
      className={styles["own-menu-user"]}
      onClick={onClick}
      mode="horizontal"
      items={items}
    />
  );
}

export { UserMenu };
