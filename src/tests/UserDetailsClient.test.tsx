import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserDetailsClient } from "../app/users/[id]/UserDetailsClient";

const mockUser = {
    id: "123",
    username: "jdoe",
    profile: {
        fullName: "John Doe",
        gender: "Male"
    },
    account: {
        balance: 50000,
        accountNumber: "1234567890",
        bank: "Zenith Bank"
    }
};

describe("UserDetailsClient Component", () => {
    test("switches between tabs (Positive Scenario)", () => {
        render(<UserDetailsClient user={mockUser as any} />);

        expect(screen.getByText("Personal Information")).toBeInTheDocument();
        expect(screen.getAllByText("John Doe").length).toBeGreaterThan(0);

        const loansTab = screen.getByText("Loans");
        fireEvent.click(loansTab);

        expect(screen.getByText(/Soon to be implemented/i)).toBeInTheDocument();
        expect(screen.queryByText("Personal Information")).not.toBeInTheDocument();

        const generalTab = screen.getByText("General Details");
        fireEvent.click(generalTab);

        expect(screen.getByText("Personal Information")).toBeInTheDocument();
    });
});
