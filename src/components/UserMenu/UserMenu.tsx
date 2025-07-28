import { LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Avatar } from "antd";
import "./UserMenu.less";

type MenuItem = Required<MenuProps>["items"][number];

function UserMenu({ logoutTime }: { logoutTime: string }) {
  const items: MenuItem[] = [
    {
      label: (
        <>
          <span>Rafał</span>
          <span>Wylogowanie za {logoutTime}</span>
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

  return <Menu className="own-menu-user" mode="horizontal" items={items} />;
}

export { UserMenu };
