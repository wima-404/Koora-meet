import React from 'react';
import { Search, MapPin } from 'lucide-react';

export default function Teams() {
    const teams = [
        { id: 'mar', name: 'Morocco', group: 'A', ranking: 11, color: 'from-red-600 to-green-600', code: 'MA' },
        { id: 'por', name: 'Portugal', group: 'A', ranking: 6, color: 'from-red-700 to-green-700', code: 'PT' },
        { id: 'esp', name: 'Spain', group: 'A', ranking: 8, color: 'from-yellow-500 to-red-600', code: 'ES' },
        { id: 'bra', name: 'Brazil', group: 'B', ranking: 3, color: 'from-yellow-400 to-green-600', code: 'BR' },
        { id: 'fra', name: 'France', group: 'B', ranking: 2, color: 'from-blue-600 to-red-500', code: 'FR' },
        { id: 'arg', name: 'Argentina', group: 'C', ranking: 1, color: 'from-cyan-400 to-white', code: 'AR' },
        { id: 'ger', name: 'Germany', group: 'C', ranking: 16, color: 'from-white to-black', code: 'DE' },
        { id: 'sen', name: 'Senegal', group: 'B', ranking: 18, color: 'from-green-600 to-yellow-500', code: 'SN' },
    ];

    return (
        <div className="pb-24 pt-8">
            <header className="mb-8">
                <h1 className="text-3xl font-black mb-4">Qualified Teams</h1>

                {/* Search Bar */}
                <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        className="w-full bg-[var(--bg-input)] border border-white/5 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                        placeholder="Search for a nation..."
                    />
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {teams.map(team => (
                    <div
                        key={team.id}
                        onClick={() => window.location.href = `/teams/${team.id}`} // Using href force for demo or useNavigate if available. Better refactor to useLink
                        className="card group hover:border-red-500/50 transition-all cursor-pointer relative overflow-hidden"
                    >
                        {/* Background Gradient */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${team.color} opacity-20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-40 transition-opacity`}></div>

                        <div className="flex justify-between items-start mb-6 relative">
                            <div className="w-16 h-16 rounded-full bg-gray-800 border-4 border-[var(--bg-card)] shadow-xl flex items-center justify-center text-2xl overflow-hidden">
                                <img
                                    src={`https://flagcdn.com/w160/${team.code.toLowerCase()}.png`}
                                    alt={team.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-xs font-bold bg-white/5 px-2 py-1 rounded text-gray-400">GRP {team.group}</span>
                        </div>

                        <div className="relative">
                            <h2 className="text-2xl font-black mb-1 group-hover:text-red-500 transition-colors">{team.name}</h2>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                <span>FIFA Rank: <b className="text-white">#{team.ranking}</b></span>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <MapPin size={12} /> Base Camp: Rabat
                            </div>
                            <span className="text-red-500 font-bold text-xs uppercase group-hover:underline">View Squad</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
