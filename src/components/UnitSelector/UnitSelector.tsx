import { Select } from "antd";
import "./UnitSelector.less";

const options = [
  {
    value: "POR02",
    label: "POR02 - Poradnia ortopedii i traumatologii narządu ruchu",
  },
  {
    value: "POR11",
    label: "POR11 - Poradnia rehabilitacyjna dla dorosłych i dzieci",
  },
  {
    value: "POR19",
    label: "POR19 - Dział (pracownia) fizjoterapii",
  },
];

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

function UnitSelector() {
  return (
    <Select
      className="own-select"
      options={options}
      placeholder="Wybierz jednostkę"
      variant="borderless"
      popupMatchSelectWidth={400}
      onChange={handleChange}
    />
  );
}

export { UnitSelector };
