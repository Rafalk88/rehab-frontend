import { useState } from "react";
import { useRouter } from "next/router";
import { Layout, Menu } from "antd";
import { CollapseButton } from "./CollapseButton";
import { Logo } from "./Logo";
import "./AppLayout.less";

import {
  DesktopOutlined,
  EuroCircleOutlined,
  ReconciliationOutlined,
  FundOutlined,
  UserOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { ThemeSwitcher } from "./ThemeSwitcher";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  {
    key: "modules",
    label: "Moduły",
    type: "group",
    children: [
      getItem("Rejestracja", "/registration", <ReconciliationOutlined />),
      getItem("Gabinet", "/gabinet", <DesktopOutlined />),
      getItem("Pacjenci", "/patients", <UserOutlined />),
      getItem("Statystyka", "/statistic", <FundOutlined />),
      getItem("Rozliczenia", "/settlements", <EuroCircleOutlined />),
    ],
  },
];

function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  return (
    <Layout className="root">
      <Sider
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        aria-label="Sidebar"
      >
        <CollapseButton collapsed={collapsed} setCollapsed={setCollapsed}>
          {collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
        </CollapseButton>
        <div className="menu-content-wrapper">
          <Logo collapsed={collapsed} />
          <Menu
            theme="light"
            selectedKeys={[router.pathname]}
            mode="inline"
            items={items}
            onClick={(key) => router.push(String(key))}
          />
        </div>
        <ThemeSwitcher collapsed={collapsed} />
      </Sider>
      <Layout>
        <Header className="header" />
        <Content className="main-content">{children}</Content>
      </Layout>
    </Layout>
  );
}

export { AppLayout };
