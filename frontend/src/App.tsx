import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingProvider } from '@/context';
import HeaderComponent from '@/components/HeaderComponent';
import SuspenseLoader from '@/components/SuspenseLoader';

// Lazy load pages
const Home = lazy(() => import('@/pages/Home'));
const Students = lazy(() => import('@/pages/Students'));

function App() {
  return (
    <LoadingProvider>
      <div className="min-h-screen bg-gray-50">
        <HeaderComponent />
        <Suspense fallback={<SuspenseLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<Students />} />
          </Routes>
        </Suspense>
      </div>
    </LoadingProvider>
  );
}

export default App;
