"use client";
import { useState } from 'react';
import { Sidebar } from './components/sidebar';
import Navbar from './components/navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      <div className={`hidden md:flex h-full flex-col fixed inset-y-0 z-50 transition-width duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
        <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      </div>
      <main className={`flex-1 h-full transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Navbar />
        {children}
      </main>
    </div>
  );
}
