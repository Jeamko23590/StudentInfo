import { Navbar, Sidebar } from '@/components';
import { LoadingProvider } from '@/context';
import { Dashboard } from '@/pages';

function App() {
  return (
    <LoadingProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1">
            <Dashboard />
          </main>
        </div>
      </div>
    </LoadingProvider>
  );
}

export default App;
