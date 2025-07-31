import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AgentCard } from "./AgentCard";

describe("AgentCard Component", () => {
  const mockAgent = {
    first_name: "Ron",
    last_name: "Swanson",
    status: "online" as const,
    profile: "admin" as const,
    avatar: "https://example.com/avatar.jpg",
  };

  it("renders agent information correctly", () => {
    render(<AgentCard agent={mockAgent} />);

    // Check if the name is displayed correctly
    const nameElement = screen.getByTestId("agent-name");
    expect(nameElement.textContent).toBe("Ron Swanson");

    // Check if the status is displayed correctly
    const statusElement = screen.getByTestId("agent-status");
    expect(statusElement.textContent).toBe("online");

    // Check if the profile is displayed correctly
    const profileElement = screen.getByTestId("agent-profile");
    expect(profileElement.textContent).toBe("admin");

    // Check if the avatar is displayed with the correct alt text
    const avatarImg = screen.getByTestId("agent-avatar") as HTMLImageElement;
    expect(avatarImg.src).toContain(mockAgent.avatar);
    expect(avatarImg.alt).toBe("Ron Swanson");
  });
});
