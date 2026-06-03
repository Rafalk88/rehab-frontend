import api from "../../lib/api";
import { useQuery } from "@tanstack/react-query";

export type OrganizationalUnit = {
    id: string;
    name: string;
    description: string;
}

export function useOrganizationalUnits(): ReturnType<typeof useQuery<OrganizationalUnit[]>> {
  return useQuery({
    queryKey: ["organizationalUnits"],
    queryFn: async () => {
      const { data } = await api.get("/organizational-units");
      return data as OrganizationalUnit[];
    },
  });
};
