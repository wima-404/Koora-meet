import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, User, Users, MessageCircle, Settings, Plus, LogOut, Shield, BarChart2 } from 'lucide-react';
import { Button } from './UI';

export default function Layout() {
    const location = useLocation();

    const SidebarItem = ({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to;
        return (
            <Link
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                    ? 'bg-red-600/10 text-red-500 font-bold border-l-4 border-red-500'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
            >
                <Icon size={20} />
                <span>{label}</span>
            </Link>
        );
    };

    return (
        <div className="flex min-h-screen bg-[var(--bg-dark)]">

            {/* --- Desktop Left Sidebar --- */}
            <aside className="hidden lg:flex flex-col w-64 fixed left-0 top-0 bottom-0 bg-[var(--bg-card)] border-r border-white/5 p-6 z-50">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-600">
                        <img src="/logo.jpg" alt="Koora Meet" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xl font-black tracking-tight">Koora Meet</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <SidebarItem to="/dashboard" icon={Home} label="Dashboard" />
                    <SidebarItem to="/teams" icon={Shield} label="Teams" />
                    <SidebarItem to="/stats" icon={BarChart2} label="Stats" />
                    <SidebarItem to="/groups" icon={Users} label="Groups" />
                    <div className="pt-4 border-t border-white/5 mt-4">
                        <SidebarItem to="/settings" icon={Settings} label="Settings" />
                    </div>
                </nav>

                <div className="mt-auto">
                    <Link to="/dashboard">
                        <Button variant="primary" className="w-full flex items-center gap-2 justify-center">
                            <Plus size={18} /> Nouveau message
                        </Button>
                    </Link>
                </div>
            </aside>

            {/* --- Main Content Area --- */}
            <main className="flex-1 lg:ml-64 w-full px-4 lg:px-8 max-w-[1600px] mx-auto">
                <Outlet />
            </main>

            {/* --- Mobile Bottom Nav (Visible only on small screens) --- */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg-card)] border-t border-white/5 flex justify-around p-3 z-50 pb-safe">
                <Link to="/dashboard" className={`p-2 rounded-full ${location.pathname === '/dashboard' ? 'text-red-500' : 'text-gray-400'}`}><Home size={24} /></Link>
                <Link to="/groups" className={`p-2 rounded-full ${location.pathname === '/groups' ? 'text-red-500' : 'text-gray-400'}`}><Users size={24} /></Link>
                <div className="relative -top-6">
                    <Link to="/groups/create" className="flex items-center justify-center w-14 h-14 bg-red-600 rounded-full shadow-lg text-white">
                        <Plus size={28} />
                    </Link>
                </div>
                <Link to="/chatbot" className={`p-2 rounded-full ${location.pathname === '/chatbot' ? 'text-red-500' : 'text-gray-400'}`}><MessageCircle size={24} /></Link>
                <Link to="/profile" className={`p-2 rounded-full ${location.pathname === '/profile' ? 'text-red-500' : 'text-gray-400'}`}><User size={24} /></Link>
            </nav>

            {/* --- Floating AI Chatbot Button (Desktop) --- */}
            <Link
                to="/chatbot"
                className="hidden lg:flex fixed bottom-8 right-8 bg-black/50 backdrop-blur-md border border-red-500/50 text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform z-50 items-center gap-2 group"
            >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-bold pr-1">Koora AI</span>
                <MessageCircle size={20} className="text-red-500" />
                <div className="absolute -top-12 right-0 bg-white text-black text-xs font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Need help? Ask AI!
                </div>
            </Link>

        </div>
    );
}
