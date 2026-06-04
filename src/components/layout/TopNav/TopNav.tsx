import { UserMenu } from "@/components/UserMenu";
import { UnitSelector } from "@/components/UnitSelector";
import { SearchBar } from "@/components/SearchBar";
import { ApiConnectionIcon } from "./ApiConnectionIcon";
import { Divider, SystemIcon } from "@/components/ui";
import { Col, Row } from "antd";
import { Layout } from "antd";
import {
  AppstoreOutlined,
  BellOutlined,
  InboxOutlined,
} from "@ant-design/icons";

import styles from "./TopNav.module.less";

const { Header } = Layout;

function TopNav() {
  const handleClickNotofications = () => {
    console.log("click notyfikacje");
  };
  const handleClickMessages = () => {
    console.log("click wiadomości");
  };

  return (
    <Header className={styles["own-layout-header"]}>
      <Row justify="center" align="middle">
        <Col className={styles["own-col"]} flex="20%">
          <UnitSelector />
        </Col>
        <Col className={styles["own-col"]} flex="35%">
          <SearchBar />
        </Col>
        <Col className={styles["own-col"]} flex="23%">
          <ApiConnectionIcon />
          <SystemIcon
            icon={<AppstoreOutlined />}
            label="Tryb nagły"
            data-pulse={false.toString()}
            data-disabled={false.toString()}
          />
          <SystemIcon
            icon={<BellOutlined />}
            label="Notyfikacje"
            badgeCount={4}
            onClick={handleClickNotofications}
            data-disabled={false.toString()}
          />
          <SystemIcon
            icon={<InboxOutlined />}
            label="Wiadomości"
            badgeCount={10}
            onClick={handleClickMessages}
            data-disabled={false.toString()}
          />
        </Col>
        <Divider />
        <Col className={styles["own-col"]} flex="auto">
          <UserMenu logoutTime={54} />
        </Col>
      </Row>
    </Header>
  );
}

export { TopNav };
