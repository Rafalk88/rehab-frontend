//! loka wyszukiwania - dodaj fusy.js
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { AutoComplete, Flex, Input, Space } from "antd";

import "./SearchBar.less";

// TUTAJ LINK DO ŹRÓDŁA - ustaw zeby przeszło na odpowiedni root
const Title: React.FC<Readonly<{ title?: string }>> = (props) => (
  <Flex align="center" justify="space-between">
    {props.title}
    <a
      href="https://www.google.com/search?q=antd"
      target="_blank"
      rel="noopener noreferrer"
    >
      more
    </a>
  </Flex>
);

// TUTAJ RENDERUJE POZYCJE NA LISCIE
const renderItem = (title: string, count: number) => ({
  value: title,
  label: (
    <Flex align="center" justify="space-between">
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </Flex>
  ),
});

// TUTAJ JEST LISTA
const options = [
  {
    label: <Title title="Libraries" />,
    options: [
      renderItem("AntDesign", 10000),
      renderItem("AntDesign UI", 10600),
    ],
  },
  {
    label: <Title title="Solutions" />,
    options: [
      renderItem("AntDesign UI FAQ", 60100),
      renderItem("AntDesign FAQ", 30010),
    ],
  },
  {
    label: <Title title="Articles" />,
    options: [renderItem("AntDesign design language", 100000)],
  },
];

function SearchBar() {
  return (
    <>
      <AutoComplete
        className="auto-complete"
        popupMatchSelectWidth={400}
        options={options}
      >
        <Space.Compact size="large">
          <Input
            addonBefore={<SearchOutlined />}
            placeholder="Szukaj..."
            maxLength={30}
            variant="borderless"
          />
        </Space.Compact>
      </AutoComplete>
    </>
  );
}

export { SearchBar };
