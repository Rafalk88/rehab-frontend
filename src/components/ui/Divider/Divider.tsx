import styles from "./Divider.module.less";

function Divider() {
  return (
    <span
      role="separator"
      aria-orientation="vertical"
      className={styles["own-divider"]}
    />
  );
}

export { Divider };
