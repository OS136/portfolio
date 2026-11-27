import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import Contact from "./Contact";
import Experience from "./Experience";
import Impact from "./Impact";
import Projects from "./Projects";
import Skills from "./Skills";
import { portfolioData } from "../data/content";
import useGitHubRepos from "../hooks/useGitHubRepos";

jest.mock("../hooks/useGitHubRepos");
const mockUseGitHubRepos = useGitHubRepos as jest.MockedFunction<typeof useGitHubRepos>;

beforeEach(() => {
  mockUseGitHubRepos.mockReturnValue({
    repos: [],
    featuredRepos: [],
    loading: false,
    error: null,
  });
});

it("highlights the number of websites created", () => {
  render(<Impact />);
  const highlight = screen.getByRole("region", { name: "Website experience" });
  expect(highlight.textContent).toContain("50+");
  expect(highlight.textContent).toContain("websites created");
});

it("shows bank experience with year-only dates from the CV", () => {
  render(<Experience />);

  expect(screen.getByText("Banking Operations Specialist, Personal Banking")).toBeTruthy();
  expect(screen.getByText("Idea bank")).toBeTruthy();
  expect(screen.getByText("Credit Specialist")).toBeTruthy();
  expect(screen.getByText("Platinum bank")).toBeTruthy();
  expect(screen.getByText("2013 - 2015")).toBeTruthy();
  expect(screen.getByText("2011 - 2013")).toBeTruthy();
});

it("keeps project links and filters working", () => {
  render(<Projects />);
  const filters = screen.getByRole("group", { name: "Filter projects" });
  expect(within(filters).getByRole("button", { name: "All Projects" }).classList.contains("hero-button-primary")).toBe(true);
  expect(screen.getAllByRole("link", { name: "View Code" }).some(
    (link) => link.getAttribute("href") === portfolioData.projects[0].githubUrl,
  )).toBe(true);
  expect(screen.getAllByRole("link", { name: "Live Demo" }).some(
    (link) => link.getAttribute("href") === portfolioData.projects[0].liveUrl,
  )).toBe(true);

  fireEvent.click(within(filters).getByRole("button", { name: "Mobile" }));
  expect(within(filters).getByRole("button", { name: "Mobile" }).getAttribute("aria-pressed")).toBe("true");
  expect(within(filters).getByRole("button", { name: "Mobile" }).classList.contains("hero-button-primary")).toBe(true);
  expect(within(filters).getByRole("button", { name: "All Projects" }).classList.contains("hero-button-primary")).toBe(false);
  expect(screen.getByRole("status").textContent).toContain("No projects found");
  expect(screen.queryByText("Portfolio Projects")).toBeNull();

  fireEvent.click(within(filters).getByRole("button", { name: "All Projects" }));
  expect(screen.getByText("Portfolio Projects")).toBeTruthy();
});

it("filters skills and restores all skills", () => {
  render(<Skills />);
  const filters = screen.getByRole("group", { name: "Filter skills" });
  fireEvent.click(within(filters).getByRole("button", { name: /Backend/ }));
  expect(within(filters).getByRole("button", { name: /Backend/ }).classList.contains("hero-button-primary")).toBe(true);
  expect(screen.getByText("ASP.NET")).toBeTruthy();
  expect(screen.queryByText("React")).toBeNull();
  fireEvent.click(within(filters).getByRole("button", { name: /All Skills/ }));
  expect(screen.getByText("React")).toBeTruthy();
});

it("preserves the required contact form and mail client explanation", () => {
  render(<Contact />);
  ["Name", "Email", "Subject", "Message"].forEach((label) => {
    const field = screen.getByLabelText(new RegExp(`^${label}`));
    expect(field.hasAttribute("required")).toBe(true);
    fireEvent.change(field, { target: { value: label === "Email" ? "test@example.com" : `Test ${label}` } });
    expect((field as HTMLInputElement).value).toBe(label === "Email" ? "test@example.com" : `Test ${label}`);
  });
  expect(screen.getByRole("button", { name: "Send Message" }).getAttribute("type")).toBe("submit");
  expect(screen.getByRole("button", { name: "Send Message" }).classList.contains("hero-button-primary")).toBe(true);
  expect(screen.getByText(/open your email client/)).toBeTruthy();
});
