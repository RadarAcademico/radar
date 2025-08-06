import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
  it("renders button with correct text", () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders as disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByText("Disabled Button")).toBeDisabled();
  });

  it("renders loading spinner when loading prop is true", () => {
    render(<Button loading>Loading Button</Button>);
    expect(screen.getByText("Loading Button")).toBeInTheDocument();
    expect(screen.getByText("Loading Button")).toBeDisabled();
  });

  it("renders as link when href prop is provided", () => {
    render(<Button href="/test">Link Button</Button>);
    const link = screen.getByText("Link Button");
    expect(link.closest("a")).toHaveAttribute("href", "/test");
  });

  it("applies correct variant classes", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByText("Primary")).toHaveClass("bg-red-600");

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText("Secondary")).toHaveClass("bg-gray-600");

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByText("Outline")).toHaveClass("border-red-600");

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByText("Ghost")).toHaveClass("text-red-600");
  });

  it("applies correct size classes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByText("Small")).toHaveClass("px-3");

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByText("Medium")).toHaveClass("px-4");

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByText("Large")).toHaveClass("px-6");
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByText("Custom")).toHaveClass("custom-class");
  });
});
