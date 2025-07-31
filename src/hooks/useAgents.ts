import { useState, useEffect, useCallback, useMemo } from "react";
import type { Agent } from "../types/agent";
import { fetchAgents as fetchAgentsApi } from "../api/agents";

/**
 * Custom hook for fetching,sorting and filtering agents data
 * @returns Object containing agents data and controls
 */
export function useAgents() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchAgentsData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchAgentsApi();
      setAgents(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("An error occurred while fetching agents")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgentsData();
  }, [fetchAgentsData]);

  // Sort and filter agents
  const filteredAndSortedAgents = useMemo(() => {
    // First, filter by status if needed
    const filtered =
      statusFilter === "all"
        ? agents
        : agents.filter((agent) => agent.status === statusFilter);

    // Then, sort by status (online first) and then by first name
    return [...filtered].sort((a, b) => {
      // First sort by status - online agents come first
      if (a.status === "online" && b.status !== "online") return -1;
      if (a.status !== "online" && b.status === "online") return 1;

      // If both have the same status priority, sort by first name
      return a.first_name.localeCompare(b.first_name);
    });
  }, [agents, statusFilter]);

  return {
    agents: filteredAndSortedAgents,
    loading,
    error,
    statusFilter,
    setStatusFilter,
    refetch: fetchAgentsData,
  };
}
