import { Badge, Tooltip, Button } from "antd";
import "./SystemIcon.less";

type Props = {
  icon: React.JSX.Element;
  label: string;
  onClick?: () => void;
  badgeCount?: number | string;
};

function SystemIcon({ icon, label, onClick, badgeCount, ...restProps }: Props) {
  const content = onClick ? (
    <Badge
      count={badgeCount}
      offset={[4, 0]}
      overflowCount={9}
      className="own-badge"
    >
      <Button
        variant="link"
        color="default"
        aria-label={label}
        onClick={onClick}
        className="own-badge-item"
        {...restProps}
      >
        {icon}
      </Button>
    </Badge>
  ) : (
    <Badge
      count={badgeCount}
      offset={[4, 0]}
      overflowCount={9}
      className="own-badge"
    >
      <span
        aria-label={label}
        role="img"
        className="own-badge-item"
        {...restProps}
      >
        {icon}
      </span>
    </Badge>
  );

  return <Tooltip title={label}>{content}</Tooltip>;
}

export { SystemIcon };
