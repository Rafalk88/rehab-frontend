import { ApiConnectionIcon } from "./ApiConnectionIcon";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("@/hooks/api/usePrismaHealtCheck", () => ({
  usePrismaHealthCheck: jest.fn(),
}));

import { usePrismaHealthCheck } from "@/hooks/api/usePrismaHealtCheck";

describe("ApiConnectionIcon", () => {
  it("should render online status on success", () => {
    (usePrismaHealthCheck as jest.Mock).mockReturnValue({ status: "success" });
    render(<ApiConnectionIcon />);

    expect(
      screen.getByRole("img", { name: "Online – połączenie aktywne" })
    ).toBeInTheDocument();
  });

  it("should render offline status on error", () => {
    (usePrismaHealthCheck as jest.Mock).mockReturnValue({ status: "error" });
    render(<ApiConnectionIcon />);

    expect(
      screen.getByRole("img", { name: "Offline – brak połączenia z serwerem" })
    ).toBeInTheDocument();
  });
});
