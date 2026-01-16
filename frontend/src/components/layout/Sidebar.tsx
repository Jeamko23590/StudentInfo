import { cn } from '@/utils';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={cn('w-64 bg-gray-50 border-r min-h-screen p-4', className)}>
      <nav className="space-y-2">
        <a href="#" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200">
          Dashboard
        </a>
        <a href="#" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200">
          Users
        </a>
        <a href="#" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200">
          Settings
        </a>
      </nav>
    </aside>
  );
}
