import { Tooltip } from "antd";
import Link from "next/link";
import Image from "next/image";

import styles from "./Logo.module.less";

function Logo({ collapsed }: { collapsed: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Logo - homepage button"
      className={styles["own-logo"]}
    >
      <Tooltip title="Home">
        {!collapsed ? (
          <Image src="/logo.png" alt="Logo" width={160} height={60} />
        ) : (
          <Image src="/logo-icon.png" alt="Logo" width={60} height={60} />
        )}
      </Tooltip>
    </Link>
  );
}

export { Logo };
