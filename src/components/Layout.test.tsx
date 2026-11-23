import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Layout from "./Layout";

beforeEach(() => {
  localStorage.clear();
});

it("switches themes and restores the saved selection", () => {
  const { container, unmount } = render(<Layout><p>Content</p></Layout>);
  expect(container.firstElementChild?.classList.contains("portfolio-dark")).toBe(false);
  fireEvent.click(screen.getByRole("button", { name: "Switch to dark mode" }));
  expect(container.firstElementChild?.classList.contains("portfolio-dark")).toBe(true);
  expect(localStorage.getItem("portfolio-theme")).toBe("dark");

  unmount();
  const restored = render(<Layout><p>Content</p></Layout>);
  expect(restored.container.firstElementChild?.classList.contains("portfolio-dark")).toBe(true);
  fireEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));
  expect(restored.container.firstElementChild?.classList.contains("portfolio-dark")).toBe(false);
  expect(localStorage.getItem("portfolio-theme")).toBe("light");
});
