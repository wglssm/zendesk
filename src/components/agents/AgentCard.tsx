import type { Agent } from "../../types/agent";

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const { first_name, last_name, status, profile, avatar } = agent;

  // Status badge color
  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  // Profile badge color
  const getProfileColor = () => {
    switch (profile) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "agent":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4 transition-all hover:shadow-lg"
      data-testid="agent-card"
    >
      <img
        src={avatar}
        alt={`${first_name} ${last_name}`}
        className="w-16 h-16 rounded-full object-cover"
        data-testid="agent-avatar"
      />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3
            className="text-lg font-medium text-gray-900"
            data-testid="agent-name"
          >
            {first_name} {last_name}
          </h3>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${getProfileColor()}`}
            data-testid="agent-profile"
          >
            {profile}
          </div>
        </div>

        <div className="flex items-center mt-2">
          <div
            className={`w-2 h-2 rounded-full ${getStatusColor()} mr-2`}
          ></div>
          <span
            className="text-sm text-gray-500 capitalize"
            data-testid="agent-status"
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
