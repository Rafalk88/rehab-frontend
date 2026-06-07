import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

const ONE_MINUTE = 1000 * 60;

/**
 * Health check for prisma database.
 * @returns UseQueryResult<any, unknown> - mainly check for "success | "error" | "pending" status in data object
 */
export function usePrismaHealthCheck() {
  return useQuery({
    queryKey: ["prismaHealthCheck"],
    queryFn: async () => {
      const response = await api.get("/health");
      return response.data;
    },
    refetchInterval: ONE_MINUTE,
  });
}
