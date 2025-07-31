import { AgentList } from "./components/agents/AgentList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-8">
      <header className="w-full mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              Zendesk Contact Center
            </h1>
            <p className="text-gray-600">
              Manage and monitor your contact center agents
            </p>
          </div>
        </div>
      </header>

      <main className="w-full">
        <AgentList />
      </main>
    </div>
  );
}

export default App;
