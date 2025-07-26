import { Space, Switch } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

import "./ThemeSwitcher.less";

function ThemeSwitcher({ collapsed }: { collapsed: boolean }) {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div className="theme-switch-container">
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
