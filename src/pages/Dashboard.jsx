import React from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from '../services/storage';
import { Button } from '../components/UI';
import { Calendar, MapPin, Users, Flame, ChevronRight, Bell } from 'lucide-react';

export default function Dashboard() {
    const user = AuthService.getCurrentUser();

    const MatchCard = () => (
        <div style={{
            background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1510051640316-54084b11492e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            color: 'white',
            marginBottom: '2rem',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--border-color)'
        }}>
            <div className="flex justify-between items-start mb-8">
                <div className="bg-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Next Match
                </div>
                <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <Calendar size={12} /> Tomorrow, 20:00
                </div>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-black mb-1">MOROCCO</h2>
                    <div className="text-sm opacity-75">Atlas Lions</div>
                </div>
                <div className="text-4xl font-black opacity-50">VS</div>
                <div className="text-right">
                    <h2 className="text-3xl font-black mb-1">PORTUGAL</h2>
                    <div className="text-sm opacity-75">Seleção</div>
                </div>
            </div>

            <div className="flex gap-3">
                <Button variant="primary" style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>
                    View Squad
                </Button>
                <button className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors font-bold text-sm">
                    Stats
                </button>
            </div>
        </div>
    );

    const QuickAction = ({ icon: Icon, title, desc, color }) => (
        <div className="card hover:border-red-500/50 transition-colors cursor-pointer group">
            <div className={`p-3 rounded-full w-fit mb-4 ${color} bg-opacity-20`}>
                <Icon size={24} className={color.replace('bg-', 'text-')} />
            </div>
            <h3 className="text-lg font-bold mb-1">{title}</h3>
            <p className="text-sm text-gray-500 mb-4">{desc}</p>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                <ChevronRight size={16} />
            </div>
        </div>
    );

    return (
        <div className="flex flex-col lg:flex-row gap-8 pb-20 pt-4">
            {/* Main Content */}
            <div className="flex-1">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl mb-1">Welcome back, {user?.prenom}! 👋</h1>
                        <p className="text-gray-400">Ready for the next match?</p>
                    </div>
                    <button className="p-3 bg-white/5 rounded-full hover:bg-white/10">
                        <Bell size={24} />
                    </button>
                </header>

                <MatchCard />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <Link to="/groups/create">
                        <QuickAction
                            icon={Flame}
                            title="Host a Watch Party"
                            desc="Gather your squad for the game."
                            color="bg-orange-500"
                        />
                    </Link>
                    <Link to="/groups">
                        <QuickAction
                            icon={Users}
                            title="Find a Community"
                            desc="Join local fans near you."
                            color="bg-blue-500"
                        />
                    </Link>
                </div>

                <h3 className="text-xl font-bold mb-4">Community Feed</h3>
                {/* Feed Post Mockup */}
                <div className="card">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden">
                            <img src="https://i.pravatar.cc/150?img=11" alt="User" />
                        </div>
                        <div>
                            <div className="font-bold">Hassan Break</div>
                            <div className="text-xs text-gray-500">2 hours ago • Rabat</div>
                        </div>
                    </div>
                    <p className="mb-4 text-gray-300">
                        Anyone heading to the fan zone tonight? predictions are wild for the match! 🔥🇲🇦
                    </p>
                    <div className="flex gap-4 text-sm text-gray-500 border-t border-white/5 pt-4">
                        <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">❤️ 245</span>
                        <span className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">💬 18 Comments</span>
                    </div>
                </div>
            </div>

            {/* Right Sidebar (Desktop only usually, but responsive checks apply) */}
            <div className="hidden lg:block w-[350px]">
                <div className="card sticky top-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Upcoming Matches</h3>
                        <span className="text-xs text-red-500 cursor-pointer">View All</span>
                    </div>

                    {/* Mini Match Item */}
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg mb-2">
                        <div className="flex items-center gap-2">
                            <span>🇫🇷</span>
                            <span className="font-bold">FRA</span>
                        </div>
                        <div className="text-xs text-gray-500">20:00</div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold">BRA</span>
                            <span>🇧🇷</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
