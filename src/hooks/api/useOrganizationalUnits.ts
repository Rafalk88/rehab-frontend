import api from "../../lib/api";
import { useQuery } from "@tanstack/react-query";

export type OrganizationalUnit = {
  id: string;
  name: string;
  description: string;
};

/**
 * Function to get organizational units data, and due to very low data change cache.
 * @returns empty table or table with organziationa units objects
 */
export function useOrganizationalUnits(): ReturnType<
  typeof useQuery<OrganizationalUnit[]>
> {
  return useQuery({
    queryKey: ["organizationalUnits"],
    queryFn: async () => {
      const { data } = await api.get("/organizational-units");
      return data as OrganizationalUnit[];
    },
  });
}
