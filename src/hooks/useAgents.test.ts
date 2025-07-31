import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useAgents } from "./useAgents";
import * as apiModule from "../api/agents";

vi.mock("../api/agents", () => ({
  fetchAgents: vi.fn(),
}));

describe("useAgents Hook", () => {
  const mockAgents = [
    {
      first_name: "Ron",
      last_name: "Swanson",
      status: "offline" as const,
      profile: "admin" as const,
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      first_name: "Leslie",
      last_name: "Knope",
      status: "online" as const,
      profile: "agent" as const,
      avatar: "https://example.com/avatar2.jpg",
    },
    {
      first_name: "Ann",
      last_name: "Perkins",
      status: "offline" as const,
      profile: "agent" as const,
      avatar: "https://example.com/avatar3.jpg",
    },
    {
      first_name: "April",
      last_name: "Ludgate",
      status: "online" as const,
      profile: "agent" as const,
      avatar: "https://example.com/avatar4.jpg",
    },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(apiModule.fetchAgents).mockReturnValue(mockAgents);
  });

  it("fetches and sorts agents by online status and then by name", async () => {
    const { result } = renderHook(() => useAgents());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    const sortedAgents = result.current.agents;
    expect(sortedAgents).toHaveLength(4);

    // sort by online status first, then by first name
    expect(sortedAgents[0].first_name).toBe("April");
    expect(sortedAgents[0].status).toBe("online");
    expect(sortedAgents[1].first_name).toBe("Leslie");
    expect(sortedAgents[1].status).toBe("online");

    expect(sortedAgents[2].status).toBe("offline");
    expect(sortedAgents[3].status).toBe("offline");
  });

  it("filters agents by status", async () => {
    const { result } = renderHook(() => useAgents());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.agents).toHaveLength(4);

    await waitFor(() => {
      result.current.setStatusFilter("online");

      const onlineAgents = result.current.agents.filter(
        (agent) => agent.status === "online"
      );
      expect(onlineAgents.length).toBe(2);
      expect(onlineAgents[0].status).toBe("online");
      expect(onlineAgents[1].status).toBe("online");
    });

    await waitFor(() => {
      result.current.setStatusFilter("all");
      expect(result.current.agents.length).toBe(4);
    });
  });

  it("handles API errors", async () => {
    const errorMessage = "API error";
    vi.mocked(apiModule.fetchAgents).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => useAgents());

    await waitFor(() => expect(result.current.error).not.toBeNull());

    expect(result.current.error?.message).toBe(errorMessage);
    expect(result.current.agents).toHaveLength(0);
  });
});
