import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type OrganizationalUnit = {
    id: string;
    name: string;
    description: string;
}

export function useOrganizationalUnits(): ReturnType<typeof useQuery<OrganizationalUnit[]>> {
  return useQuery({
    queryKey: ["organizationalUnits"],
    queryFn: async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/organizational-units`);
      return data as OrganizationalUnit[];
    },
  });
};
