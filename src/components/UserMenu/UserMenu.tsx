import { LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Avatar } from "antd";
import "./UserMenu.less";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: (
      <>
        <span>Rafał</span>
        <span>Wyloguj za 54m</span>
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

function UserMenu() {
  return <Menu className="own-menu-user" mode="horizontal" items={items} />;
}

export { UserMenu };
