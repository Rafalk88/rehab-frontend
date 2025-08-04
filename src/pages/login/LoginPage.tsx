import { Logo } from "@/components/Logo";
import { Card, Col, Row, Button, Form, Input } from "antd";
import type { FormProps } from "antd";
import Image from "next/image";
import Link from "next/link";
import { LoginOutlined } from "@ant-design/icons";
import styles from "./LoginPage.module.less";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function LoginPage() {
  return (
    <section>
      <Row className={styles["own-row"]} justify="center" align="middle">
        <Col span={12}>
          <Image
            className={styles["own-image"]}
            src="/login-page-image.png"
            alt="Login screen"
            width={500}
            height={500}
            aria-label="login page image"
          />
        </Col>
        <Col span={12}>
          <Card cover={<Logo collapsed={false} />} variant="borderless">
            <Form
              className={styles["own-form"]}
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 24 }}
              variant="filled"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              requiredMark={false}
              scrollToFirstError={true}
              size="large"
              clearOnDestroy={true}
            >
              <Form.Item<FieldType>
                label="Użytkownik"
                name="username"
                rules={[
                  { required: true, message: "Wpisz nazwę użytkownika." },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Hasło"
                name="password"
                rules={[{ required: true, message: "Wprowadź hasło." }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item label={null}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={false}
                  icon={<LoginOutlined />}
                >
                  Zaloguj się
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      <Row justify="center" align="middle" className={styles["own-row-last"]}>
        Copyright &copy; {new Date().getFullYear()} by{" "}
        <Link
          href="https://github.com/rafalk88"
          className={styles["own-link"]}
          target="_blank"
        >
          Rafał Kochanecki
        </Link>
        .
      </Row>
    </section>
  );
}
