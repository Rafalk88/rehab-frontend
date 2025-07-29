import { Space, Switch } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

import styles from "./ThemeSwitcher.module.less";

function ThemeSwitcher({ collapsed }: { collapsed: boolean }) {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div className={styles["own-theme-switch-container"]}>
      {!collapsed ? (
        <>
          <span>Motyw</span>
          <Switch
            defaultChecked
            checkedChildren={<SunOutlined />}
            unCheckedChildren={<MoonOutlined />}
            onChange={onChange}
          />
        </>
      ) : (
        <Space direction="vertical">
          <Switch
            checkedChildren={<SunOutlined />}
            unCheckedChildren={<MoonOutlined />}
            defaultChecked
          />
        </Space>
      )}
    </div>
  );
}

export { ThemeSwitcher };
