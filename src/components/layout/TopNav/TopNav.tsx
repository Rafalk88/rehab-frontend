import { Divider } from "@/components/ui/Divider";
import { Col, Row } from "antd";
import { Layout } from "antd";

import "./TopNav.less";

const { Header } = Layout;

function TopNav() {
  return (
    <Header>
      <Row justify="center" align="top">
        <Col flex="20%">20%</Col>
        <Col flex="45%">45%</Col>
        <Col flex="15%">15%</Col>
        <Divider />
        <Col flex="auto">auto</Col>
      </Row>
    </Header>
  );
}

export { TopNav };
