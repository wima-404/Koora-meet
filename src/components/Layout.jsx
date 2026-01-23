import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, User, Users, MessageCircle, Settings, Plus, LogOut, Shield, BarChart2, Search, Ticket, Trophy, Car, Sparkles } from 'lucide-react';
import { Button } from './UI';

export default function Layout() {
    const location = useLocation();

    const SidebarItem = ({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to;
        return (
            <Link
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${isActive
                    ? 'bg-red-600/10 text-red-500 font-black border-l-4 border-red-500 shadow-lg shadow-red-600/5'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
            >
                <Icon size={20} className={`${isActive ? 'text-red-500' : 'text-gray-500 group-hover:text-red-500'} transition-colors`} />
                <span className="text-sm tracking-tight">{label}</span>
            </Link>
        );
    };

    return (
        <div className="flex min-h-screen bg-[var(--bg-dark)] text-white font-sans selection:bg-red-500/30">

            {/* --- Desktop Left Sidebar --- */}
            <aside className="hidden lg:flex flex-col w-72 fixed left-0 top-0 bottom-0 bg-[var(--bg-card)]/80 backdrop-blur-xl border-r border-white/5 p-8 z-50">
                <div className="flex items-center gap-4 mb-12 px-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 border-2 border-white/10 shadow-2xl shadow-red-600/20 overflow-hidden group hover:scale-105 transition-transform">
                        <img src="/logo.jpg" alt="Koora Meet" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black tracking-tighter leading-none">Koora Meet</span>
                        <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mt-1">World Cup 2030</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-1.5">
                    <div className="px-4 mb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Main Menu</div>
                    <SidebarItem to="/dashboard" icon={Home} label="Dashboard" />
                    <SidebarItem to="/teams" icon={Shield} label="Qualified Teams" />
                    <SidebarItem to="/stats" icon={BarChart2} label="Tournament Stats" />
                    <SidebarItem to="/groups" icon={Users} label="Fan Groups" />
                    <SidebarItem to="/search" icon={Search} label="Find New Fans" />

                    <div className="pt-6 pb-2 px-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Experiences</div>
                    <SidebarItem to="/tickets" icon={Ticket} label="Get Tickets" />
                    <SidebarItem to="/predictions" icon={Trophy} label="Win Prizes" />
                    <SidebarItem to="/carpool" icon={Car} label="Koora Ride" />

                    <div className="pt-6 border-t border-white/5 mt-4">
                        <SidebarItem to="/settings" icon={Settings} label="App Settings" />
                    </div>
                </nav>

                <div className="mt-8">
                    <Link to="/dashboard">
                        <Button variant="primary" className="!w-full h-14 flex items-center gap-3 justify-center shadow-red-600/30 shadow-xl hover:shadow-2xl transition-all">
                            <Plus size={20} />
                            <span className="text-sm font-black uppercase tracking-widest">New Post</span>
                        </Button>
                    </Link>
                </div>
            </aside>

            {/* --- Main Content Area --- */}
            <main className="flex-1 lg:ml-72 w-full px-6 lg:px-12 max-w-[1400px]">
                <Outlet />
            </main>

            {/* --- Mobile Bottom Nav --- */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg-card)]/90 backdrop-blur-2xl border-t border-white/5 flex justify-around p-4 z-50 pb-safe">
                <Link to="/dashboard" className={`p-3 rounded-2xl transition-all ${location.pathname === '/dashboard' ? 'bg-red-600/10 text-red-500' : 'text-gray-500'}`}><Home size={24} /></Link>
                <Link to="/groups" className={`p-3 rounded-2xl transition-all ${location.pathname === '/groups' ? 'bg-red-600/10 text-red-500' : 'text-gray-500'}`}><Users size={24} /></Link>
                <div className="relative -top-8">
                    <Link to="/groups/create" className="flex items-center justify-center w-16 h-16 bg-red-600 rounded-[2rem] shadow-2xl shadow-red-600/40 text-white animate-glow transform hover:scale-110 transition-all border-4 border-[var(--bg-dark)]">
                        <Plus size={32} />
                    </Link>
                </div>
                <Link to="/chatbot" className={`p-3 rounded-2xl transition-all ${location.pathname === '/chatbot' ? 'bg-red-600/10 text-red-500' : 'text-gray-500'}`}><MessageCircle size={24} /></Link>
                <Link to="/profile" className={`p-3 rounded-2xl transition-all ${location.pathname === '/profile' ? 'bg-red-600/10 text-red-500' : 'text-gray-500'}`}><User size={24} /></Link>
            </nav>

            {/* --- Floating AI Chatbot Button (Desktop) --- */}
            <Link
                to="/chatbot"
                className="hidden lg:flex fixed bottom-10 right-10 glass-morphism border border-red-500/20 text-white px-6 py-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-105 hover:border-red-500/50 transition-all z-50 items-center gap-4 group animate-float"
            >
                <div className="relative">
                    <MessageCircle size={24} className="text-red-500" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--bg-dark)] animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors">Ask Koora</span>
                    <span className="text-sm font-black text-red-500">AI ASSISTANT</span>
                </div>
                <div className="absolute -top-14 right-0 bg-white text-black text-[10px] font-black px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-2xl pointer-events-none whitespace-nowrap">
                    👋 Need help? I'm online!
                </div>
            </Link>

        </div>
    );
}

