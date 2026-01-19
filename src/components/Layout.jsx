import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, User, Users, MessageCircle, Settings, Plus, LogOut } from 'lucide-react';
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
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center font-bold text-white">K</div>
                    <span className="text-xl font-black tracking-tight">Koora Meet</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <SidebarItem to="/dashboard" icon={Home} label="Dashboard" />
                    <SidebarItem to="/groups" icon={Users} label="Meets" />
                    <SidebarItem to="/chatbot" icon={MessageCircle} label="Assistant" />
                    <SidebarItem to="/profile" icon={User} label="My Profile" />
                    <div className="pt-4 border-t border-white/5 mt-4">
                        <SidebarItem to="/settings" icon={Settings} label="Settings" />
                    </div>
                </nav>

                <div className="mt-auto">
                    <Button variant="primary" className="w-full flex items-center gap-2 justify-center">
                        <Plus size={18} /> New Post
                    </Button>
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

        </div>
    );
}
