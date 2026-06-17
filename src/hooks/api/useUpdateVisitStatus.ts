import type { VisitStatus } from "./useVisits";
import api from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateVisitStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: VisitStatus }) =>
      api.patch(`/visits/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visits"] });
    },
  });
}
