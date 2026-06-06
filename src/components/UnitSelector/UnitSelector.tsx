import { Select } from "antd";
import {
  useOrganizationalUnits,
  type OrganizationalUnit,
} from "../../hooks/api/useOrganizationalUnits";
import styles from "./UnitSelector.module.less";
import { useMemo } from "react";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

function UnitSelector() {
  const { data } = useOrganizationalUnits();

  const options = useMemo(() => {
    return data?.map((unit: OrganizationalUnit) => ({
      value: unit.name,
      label: `${unit.name} - ${unit.description}`,
    }));
  }, [data]);

  return (
    <Select
      className={styles["own-select"]}
      options={options}
      value={options?.[0]?.value}
      variant="borderless"
      popupMatchSelectWidth={400}
      onChange={handleChange}
    />
  );
}

export { UnitSelector };
