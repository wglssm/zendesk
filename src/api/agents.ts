import type { Agent, AgentsResponse } from "../types/agent";

const API_URL =
  "https://3nzfzc8au7.execute-api.us-east-1.amazonaws.com/default/agents";

/**
 * Fetches agents from the API
 * @returns Promise with agent data
 */
export async function fetchAgents(): Promise<Agent[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data: AgentsResponse = await response.json();
    return data.agents;
  } catch (error) {
    console.error("Error fetching agents:", error);
    throw error;
  }
}
