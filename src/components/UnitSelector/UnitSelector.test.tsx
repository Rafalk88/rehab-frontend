import { UnitSelector } from "./UnitSelector";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const organizationalUnitsData = {
  data: [
    { id: 1, name: "Unit 1", description: "Description 1" },
    { id: 2, name: "Unit 2", description: "Description 2" },
    { id: 3, name: "Unit 3", description: "Description 3" },
  ],
};

jest.mock("@/hooks/api/useOrganizationalUnits", () => ({
  useOrganizationalUnits: () => organizationalUnitsData,
}));

describe("UnitSelector", () => {
  it("renders component with organizational units", () => {
    render(<UnitSelector />);

    expect(screen.getByText("Unit 1 - Description 1")).toBeInTheDocument();
  });
});
