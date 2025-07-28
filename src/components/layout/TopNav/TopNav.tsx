import { UnitSelector } from "@/components/UnitSelector";
import { SearchBar } from "@/components/SearchBar";
import { Divider } from "@/components/ui";
import { Col, Row } from "antd";
import { Layout } from "antd";

import "./TopNav.less";

const { Header } = Layout;

function TopNav() {
  return (
    <Header className="own-layout-header">
      <Row justify="center" align="middle">
        <Col className="own-col" flex="20%">
          <UnitSelector />
        </Col>
        <Col className="own-col" flex="35%">
          <SearchBar />
        </Col>
        <Col className="own-col" flex="15%">
          15%
        </Col>
        <Divider />
        <Col className="own-col" flex="auto">
          auto
        </Col>
      </Row>
    </Header>
  );
}

export { TopNav };
