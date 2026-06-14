import { useUser } from "@/store/useUser";
import { useVisits, type Visit } from "@/hooks/api/useVisits";
import { AppLayout } from "@/components/layout";
import { Table } from "antd";

export default function Office() {
  const userStore = useUser();
  const orgUnit = userStore.organizationalUnit;

  const { data: response } = useVisits(orgUnit);
  const visits = response?.data;

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
      <Table dataSource={visits} columns={columns} rowKey="id" />
    </AppLayout>
  );
}
