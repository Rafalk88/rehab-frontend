import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Office from "./index";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/hooks/api/useVisits", () => ({
  useVisits: () => ({
    data: {
      data: [
        {
          id: "id-1",
          orgId: "POR19",
          plannedDate: "16-06-2026",
          registerDate: "19-06-2026",
          completionDate: null,
          ewusVerifiedAt: null,
          billed: false,
          status: "IN_PROGRESS",
          patient: {
            firstName: {
              firstName: "Jan",
            },
            surname: {
              surname: "Kowalski",
            },
            pesel: "99121312345",
          },
        },
      ],
    },
  }),
}));

jest.mock("@/hooks/api/useUpdateVisitStatus", () => ({
  useUpdateVisitStatus: () => ({
    mutate: jest.fn(),
  }),
}));

jest.mock("@/store/useUser", () => ({
  useUser: () => ({
    organizationalUnit: "POR19",
    setOrganizationalUnit: jest.fn(),
  }),
}));

jest.mock("@/hooks/api/usePrismaHealtCheck", () => ({
  usePrismaHealthCheck: () => ({ status: "success" }),
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("Office - integration test", () => {
  it("should render vistis", () => {
    render(<Office />, { wrapper });

    expect(screen.getByText("Jan")).toBeInTheDocument();
  });
});
