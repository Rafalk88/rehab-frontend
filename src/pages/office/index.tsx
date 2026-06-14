import { useUser } from "@/store/useUser";
import { useVisits, type Visit } from "@/hooks/api/useVisits";
import { AppLayout } from "@/components/layout";
import {
  Table,
  Select,
  DatePicker,
  Flex,
  type TimeRangePickerProps,
} from "antd";
import dayjs from "dayjs";
import { useState, useCallback } from "react";

const { RangePicker } = DatePicker;

type STATUS = "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export default function Office() {
  const userStore = useUser();
  const orgUnit = userStore.organizationalUnit;
  const today = dayjs().toDate();

  const [status, setStatus] = useState<STATUS>("IN_PROGRESS");
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);

  const { data: response } = useVisits(orgUnit, dateFrom, dateTo, status);
  const visits = response?.data;

  const handleChange = useCallback((value: STATUS) => {
    setStatus(value);
  }, []);

  const onChange: TimeRangePickerProps["onChange"] = useCallback(
    (_, dateString) => {
      setDateFrom(new Date(dateString[0]));
      setDateTo(new Date(dateString[1]));
    },
    []
  );

  const columns = [
    {
      title: "Lp.",
      dataIndex: "lp",
      key: "lp",
      render: (_v: string, _r: Visit, i: number) => <p>{i + 1}</p>,
    },
    {
      title: "Imię",
      dataIndex: "name",
      key: "name",
      render: (_v: string, r: Visit) => <p>{r.patient.firstName?.firstName}</p>,
    },
    {
      title: "Nazwisko",
      dataIndex: "surname",
      key: "surname",
      render: (_v: string, r: Visit) => <p>{r.patient.surname?.surname}</p>,
    },
    {
      title: "PESEL",
      dataIndex: "pesel",
      key: "pesel",
      render: (_v: string, r: Visit) => <p>{r.patient.pesel}</p>,
    },
  ];

  return (
    <AppLayout>
      <Flex gap="small" justify="flex-start" align="flex-start">
        <Select
          defaultValue="IN_PROGRESS"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: "PLANNED", label: "Zaplanowani" },
            { value: "IN_PROGRESS", label: "W trakcie" },
            { value: "COMPLETED", label: "Zakończeni" },
            { value: "CANCELLED", label: "Anulowani" },
          ]}
        />
        <RangePicker defaultValue={[dayjs(), dayjs()]} onChange={onChange} />
      </Flex>
      <Table dataSource={visits} columns={columns} rowKey="id" />
    </AppLayout>
  );
}
