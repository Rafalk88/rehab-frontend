import style from "./CollapseButton.module.less";

function CollapseButton({
  collapsed,
  setCollapsed,
  children,
}: {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={() => setCollapsed(!collapsed)}
      className={style["own-collapse-btn"]}
      aria-label={!collapsed ? "left" : "right"}
    >
      {children}
    </button>
  );
}

export { CollapseButton };
