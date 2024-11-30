
'use client';

import { useState } from 'react';
import { Terminal, Calendar, Book, Settings, HelpCircle } from 'lucide-react';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-slate-800 text-white transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <h1 className="text-xl font-bold mb-8">Cyber-Adventskalender</h1>
          
          <nav className="space-y-2">
            <a href="/calendar" className="flex items-center gap-3 p-2 rounded hover:bg-slate-700">
              <Calendar className="w-5 h-5" />
              Kalender
            </a>
            <a href="/challenges" className="flex items-center gap-3 p-2 rounded hover:bg-slate-700">
              <Terminal className="w-5 h-5" />
              Challenges
            </a>
            <a href="/story" className="flex items-center gap-3 p-2 rounded hover:bg-slate-700">
              <Book className="w-5 h-5" />
              Geschichte
            </a>
            <a href="/help" className="flex items-center gap-3 p-2 rounded hover:bg-slate-700">
              <HelpCircle className="w-5 h-5" />
              Hilfe
            </a>
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
          <a href="/settings" className="flex items-center gap-3 p-2 rounded hover:bg-slate-700">
            <Settings className="w-5 h-5" />
            Einstellungen
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-8">
          {children}
        </div>
      </main>

      {/* Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-slate-700 rounded-full hover:bg-slate-600"
      >
        <Terminal className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default RootLayout;
