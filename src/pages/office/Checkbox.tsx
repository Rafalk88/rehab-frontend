import { Checkbox as CheckboxAntD } from "antd";

export default function Checkbox({
  checkValue,
}: {
  checkValue: Date | boolean | null;
}) {
  const isChecked = checkValue ? true : false;

  return <CheckboxAntD checked={isChecked} disabled />;
}
