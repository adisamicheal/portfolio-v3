import { render, screen } from "@testing-library/react";
import Card from "@/components/Card/Card";
import "@testing-library/jest-dom";

// Mock GSAP and ScrollTrigger
jest.mock("gsap", () => {
  const actual = jest.requireActual("gsap");
  return {
    ...actual,
    fromTo: jest.fn(),
    to: jest.fn(),
    registerPlugin: jest.fn(),
  };
});

jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    refresh: jest.fn(),
  },
}));

// Sample props
const mockProps = {
  id: 1,
  name: "Test Project",
  image: "/test-image.jpg",
};

describe("Card component", () => {
  it("renders image and project name", () => {
    render(<Card {...mockProps} />);

    const image = screen.getByRole("img");
    const title = screen.getByText(/Test Project/i);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProps.image);
    expect(image).toHaveAttribute("alt", mockProps.name);
    expect(title).toBeInTheDocument();
  });

  it("includes arrow icon in the DOM", () => {
    render(<Card {...mockProps} />);
    const arrow = screen.getByRole("img", { hidden: true }); // SVG has no title/text
    expect(arrow).toBeInTheDocument();
  });
});
