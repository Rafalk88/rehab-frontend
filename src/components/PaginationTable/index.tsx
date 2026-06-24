import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { useCallback } from "react";

function PaginationTable({
  total = 20,
  callbackFn,
}: {
  total: number;
  callbackFn: (pageNumber: number) => void;
}) {
  const onChange: PaginationProps["onChange"] = useCallback(
    (pageNumber) => {
      callbackFn(pageNumber);
    },
    [callbackFn]
  );

  return (
    <Pagination
      showQuickJumper
      defaultCurrent={1}
      total={total}
      onChange={onChange}
    />
  );
}

export { PaginationTable };
