import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(weekday);
dayjs.extend(localeData);

import Checkbox from "./Checkbox";
import { useUser } from "@/store/useUser";
import { useVisits, type Visit } from "@/hooks/api/useVisits";
import { useUpdateVisitStatus } from "@/hooks/api/useUpdateVisitStatus";
import { AppLayout } from "@/components/layout";
import { PaginationTable } from "@/components/PaginationTable";
import {
  Table,
  Select,
  DatePicker,
  Flex,
  type TimeRangePickerProps,
} from "antd";
import { useState, useCallback, useEffect } from "react";

const { RangePicker } = DatePicker;

type STATUS = "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export default function Office() {
  const userStore = useUser();
  const orgUnit = userStore.organizationalUnit;
  const today = dayjs().toDate();

  const [status, setStatus] = useState<STATUS>("IN_PROGRESS");
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const statusDateFromFilter =
    status === "IN_PROGRESS" ? new Date("2000-01-01") : dateFrom;

  const { data: response } = useVisits(orgUnit, {
    dateFrom: statusDateFromFilter,
    dateTo,
    status,
    page,
    limit,
  });
  const visits = response?.data;

  const handleChange = useCallback((value: STATUS) => {
    setStatus(value);
  }, []);

  const { mutate } = useUpdateVisitStatus();

  const handleStatusChange = useCallback((id: string, status: STATUS) => {
    mutate({ id, status });
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_v: string, r: Visit) => (
        <Select
          defaultValue={r.status}
          style={{ width: 100 }}
          onChange={(value) => handleStatusChange(r.id, value)}
          options={[
            { value: "PLANNED", label: "Zaplanowani" },
            { value: "IN_PROGRESS", label: "W trakcie" },
            { value: "COMPLETED", label: "Zakończeni" },
            { value: "CANCELLED", label: "Anulowani" },
          ]}
        />
      ),
    },
    {
      title: "Data planowania",
      dataIndex: "plannedDate",
      key: "plannedDate",
      render: (_v: string, r: Visit) => (
        <p>
          {r.plannedDate ? dayjs(r.plannedDate).format("DD.MM.YYYY HH:mm") : ""}
        </p>
      ),
    },
    {
      title: "Data rejestracji",
      dataIndex: "registerDate",
      key: "registerDate",
      render: (_v: string, r: Visit) => (
        <p>
          {r.registerDate
            ? dayjs(r.registerDate).format("DD.MM.YYYY HH:mm")
            : ""}
        </p>
      ),
    },
    {
      title: "Data wykonania",
      dataIndex: "completionDate",
      key: "completionDate",
      render: (_v: string, r: Visit) => (
        <p>
          {r.completionDate
            ? dayjs(r.completionDate).format("DD.MM.YYYY HH:mm")
            : ""}
        </p>
      ),
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
    {
      title: "EWUŚ",
      dataIndex: "ewus",
      key: "ewus",
      render: (_v: string, r: Visit) => (
        <Checkbox checkValue={r.ewusVerifiedAt} />
      ),
    },
    {
      title: "Rozliczenie",
      dataIndex: "billing",
      key: "billing",
      render: (_v: string, r: Visit) => <Checkbox checkValue={r.billed} />,
    },
  ];

  useEffect(() => {
    setPage(1);
  }, [status, dateFrom, dateTo, limit]);

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
      <Table
        dataSource={visits}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      <PaginationTable
        page={page}
        total={response?.meta?.total}
        onChangeFn={setPage}
        limit={limit}
        onShowSizeChangeFn={setLimit}
      />
    </AppLayout>
  );
}
