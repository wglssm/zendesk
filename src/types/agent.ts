export interface Agent {
  first_name: string;
  last_name: string;
  status: "online" | "offline";
  profile: "admin" | "agent";
  avatar: string;
}

export interface AgentsResponse {
  agents: Agent[];
}
