import type { OrganizationalUnit } from "../api/useOrganizationalUnits";
import api from "@/lib/api";
import { useQueryClient, useQuery } from "@tanstack/react-query";

type VisitStatus = "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface Visit {
  id: string;
  orgId: string;
  dateFrom: Date;
  dateTo: Date;
  status: VisitStatus;
  patient: {
    firstName: { firstName: string } | null;
    surname: { surname: string } | null;
    pesel: string;
  };
}

/**
 * Hook for GET visits by specific organizationalUnit (get from reactQuery cache), date (opt) & status (opt)
 * @param orgUnit
 * @param date
 * @param status
 * @returns lists of visits by params.
 */
export function useVisits(
  orgUnit: string,
  dateFrom?: Date,
  dateTo?: Date,
  status?: VisitStatus
) {
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData<OrganizationalUnit[]>([
    "organizationalUnits",
  ]);
  const unit = data?.find((u: OrganizationalUnit) => u.name === orgUnit);

  const formattedDateFrom = dateFrom
    ? dateFrom.toISOString().split("T")[0]
    : undefined;
  const formattedDateTo = dateTo
    ? dateTo.toISOString().split("T")[0]
    : undefined;

  const queryParams = {
    orgId: unit?.id,
    dateFrom: formattedDateFrom,
    dateTo: formattedDateTo,
    status,
  };

  const params = new URLSearchParams();
  //* using `orgId!` in purpose. TS don't know if it is undefined but `line42: enabled: !!unit?.id` prevent from it
  params.append("orgId", queryParams.orgId!);
  if (queryParams.dateFrom) params.append("dateFrom", queryParams.dateFrom);
  if (queryParams.dateTo) params.append("dateTo", queryParams.dateTo);
  if (queryParams.status) params.append("status", queryParams.status);

  return useQuery({
    queryKey: ["visits", queryParams],
    queryFn: async () => {
      const { data } = await api.get(`/visits?${params.toString()}`);
      return data;
    },
    enabled: !!unit?.id,
  });
}
