import { useAutoLogout } from "./useAutoLogout";
import { renderHook, act } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("useAutoLogout", () => {
  it("should return time in number", () => {
    const { result } = renderHook(() => useAutoLogout());

    expect(typeof result.current).toBe("number");
  });

  it("should logout after 15 min", () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useAutoLogout());

    act(() => {
      jest.advanceTimersByTime(15 * 60 * 1000);
    });

    expect(result.current).toBe(0);
  });

  it("should reset logout timer on user activity", () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useAutoLogout());

    act(() => {
      const randomTime = Math.floor(Math.random() * 14) + 1;
      jest.advanceTimersByTime(randomTime * 60 * 1000);
      const event = new Event("click");
      window.dispatchEvent(event);
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBeGreaterThanOrEqual(14);
  });
});
