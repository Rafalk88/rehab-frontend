import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  components: {
    Button: {
      colorPrimary: "#3eb2ff",
      colorPrimaryBgHover: "#269bdb",
      colorPrimaryBorder: "#d8f0ff",
    },
    Menu: {
      itemBorderRadius: 0,
      itemHoverBg: "#d8f0ff",
      itemSelectedBg: "#d8f0ff",
      itemMarginInline: 0,
    },
  },
};

export default theme;
