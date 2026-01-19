import React, { useState } from 'react';
import { Trophy, TrendingUp, Users, Calendar } from 'lucide-react';

export default function Stats() {
    const [activeTab, setActiveTab] = useState('standings');

    // Mock Data
    const groups = [
        {
            name: 'Group A',
            teams: [
                { name: 'Morocco', code: 'MAR', played: 2, won: 2, draw: 0, lost: 0, pts: 6, form: ['W', 'W'] },
                { name: 'Portugal', code: 'POR', played: 2, won: 1, draw: 1, lost: 0, pts: 4, form: ['D', 'W'] },
                { name: 'Spain', code: 'ESP', played: 2, won: 0, draw: 1, lost: 1, pts: 1, form: ['D', 'L'] },
                { name: 'Iran', code: 'IRN', played: 2, won: 0, draw: 0, lost: 2, pts: 0, form: ['L', 'L'] },
            ]
        },
        {
            name: 'Group B',
            teams: [
                { name: 'Brazil', code: 'BRA', played: 2, won: 2, draw: 0, lost: 0, pts: 6, form: ['W', 'W'] },
                { name: 'France', code: 'FRA', played: 2, won: 1, draw: 0, lost: 1, pts: 3, form: ['L', 'W'] },
                { name: 'Senegal', code: 'SEN', played: 2, won: 1, draw: 0, lost: 1, pts: 3, form: ['W', 'L'] },
                { name: 'Japan', code: 'JPN', played: 2, won: 0, draw: 0, lost: 2, pts: 0, form: ['L', 'L'] },
            ]
        }
    ];

    const scorers = [
        { name: 'Kylian Mbappé', team: 'FRA', goals: 4, assists: 1 },
        { name: 'Youssef En-Nesyri', team: 'MAR', goals: 3, assists: 0 },
        { name: 'Vinicius Jr', team: 'BRA', goals: 3, assists: 2 },
        { name: 'Cristiano Ronaldo', team: 'POR', goals: 2, assists: 0 },
    ];

    return (
        <div className="pb-24 pt-8">
            <header className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-black mb-1">Tournament Stats</h1>
                    <p className="text-gray-400">World Cup 2030 Overview</p>
                </div>
            </header>

            {/* Stats Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Matches Played', value: '24/64', icon: Calendar, color: 'text-blue-500' },
                    { label: 'Total Goals', value: '58', icon: Trophy, color: 'text-yellow-500' },
                    { label: 'Avg Goals/Match', value: '2.4', icon: TrendingUp, color: 'text-green-500' },
                    { label: 'Yellow Cards', value: '89', icon: Users, color: 'text-red-500' },
                ].map((stat, i) => (
                    <div key={i} className="card flex flex-col items-center text-center p-4 bg-white/5 border-white/5">
                        <stat.icon className={`mb-2 ${stat.color}`} size={24} />
                        <span className="text-2xl font-bold">{stat.value}</span>
                        <span className="text-xs text-gray-500 uppercase font-bold">{stat.label}</span>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-white/10">
                {['standings', 'scorers'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 px-2 text-sm font-bold uppercase transition-colors relative ${activeTab === tab ? 'text-red-500' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>}
                    </button>
                ))}
            </div>

            {/* Content */}
            {activeTab === 'standings' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {groups.map((group, i) => (
                        <div key={i} className="card p-0 overflow-hidden">
                            <div className="p-4 bg-white/5 font-bold border-b border-white/5">{group.name}</div>
                            <table className="w-full text-sm">
                                <thead className="text-gray-500 bg-black/20 text-xs uppercase">
                                    <tr>
                                        <th className="p-3 text-left">Team</th>
                                        <th className="p-3 text-center">MP</th>
                                        <th className="p-3 text-center">W-D-L</th>
                                        <th className="p-3 text-center">Pts</th>
                                        <th className="p-3 text-center">Form</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {group.teams.map((team, idx) => (
                                        <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                            <td className="p-3 font-bold flex items-center gap-2">
                                                <span className="w-6 text-center text-gray-600 font-mono text-xs">{idx + 1}</span>
                                                {team.name}
                                            </td>
                                            <td className="p-3 text-center text-gray-400">{team.played}</td>
                                            <td className="p-3 text-center text-gray-400">{team.won}-{team.draw}-{team.lost}</td>
                                            <td className="p-3 text-center font-bold text-white">{team.pts}</td>
                                            <td className="p-3 text-center flex justify-center gap-1">
                                                {team.form.map((f, k) => (
                                                    <span key={k} className={`w-4 h-4 rounded text-[10px] flex items-center justify-center font-bold ${f === 'W' ? 'bg-green-500/20 text-green-500' :
                                                            f === 'D' ? 'bg-gray-500/20 text-gray-400' :
                                                                'bg-red-500/20 text-red-500'
                                                        }`}>{f}</span>
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card p-0 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="text-gray-500 bg-black/20 text-xs uppercase">
                            <tr>
                                <th className="p-4 text-left">#</th>
                                <th className="p-4 text-left">Player</th>
                                <th className="p-4 text-center">Team</th>
                                <th className="p-4 text-center">Goals</th>
                                <th className="p-4 text-center">Assists</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scorers.map((player, idx) => (
                                <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-mono text-gray-500">{idx + 1}</td>
                                    <td className="p-4 font-bold text-lg">{player.name}</td>
                                    <td className="p-4 text-center font-bold text-gray-400">{player.team}</td>
                                    <td className="p-4 text-center text-red-500 font-black text-xl">{player.goals}</td>
                                    <td className="p-4 text-center text-gray-400">{player.assists}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
