import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, LayoutDashboard, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Global KPI Dashboard', icon: LayoutDashboard },
    { path: '/corporate-audit', label: 'Corporate Audit', icon: FileText },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar-dark border-r border-sidebar-darker flex flex-col">
        <div className="p-6 border-b border-sidebar-darker">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sidebar-text font-semibold text-lg">Cyber Security</h1>
              <p className="text-sidebar-text-muted text-xs">Audit Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-text-muted hover:bg-sidebar-darker hover:text-sidebar-text"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-sidebar-darker">
          <div className="text-sidebar-text-muted text-xs">
            <p className="font-semibold text-sidebar-text mb-1">Daimler Truck AG</p>
            <p>Global Cyber Security</p>
            <p className="mt-2">© 2025</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
