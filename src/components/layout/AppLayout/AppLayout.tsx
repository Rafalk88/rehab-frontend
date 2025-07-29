import { TopNav } from "@/components/layout/TopNav";
import { CollapseButton } from "./CollapseButton";
import { Logo } from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useState } from "react";
import { useRouter } from "next/router";
import { Layout, Menu } from "antd";

import {
  DesktopOutlined,
  EuroCircleOutlined,
  ReadOutlined,
  FundOutlined,
  TeamOutlined,
  LayoutOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  BellOutlined,
} from "@ant-design/icons";

import type { MenuProps } from "antd";

import styles from "./AppLayout.module.less";

const { Content, Sider } = Layout;

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
      getItem("Rejestracja", "/registration", <ReadOutlined />),
      getItem("Gabinet", "/gabinet", <DesktopOutlined />),
      getItem("Pacjenci", "/patients", <TeamOutlined />),
      getItem("Statystyka", "/statistic", <FundOutlined />),
      getItem("Rozliczenia", "/settlements", <EuroCircleOutlined />),
    ],
  },
  {
    key: "h&s",
    label: "Pomoc & ustawienia",
    type: "group",
    children: [
      getItem("Pomoc & Centrum", "/help-center", <QuestionCircleOutlined />),
      getItem("Ustawienia", "/settings", <SettingOutlined />),
      getItem("Zgłoś błąd", "/report", <BellOutlined />),
    ],
  },
];

function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  return (
    <Layout className={styles["own-root"]}>
      <Sider
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        aria-label="Sidebar"
      >
        <CollapseButton collapsed={collapsed} setCollapsed={setCollapsed}>
          <LayoutOutlined />
        </CollapseButton>
        <div className={styles["own-menu-content-wrapper"]}>
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
        <TopNav />
        <Content className={styles["own-main-content"]}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export { AppLayout };
