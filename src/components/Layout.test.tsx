import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Layout from "./Layout";

beforeEach(() => {
  localStorage.clear();
});

it("defaults to dark and restores each saved selection", () => {
  const { container, unmount } = render(<Layout><p>Content</p></Layout>);
  expect(container.firstElementChild?.classList.contains("portfolio-dark")).toBe(true);
  expect(localStorage.getItem("portfolio-theme")).toBe("dark");
  fireEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));
  expect(container.firstElementChild?.classList.contains("portfolio-dark")).toBe(false);
  expect(localStorage.getItem("portfolio-theme")).toBe("light");

  unmount();
  const restored = render(<Layout><p>Content</p></Layout>);
  expect(restored.container.firstElementChild?.classList.contains("portfolio-dark")).toBe(false);
  fireEvent.click(screen.getByRole("button", { name: "Switch to dark mode" }));
  expect(localStorage.getItem("portfolio-theme")).toBe("dark");
  restored.unmount();
  const darkRestored = render(<Layout><p>Content</p></Layout>);
  expect(darkRestored.container.firstElementChild?.classList.contains("portfolio-dark")).toBe(true);
});
