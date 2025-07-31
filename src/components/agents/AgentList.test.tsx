import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AgentList } from "./AgentList";
import { useAgents } from "../../hooks/useAgents";
import type { Agent } from "../../types/agent";

// Mock AgentCard
vi.mock("./AgentCard", () => ({
  AgentCard: ({ agent }: { agent: Agent }) => (
    <div data-testid="agent-card">
      {agent.first_name} {agent.last_name}
    </div>
  ),
}));

// Mock useAgents hook
const mockSetStatusFilter = vi.fn();
const mockRefetch = vi.fn();

function mockUseAgents({
  agents = [],
  loading = false,
  error = null,
  statusFilter = "all",
}: {
  agents?: Agent[];
  loading?: boolean;
  error?: any;
  statusFilter?: string;
} = {}) {
  return {
    agents,
    loading,
    error,
    statusFilter,
    setStatusFilter: mockSetStatusFilter,
    refetch: mockRefetch,
  };
}

vi.mock("../../hooks/useAgents", () => ({
  useAgents: vi.fn() as unknown as typeof useAgents,
}));

describe("AgentList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    vi.mocked(useAgents).mockReturnValue(mockUseAgents({ loading: true }));
    render(<AgentList />);
    expect(screen.getByText(/Loading agents/i)).toBeInTheDocument();
    expect(
      screen.queryByTestId("agent-list-container")
    ).not.toBeInTheDocument();
  });

  it("renders empty state when no agents", () => {
    vi.mocked(useAgents).mockReturnValue(mockUseAgents({ agents: [] }));
    render(<AgentList />);
    expect(screen.getByTestId("agent-list-container")).toBeInTheDocument();
    expect(screen.getByText(/No agents available/i)).toBeInTheDocument();
  });

  it("renders agent cards when agents are present", () => {
    const agents: Agent[] = [
      {
        first_name: "Alice",
        last_name: "Smith",
        status: "online",
        profile: "agent",
        avatar: "",
      },
      {
        first_name: "Bob",
        last_name: "Jones",
        status: "offline",
        profile: "agent",
        avatar: "",
      },
    ];
    vi.mocked(useAgents).mockReturnValue(mockUseAgents({ agents }));
    render(<AgentList />);
    expect(screen.getByTestId("agent-list-container")).toBeInTheDocument();
    expect(screen.getAllByTestId("agent-card")).toHaveLength(2);
    expect(screen.getByText(/Alice Smith/)).toBeInTheDocument();
    expect(screen.getByText(/Bob Jones/)).toBeInTheDocument();
  });

  it("renders status filter select and handles change", () => {
    vi.mocked(useAgents).mockReturnValue(
      mockUseAgents({ statusFilter: "online" })
    );
    render(<AgentList />);
    const select = screen.getByTestId("status-filter-select");
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("online");
    fireEvent.change(select, { target: { value: "offline" } });
    expect(mockSetStatusFilter).toHaveBeenCalledWith("offline");
  });

  it("renders correct filter options", () => {
    vi.mocked(useAgents).mockReturnValue(mockUseAgents());
    render(<AgentList />);
    const select = screen.getByTestId("status-filter-select");
    expect(select).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Online" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Offline" })).toBeInTheDocument();
  });
});
