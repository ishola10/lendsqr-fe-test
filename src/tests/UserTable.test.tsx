import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserTable } from "../components/features/users/UserTable";

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

const mockUsers = Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 1}`,
    organization: `Org ${i + 1}`,
    username: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    phoneNumber: `080${i + 1}`,
    dateJoined: "2023-01-01",
    status: "Active"
}));

describe("UserTable Component", () => {
    test("renders the table with users (Positive Scenario)", () => {
        render(<UserTable users={mockUsers as any} />);

        expect(screen.getByText("Org 1")).toBeInTheDocument();
        expect(screen.getByText("user9@example.com")).toBeInTheDocument();
    });

    test("pagination works correctly", () => {
        render(<UserTable users={mockUsers as any} />);

        expect(screen.queryByText("Org 10")).not.toBeInTheDocument();

        const nextButton = screen.getByText("2");
        fireEvent.click(nextButton);

        expect(screen.getByText("Org 10")).toBeInTheDocument();
    });

    test("handles empty users list gracefully (Negative Scenario)", () => {
        render(<UserTable users={[]} />);
        expect(screen.getByText("ORGANIZATION")).toBeInTheDocument();
        expect(screen.queryByText("User 1")).not.toBeInTheDocument();
    });
});
