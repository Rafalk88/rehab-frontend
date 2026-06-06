import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("@/hooks/useAutoLogout", () => ({
  useAutoLogout: () => 15,
}));

jest.mock("@/components/UserMenu", () => ({
  UserMenu: () => <div>UserMenu</div>,
}));

jest.mock("@/components/UnitSelector", () => ({
  UnitSelector: () => <div>UnitSelector</div>,
}));

jest.mock("@/components/SearchBar", () => ({
  SearchBar: () => <div>SearchBar</div>,
}));

jest.mock("./ApiConnectionIcon", () => ({
  ApiConnectionIcon: () => <div>ApiConnectionIcon</div>,
}));

import { TopNav } from "./TopNav";

describe("TopNav - integration test", () => {
  it("should render all children", () => {
    render(<TopNav />);

    expect(screen.getByText("UserMenu")).toBeInTheDocument();
    expect(screen.getByText("UnitSelector")).toBeInTheDocument();
    expect(screen.getByText("SearchBar")).toBeInTheDocument();
    expect(screen.getByText("ApiConnectionIcon")).toBeInTheDocument();
  });
});
