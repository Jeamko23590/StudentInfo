import { cn } from '@/utils';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <nav className={cn('bg-white shadow-sm border-b', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-gray-900">Logo</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">Dashboard</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Settings</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
