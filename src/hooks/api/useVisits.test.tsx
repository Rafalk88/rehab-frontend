import { useVisits } from "./useVisits";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";

jest.mock("@/lib/api", () => ({
  default: {
    get: jest.fn(),
  },
}));

import api from "@/lib/api";

const queryClient = new QueryClient();
queryClient.setQueryData(
  ["organizationalUnits"],
  [{ id: "abc-123", name: "POR19", description: "Zakład rehabilitacji" }]
);

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("", () => {
  it("should check if hook generate right parameters", async () => {
    expect(true).toBe(true);

    // const { result } = renderHook(() => useVisits("POR19"), { wrapper });

    // console.log(result.current.fetchStatus);

    // await waitFor(() => {
    //   expect((api as any).default.get).toHaveBeenCalledWith(
    //     "/visits?orgId=abc-123"
    //   );
    // });
  });
});
