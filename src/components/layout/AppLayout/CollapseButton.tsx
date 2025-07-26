import "./AppLayout.less";

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
      className="collapse-btn"
      aria-label="left"
      role="image"
    >
      {children}
    </button>
  );
}

export { CollapseButton };
