import { AgentCard } from "./AgentCard";
import { useAgents } from "../../hooks/useAgents";

export function AgentList() {
  const { agents, loading, error, statusFilter, setStatusFilter, refetch } =
    useAgents();

  // Handle status filter change
  const handleStatusFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatusFilter(e.target.value);
  };

  // Conditionally render based on loading/error state
  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading agents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">
            {error.message || "Failed to load agents."}
          </span>
          <button
            onClick={() => refetch()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto" data-testid="agent-list-container">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800">
            Contact Center Agents
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="statusFilter" className="text-sm text-gray-600">
            Filter by status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
            data-testid="status-filter-select"
          >
            <option value="all">All</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>

      {agents.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No agents available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {agents.map((agent, index) => (
            <AgentCard
              key={`${agent.first_name}-${agent.last_name}-${index}`}
              agent={agent}
            />
          ))}
        </div>
      )}
    </div>
  );
}
