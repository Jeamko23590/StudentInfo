import { useLocation } from 'react-router-dom';

const SuspenseLoader = () => {
  const location = useLocation();
  
  // Determine which page skeleton to show based on current route
  const page = location.pathname === '/' ? 'home' : 'students';

  if (page === 'home') {
    return <HomeSkeleton />;
  }
  return <StudentsSkeleton />;
};

function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900 overflow-y-auto">
      {/* Content Skeleton */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Title Skeleton */}
          <div className="text-center mb-12">
            <div className="h-12 w-96 bg-gray-700 rounded-lg animate-pulse mx-auto mb-4"></div>
            <div className="h-6 w-[600px] bg-gray-700 rounded animate-pulse mx-auto"></div>
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-8 w-16 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  <div className="w-14 h-14 bg-gray-700 rounded-xl animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Features Title */}
          <div className="mb-8">
            <div className="h-8 w-64 bg-gray-700 rounded-lg animate-pulse mx-auto"></div>
          </div>

          {/* Features Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <div className="w-16 h-16 bg-gray-700 rounded-xl animate-pulse mb-4"></div>
                <div className="h-5 w-32 bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-full bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* CTA Section Skeleton */}
          <div className="bg-maroon-600/20 backdrop-blur-sm rounded-3xl p-12 text-center border border-maroon-700">
            <div className="h-8 w-64 bg-gray-700 rounded-lg animate-pulse mx-auto mb-4"></div>
            <div className="h-6 w-96 bg-gray-700 rounded animate-pulse mx-auto mb-8"></div>
            <div className="h-14 w-48 bg-gray-700 rounded-xl animate-pulse mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      {/* Content Skeleton */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Title Skeleton */}
          <div className="mb-8">
            <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse mb-3"></div>
            <div className="h-6 w-96 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Stats Bar Skeleton */}
          <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Card Header */}
                <div className="h-24 bg-gray-200 animate-pulse"></div>
                
                {/* Card Content */}
                <div className="pt-12 px-6 pb-6">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-4"></div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
            <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuspenseLoader;
