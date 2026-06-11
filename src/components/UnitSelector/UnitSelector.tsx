import { Select } from "antd";
import { useUser } from "@/store/useUser";
import {
  useOrganizationalUnits,
  type OrganizationalUnit,
} from "../../hooks/api/useOrganizationalUnits";
import styles from "./UnitSelector.module.less";
import { useMemo, useCallback } from "react";

function UnitSelector() {
  const { data } = useOrganizationalUnits();
  const userStore = useUser();

  const options = useMemo(() => {
    return data
      ?.map((unit: OrganizationalUnit) => ({
        value: unit.name,
        label: `${unit.name} - ${unit.description}`,
      }))
      .sort((a, b) => a.value.localeCompare(b.value));
  }, [data]);

  const handleChange = useCallback(
    (value: string) => userStore.setOrganizationalUnit(value),
    []
  );

  return (
    <Select
      className={styles["own-select"]}
      options={options}
      value={userStore.organizationalUnit}
      variant="borderless"
      popupMatchSelectWidth={400}
      onChange={handleChange}
    />
  );
}

export { UnitSelector };
