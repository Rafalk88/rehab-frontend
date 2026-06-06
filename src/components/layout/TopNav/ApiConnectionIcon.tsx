import { usePrismaHealthCheck } from "@/hooks/api/usePrismaHealtCheck";
import { SystemIcon } from "@/components/ui";
import { ApiOutlined } from "@ant-design/icons";

function ApiConnectionIcon() {
  const { status } = usePrismaHealthCheck();
  const isOnline = status === "success";

  return (
    <SystemIcon
      icon={<ApiOutlined />}
      label={
        isOnline
          ? "Online – połączenie aktywne"
          : "Offline – brak połączenia z serwerem"
      }
      data-pulse={(!isOnline).toString()}
      pulse={!isOnline}
      data-disabled={false.toString()}
    />
  );
}

export { ApiConnectionIcon };
