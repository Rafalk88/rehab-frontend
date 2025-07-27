import { SearchBar } from "@/components/SearchBar";
import { Divider } from "@/components/ui/Divider";
import { Col, Row } from "antd";
import { Layout } from "antd";

import "./TopNav.less";

const { Header } = Layout;

function TopNav() {
  return (
    <Header>
      <Row justify="center" align="middle">
        <Col className="col" flex="20%">
          20%
        </Col>
        <Col className="col" flex="35%">
          <SearchBar />
        </Col>
        <Col className="col" flex="15%">
          15%
        </Col>
        <Divider />
        <Col className="col" flex="auto">
          auto
        </Col>
      </Row>
    </Header>
  );
}

export { TopNav };
