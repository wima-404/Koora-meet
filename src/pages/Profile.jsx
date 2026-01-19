import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/storage';
import { Button } from '../components/UI';
import { LogOut, Edit, MapPin, Shield, Star } from 'lucide-react';

export default function Profile() {
    const navigate = useNavigate();
    const user = AuthService.getCurrentUser();

    if (!user) return null;

    const handleLogout = () => {
        AuthService.logout();
        navigate('/');
    };

    const getCountryCode = (teamName) => {
        if (!teamName) return 'ma';
        const map = {
            'Maroc': 'ma',
            'France': 'fr',
            'Espagne': 'es',
            'Portugal': 'pt',
            'Brazil': 'br',
            'Argentina': 'ar'
        };
        return map[teamName] || 'ma';
    };

    const countryCode = getCountryCode(user.equipe);
    const flagUrl = `https://flagcdn.com/w1600/${countryCode}.png`;
    const smallFlagUrl = `https://flagcdn.com/w80/${countryCode}.png`;

    return (
        <div className="flex flex-col lg:flex-row gap-8 pt-8 pb-20">

            {/* Left Banner Area (Desktop) */}
            <div className="lg:w-1/3">
                <div className="sticky top-8">
                    <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
                        Your Personal <br />
                        <span className="text-red-600">Locker Room</span>
                    </h1>
                    <p className="text-gray-400 mb-8 max-w-sm">
                        Customize your identity, manage your squad, and represent your colors for World Cup 2030.
                    </p>

                    <div className="flex -space-x-4 mb-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-12 h-12 rounded-full border-4 border-[var(--bg-dark)] bg-gray-700 overflow-hidden">
                                <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="Fan" />
                            </div>
                        ))}
                        <div className="w-12 h-12 rounded-full border-4 border-[var(--bg-dark)] bg-red-600 flex items-center justify-center font-bold text-xs">
                            +4K
                        </div>
                    </div>
                    <div className="flex gap-1 text-red-500 mb-8">
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <span className="text-gray-500 text-sm ml-2">Trusted by fans worldwide</span>
                    </div>
                </div>
            </div>

            {/* Right Profile Card */}
            <div className="flex-1">
                <div className="card relative overflow-hidden group">
                    {/* Header/Banner BG - DYNAMIC FLAG */}
                    <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden">
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                            style={{ backgroundImage: `url(${flagUrl})` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-card)]"></div>
                    </div>

                    <div className="relative pt-24 px-4 flex flex-col items-center mb-8">
                        <div className="relative mb-4">
                            <div className="w-32 h-32 rounded-full border-4 border-[var(--bg-card)] bg-gray-800 overflow-hidden shadow-2xl">
                                {user.photo ? <img src={user.photo} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-4xl">👤</div>}
                            </div>
                            <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full border-2 border-[var(--bg-card)] overflow-hidden shadow-lg">
                                <img src={smallFlagUrl} className="w-full h-full object-cover" />
                            </div>
                            <Link to="/profile/edit" className="absolute bottom-2 left-2 p-2 bg-red-600 rounded-full text-white shadow-lg hover:bg-red-500 transition-colors">
                                <Edit size={14} />
                            </Link>
                        </div>

                        <h2 className="text-2xl font-bold mb-1">{user.nom}</h2>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 text-gray-400"><MapPin size={14} /> {user.ville}</span>
                            <span className="px-2 py-0.5 rounded bg-green-900/50 text-green-400 font-bold text-xs border border-green-800">PRO MEMBER</span>
                        </div>
                    </div>

                    {/* Fields Section */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold flex items-center gap-2 text-red-500">
                                    <Shield size={18} /> Personal Info
                                </h3>
                                <div className="flex gap-2">
                                    <Link to="/profile/edit" className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-white flex items-center gap-1 transition-colors">
                                        <Edit size={12} /> Modifier
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                                    <div className="text-xs text-gray-500 mb-1">Pseudo</div>
                                    <div className="font-semibold">{user.nom || user.email.split('@')[0]}</div>
                                </div>
                                <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                                    <div className="text-xs text-gray-500 mb-1">City</div>
                                    <div className="font-semibold">{user.ville}</div>
                                </div>
                                <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                                    <div className="text-xs text-gray-500 mb-1">Squad Role</div>
                                    <div className="font-semibold">Captain</div>
                                </div>
                                <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                                    <div className="text-xs text-gray-500 mb-1">Fan Since</div>
                                    <div className="font-semibold">{new Date(user.createdAt).getFullYear() || '2024'}</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold flex items-center gap-2 text-red-500 mb-4">
                                <Star size={18} /> Favorite Team
                            </h3>
                            <div className="p-4 rounded-xl bg-gradient-to-r from-red-900/40 to-black border border-red-900/30 flex items-center justify-between overflow-hidden relative">
                                {/* Subtle background flag texture for this card too */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-10"
                                    style={{ backgroundImage: `url(${flagUrl})` }}
                                ></div>

                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="text-3xl shadow-lg rounded-full overflow-hidden w-10 h-10 border border-white/10">
                                        <img src={smallFlagUrl} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg">{user.equipe}</div>
                                        <div className="text-xs text-green-400">Road to 2030 • Supporter</div>
                                    </div>
                                </div>
                                <Link to="/teams" className="text-xs font-bold bg-white/10 px-3 py-1 rounded hover:bg-white/20 relative z-10">See Team</Link>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5">
                            <Button onClick={handleLogout} variant="secondary" className="w-full border-red-900/50 text-red-500 hover:bg-red-900/10">
                                <LogOut size={18} className="mr-2" /> Sign Out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
