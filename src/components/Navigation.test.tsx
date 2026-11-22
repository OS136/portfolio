import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Navigation from "./Navigation";
import { portfolioData } from "../data/content";

it("uses the glass initials as an accessible link back to the hero", () => {
  render(<Navigation />);
  const hero = document.createElement("section");
  hero.id = "hero";
  hero.scrollIntoView = jest.fn();
  document.body.append(hero);

  const logo = screen.getByRole("button", { name: `${portfolioData.personal.name} - back to top` });
  expect(logo.querySelector(".nav-glass-avatar")?.textContent).toBe("OS");
  fireEvent.click(logo);
  expect(hero.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  hero.remove();
});
