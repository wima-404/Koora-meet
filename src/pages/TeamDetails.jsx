import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Shield, Trophy, MapPin, Calendar, Ticket, X, Check } from 'lucide-react';

export default function TeamDetails() {
    const { teamId } = useParams(); // e.g. 'mar', 'fra'
    const navigate = useNavigate();
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState(null);

    // Realistic Mock Data
    const teamsData = {
        'mar': {
            name: 'Morocco', code: 'ma', color: 'from-red-600 to-green-900', coach: 'Walid Regragui',
            ranking: 13, titles: 0,
            starters: [
                { name: 'Yassine Bounou', pos: 'GK', club: 'Al-Hilal' },
                { name: 'Achraf Hakimi', pos: 'RB', club: 'PSG' },
                { name: 'Nayef Aguerd', pos: 'CB', club: 'Real Sociedad' },
                { name: 'Romain Saïss', pos: 'CB', club: 'Al-Sadd' },
                { name: 'Noussair Mazraoui', pos: 'LB', club: 'Man Utd' },
                { name: 'Sofyan Amrabat', pos: 'CDM', club: 'Fenerbahçe' },
                { name: 'Azzedine Ounahi', pos: 'CM', club: 'Panathinaikos' },
                { name: 'Hakim Ziyech', pos: 'RW', club: 'Galatasaray' },
                { name: 'Brahim Díaz', pos: 'CAM', club: 'Real Madrid' },
                { name: 'Amine Adli', pos: 'LW', club: 'Leverkusen' },
                { name: 'Youssef En-Nesyri', pos: 'ST', club: 'Fenerbahçe' }
            ],
            subs: [
                { name: 'Munir Mohamedi', pos: 'GK', club: 'Berkane' },
                { name: 'Abdel Abqar', pos: 'CB', club: 'Alavés' },
                { name: 'Amir Richardson', pos: 'CM', club: 'Fiorentina' },
                { name: 'Bilal El Khanouss', pos: 'CAM', club: 'Leicester' },
                { name: 'Eliesse Ben Seghir', pos: 'FW', club: 'Monaco' },
                { name: 'Soufiane Rahimi', pos: 'FW', club: 'Al-Ain' },
                { name: 'Ayoub El Kaabi', pos: 'ST', club: 'Olympiacos' }
            ]
        },
        'fra': {
            name: 'France', code: 'fr', color: 'from-blue-600 to-red-600', coach: 'Didier Deschamps',
            ranking: 2, titles: 2,
            starters: [
                { name: 'Mike Maignan', pos: 'GK', club: 'AC Milan' },
                { name: 'Jules Koundé', pos: 'RB', club: 'Barcelona' },
                { name: 'William Saliba', pos: 'CB', club: 'Arsenal' },
                { name: 'Ibrahima Konaté', pos: 'CB', club: 'Liverpool' },
                { name: 'Theo Hernández', pos: 'LB', club: 'AC Milan' },
                { name: 'N\'Golo Kanté', pos: 'CDM', club: 'Al-Ittihad' },
                { name: 'Aurélien Tchouaméni', pos: 'CM', club: 'Real Madrid' },
                { name: 'Ousmane Dembélé', pos: 'RW', club: 'PSG' },
                { name: 'Antoine Griezmann', pos: 'CAM', club: 'Atlético' },
                { name: 'Kylian Mbappé', pos: 'LW', club: 'Real Madrid' },
                { name: 'Marcus Thuram', pos: 'ST', club: 'Inter' }
            ],
            subs: [
                { name: 'Alphonse Areola', pos: 'GK', club: 'West Ham' },
                { name: 'Dayot Upamecano', pos: 'CB', club: 'Bayern' },
                { name: 'Eduardo Camavinga', pos: 'CM', club: 'Real Madrid' },
                { name: 'Bradley Barcola', pos: 'LW', club: 'PSG' },
                { name: 'Randal Kolo Muani', pos: 'ST', club: 'PSG' }
            ]
        },
        'esp': {
            name: 'Spain', code: 'es', color: 'from-red-600 to-yellow-500', coach: 'Luis de la Fuente',
            ranking: 3, titles: 1,
            starters: [
                { name: 'Unai Simón', pos: 'GK', club: 'Bilbao' },
                { name: 'Dani Carvajal', pos: 'RB', club: 'Real Madrid' },
                { name: 'Robin Le Normand', pos: 'CB', club: 'Atlético' },
                { name: 'Aymeric Laporte', pos: 'CB', club: 'Al-Nassr' },
                { name: 'Marc Cucurella', pos: 'LB', club: 'Chelsea' },
                { name: 'Rodri', pos: 'CDM', club: 'Man City' },
                { name: 'Fabián Ruiz', pos: 'CM', club: 'PSG' },
                { name: 'Lamine Yamal', pos: 'RW', club: 'Barcelona' },
                { name: 'Dani Olmo', pos: 'CAM', club: 'Barcelona' },
                { name: 'Nico Williams', pos: 'LW', club: 'Bilbao' },
                { name: 'Álvaro Morata', pos: 'ST', club: 'AC Milan' }
            ],
            subs: [
                { name: 'David Raya', pos: 'GK', club: 'Arsenal' },
                { name: 'Nacho', pos: 'CB', club: 'Al-Qadsiah' },
                { name: 'Pedri', pos: 'CM', club: 'Barcelona' },
                { name: 'Mikel Merino', pos: 'CM', club: 'Arsenal' },
                { name: 'Ferran Torres', pos: 'FW', club: 'Barcelona' }
            ]
        },
        // Fallback
        'default': {
            name: 'Team', code: 'ma', color: 'from-gray-600 to-gray-900', coach: 'Unknown', ranking: 0, titles: 0,
            starters: [], subs: []
        }
    };

    const team = teamsData[teamId] || teamsData['default'];

    const handleTicketClick = (match) => {
        setSelectedMatch(match);
        setShowTicketModal(true);
    };

    return (
        <div className="pb-20">
            {/* Header with gradient */}
            <div className={`relative h-64 bg-gradient-to-b ${team.color} flex items-end p-6`}>
                <button onClick={() => navigate(-1)} className="absolute top-6 left-6 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-md">
                    <ArrowLeft size={24} />
                </button>
                <div className="absolute inset-0 bg-black/20"></div>

                <div className="relative z-10 flex items-end gap-6">
                    <div className="w-32 h-32 rounded-full border-4 border-[var(--bg-dark)] bg-white shadow-2xl flex items-center justify-center overflow-hidden">
                        <img
                            src={`https://flagcdn.com/w160/${team.code}.png`}
                            alt={team.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="mb-4">
                        <h1 className="text-4xl font-black text-white drop-shadow-lg">{team.name}</h1>
                        <div className="flex items-center gap-2 text-white/90 font-medium">
                            <span className="bg-white/20 px-2 py-0.5 rounded text-sm">Group F</span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-sm"><MapPin size={14} /> Rabat Base Camp</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 max-w-4xl mx-auto space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-white/5 text-center">
                        <div className="text-gray-500 text-xs uppercase font-bold mb-1">FIFA Rank</div>
                        <div className="text-2xl font-black">#{team.ranking}</div>
                    </div>
                    <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-white/5 text-center">
                        <div className="text-gray-500 text-xs uppercase font-bold mb-1">WC Titles</div>
                        <div className="text-2xl font-black">{team.titles}</div>
                    </div>
                    <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-white/5 text-center">
                        <div className="text-gray-500 text-xs uppercase font-bold mb-1">Coach</div>
                        <div className="text-lg font-bold truncate">{team.coach}</div>
                    </div>
                    <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-white/5 text-center">
                        <div className="text-gray-500 text-xs uppercase font-bold mb-1">Star Player</div>
                        <div className="text-lg font-bold truncate">{team.starters[8]?.name || 'Unknown'}</div>
                    </div>
                </div>

                {/* Squad List */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Starting XI */}
                    <div>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-400">
                            <User size={20} /> Starting XI
                        </h2>
                        <div className="space-y-3">
                            {team.starters.length > 0 ? team.starters.map((player, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-[var(--bg-card)] border border-white/5 hover:border-green-500/30 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-400">
                                        {player.pos}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold">{player.name}</div>
                                        <div className="text-xs text-gray-500">{player.club}</div>
                                    </div>
                                    <div className="text-lg font-black text-gray-700">#{i + 1}</div>
                                </div>
                            )) : <div className="text-gray-500">No data available</div>}
                        </div>
                    </div>

                    {/* Substitutes */}
                    <div>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-500">
                            <User size={20} /> Substitutes (7tiat)
                        </h2>
                        <div className="space-y-3">
                            {team.subs.length > 0 ? team.subs.map((player, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-[var(--bg-card)] border border-white/5 hover:border-yellow-500/30 transition-colors opacity-80">
                                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-500">
                                        {player.pos}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold">{player.name}</div>
                                        <div className="text-xs text-gray-600">{player.club}</div>
                                    </div>
                                </div>
                            )) : <div className="text-gray-500">No data available</div>}
                        </div>
                    </div>
                </div>

                {/* Schedule & Tickets */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Ticket className="text-red-500" /> Upcoming Matches
                    </h2>
                    <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row justify-between items-center bg-black/30 p-4 rounded-xl border-l-4 border-green-500 gap-4">
                            <div>
                                <div className="text-xs text-gray-400 mb-1">15 June 2030 • 20:00</div>
                                <div className="font-bold text-lg">{team.name} vs Croatia</div>
                                <div className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10} /> Grand Stade de Casablanca</div>
                            </div>
                            <button
                                onClick={() => handleTicketClick({ opponent: 'Croatia', date: '15 June', venue: 'Casablanca' })}
                                className="w-full sm:w-auto px-6 py-2 bg-red-600 rounded-full text-sm font-bold hover:bg-red-500 shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2"
                            >
                                <Ticket size={16} /> Buy Tickets
                            </button>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-center bg-black/30 p-4 rounded-xl border-l-4 border-gray-600 gap-4">
                            <div>
                                <div className="text-xs text-gray-400 mb-1">20 June 2030 • 16:00</div>
                                <div className="font-bold text-lg">Paraguay vs {team.name}</div>
                                <div className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10} /> Rabat Stadium</div>
                            </div>
                            <button
                                onClick={() => handleTicketClick({ opponent: 'Paraguay', date: '20 June', venue: 'Rabat' })}
                                className="w-full sm:w-auto px-6 py-2 bg-red-600 rounded-full text-sm font-bold hover:bg-red-500 shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2"
                            >
                                <Ticket size={16} /> Buy Tickets
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ticket Modal */}
            {showTicketModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[var(--bg-card)] w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-red-900/10">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <Ticket size={18} className="text-red-500" /> Select Tickets
                            </h3>
                            <button onClick={() => setShowTicketModal(false)} className="p-1 hover:bg-white/10 rounded-full"><X size={20} /></button>
                        </div>

                        <div className="p-6">
                            <div className="text-center mb-6">
                                <div className="text-sm text-gray-400 mb-1">{selectedMatch?.date} • {selectedMatch?.venue}</div>
                                <div className="text-xl font-black">{team.name} <span className="text-red-500">VS</span> {selectedMatch?.opponent}</div>
                            </div>

                            <div className="space-y-3 mb-6">
                                {['Category 3 (Fan Zone)', 'Category 2 (Standard)', 'Category 1 (Premium)', 'VIP Hospitality'].map((cat, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-white/10 hover:border-red-500/50 hover:bg-red-500/5 cursor-pointer transition-all group">
                                        <div>
                                            <div className="font-bold text-sm">{cat}</div>
                                            <div className="text-xs text-gray-500">Available</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold">${50 + (i * 50)}</div>
                                            <div className="w-5 h-5 rounded-full border-2 border-gray-600 group-hover:border-red-500 ml-auto mt-1"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button
                                className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-600/20"
                                onClick={() => {
                                    alert(`Tickets for ${team.name} vs ${selectedMatch?.opponent} purchased successfully! 🎟️`);
                                    setShowTicketModal(false);
                                }}
                            >
                                Confirm Purchase
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
