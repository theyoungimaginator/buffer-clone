import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-muted/40">
      {/* Sidebar Placeholder */}
      <aside className="w-64 border-r bg-background p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Dashboard Nav</h2>
        <nav>
          {/* Add nav links here later */}
          <ul>
            <li className="mb-2"><a href="/dashboard" className="text-primary hover:underline">Dashboard</a></li>
            <li className="mb-2"><a href="/dashboard/scheduler" className="text-primary hover:underline">Scheduler</a></li>
            <li className="mb-2"><a href="/dashboard/posts" className="text-primary hover:underline">Posts</a></li>
            <li className="mb-2"><a href="/dashboard/analytics" className="text-primary hover:underline">Analytics</a></li>
            <li className="mb-2"><a href="/dashboard/settings" className="text-primary hover:underline">Settings</a></li>
          </ul>
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        {/* Top Bar Placeholder */}
        <header className="flex h-16 items-center justify-between border-b bg-background p-4">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          {/* User profile, notifications, etc. here */}
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet /> {/* Renders the nested route components (Dashboard, Scheduler, etc.) */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;