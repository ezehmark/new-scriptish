'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, BarChart3, Users, Settings, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HospitalDashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    href: '/hospital-dashboard',
    label: 'Dashboard',
    icon: Building2,
  },
  {
    href: '/hospital-dashboard/referrals',
    label: 'Referrals',
    icon: Users,
  },
  {
    href: '/hospital-dashboard/partners',
    label: 'Partners',
    icon: Building2,
  },
  {
    href: '/hospital-dashboard/analytics',
    label: 'Analytics',
    icon: BarChart3,
  },
];

export default function HospitalDashboardLayout({ children }: HospitalDashboardLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-primary/10 border-r border-border/30 transform transition-transform duration-300 lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border/30">
          <Link href="/hospital-dashboard" className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-accent" />
            <div>
              <h2 className="font-bold text-foreground">Scriptish</h2>
              <p className="text-xs text-foreground/50">Hospital</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = 
              pathname === item.href || 
              (item.href === '/hospital-dashboard' && pathname === '/hospital-dashboard') ||
              (item.href !== '/hospital-dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-accent/20 text-accent border border-accent/50'
                    : 'text-foreground/70 hover:bg-primary/30 hover:text-accent'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/30">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-foreground/70 hover:bg-primary/30 hover:text-red-400 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="lg:hidden border-b border-border/30 bg-primary/5 p-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6 text-accent" />
            ) : (
              <Menu className="w-6 h-6 text-accent" />
            )}
          </button>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
