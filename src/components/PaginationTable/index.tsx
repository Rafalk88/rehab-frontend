import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { Dispatch, SetStateAction, useCallback } from "react";

function PaginationTable({
  page,
  total = 20,
  onChangeFn,
  limit,
  onShowSizeChangeFn,
}: {
  page: number;
  total: number;
  onChangeFn: Dispatch<SetStateAction<number>>;
  limit: number;
  onShowSizeChangeFn: Dispatch<SetStateAction<number>>;
}) {
  const onChange: PaginationProps["onChange"] = useCallback(
    (pageNumber) => {
      onChangeFn(pageNumber);
    },
    [onChangeFn]
  );

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = useCallback(
    (_c, pageSize) => {
      onShowSizeChangeFn(pageSize);
    },
    [onShowSizeChangeFn]
  );

  return (
    <Pagination
      showQuickJumper
      current={page}
      total={total}
      onChange={onChange}
      pageSize={limit}
      onShowSizeChange={onShowSizeChange}
      pageSizeOptions={[2, 5, 10, 20]}
    />
  );
}

export { PaginationTable };
