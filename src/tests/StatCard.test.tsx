import React from "react";
import { render, screen } from "@testing-library/react";
import { StatCard } from "../components/common/StatCard";

describe("StatCard Component", () => {
    const mockProps = {
        icon: "/test-icon.svg",
        label: "Test Label",
        value: "1,234",
        iconBgColor: "red"
    };

    test("renders label and value correctly (Positive Scenario)", () => {
        render(<StatCard {...mockProps} />);

        expect(screen.getByText("Test Label")).toBeInTheDocument();
        expect(screen.getByText("1,234")).toBeInTheDocument();
    });

    test("renders the icon with correct alt text", () => {
        render(<StatCard {...mockProps} />);
        const icon = screen.getByAltText("Test Label");
        expect(icon).toBeInTheDocument();
    });
});
