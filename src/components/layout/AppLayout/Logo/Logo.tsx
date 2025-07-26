import Link from "next/link";
import Image from "next/image";

import "./Logo.less";

function Logo({ collapsed }: { collapsed: boolean }) {
  return (
    <Link href="/" aria-label="Logo - homepage button" className="logo">
      {!collapsed ? (
        <Image src="/logo.png" alt="Logo" width={160} height={60} />
      ) : (
        <Image src="/logo-icon.png" alt="Logo" width={60} height={60} />
      )}
    </Link>
  );
}

export { Logo };
