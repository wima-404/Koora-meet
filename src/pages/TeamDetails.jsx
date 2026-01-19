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
                { name: 'Yassine Bounou', pos: 'GK', club: 'Al-Hilal', photo: 'https://img.a.transfermarkt.technology/portrait/big/169727-1664867405.jpg?lm=1' },
                { name: 'Achraf Hakimi', pos: 'RB', club: 'PSG', photo: 'https://img.a.transfermarkt.technology/portrait/big/340341-1694087782.jpg?lm=1' },
                { name: 'Nayef Aguerd', pos: 'CB', club: 'Real Sociedad', photo: 'https://img.a.transfermarkt.technology/portrait/big/294043-1694087916.jpg?lm=1' },
                { name: 'Romain Saïss', pos: 'CB', club: 'Al-Sadd', photo: 'https://img.a.transfermarkt.technology/portrait/big/95201-1543510378.jpg?lm=1' },
                { name: 'Noussair Mazraoui', pos: 'LB', club: 'Man Utd', photo: 'https://img.a.transfermarkt.technology/portrait/big/340263-1696586959.jpg?lm=1' },
                { name: 'Sofyan Amrabat', pos: 'CDM', club: 'Fenerbahçe', photo: 'https://img.a.transfermarkt.technology/portrait/big/351566-1694088038.jpg?lm=1' },
                { name: 'Azzedine Ounahi', pos: 'CM', club: 'Panathinaikos', photo: 'https://img.a.transfermarkt.technology/portrait/big/486049-1668166765.jpg?lm=1' },
                { name: 'Hakim Ziyech', pos: 'RW', club: 'Galatasaray', photo: 'https://img.a.transfermarkt.technology/portrait/big/181415-1694087652.jpg?lm=1' },
                { name: 'Brahim Díaz', pos: 'CAM', club: 'Real Madrid', photo: 'https://img.a.transfermarkt.technology/portrait/big/411671-1694761243.jpg?lm=1' },
                { name: 'Amine Adli', pos: 'LW', club: 'Leverkusen', photo: 'https://img.a.transfermarkt.technology/portrait/big/605785-1725882623.jpg?lm=1' },
                { name: 'Youssef En-Nesyri', pos: 'ST', club: 'Fenerbahçe', photo: 'https://img.a.transfermarkt.technology/portrait/big/302782-1694087996.jpg?lm=1' }
            ],
            subs: [
                { name: 'Munir Mohamedi', pos: 'GK', club: 'Berkane', photo: 'https://img.a.transfermarkt.technology/portrait/big/117146-1621843542.jpg?lm=1' },
                { name: 'Abdel Abqar', pos: 'CB', club: 'Alavés', photo: 'https://img.a.transfermarkt.technology/portrait/big/650615-1668426992.jpg?lm=1' },
                { name: 'Amir Richardson', pos: 'CM', club: 'Fiorentina', photo: 'https://img.a.transfermarkt.technology/portrait/big/651169-1725029060.jpg?lm=1' },
                { name: 'Bilal El Khanouss', pos: 'CAM', club: 'Leicester', photo: 'https://img.a.transfermarkt.technology/portrait/big/675909-1725024992.jpg?lm=1' },
                { name: 'Eliesse Ben Seghir', pos: 'FW', club: 'Monaco', photo: 'https://img.a.transfermarkt.technology/portrait/big/815093-1725029220.jpg?lm=1' },
                { name: 'Soufiane Rahimi', pos: 'FW', club: 'Al-Ain', photo: 'https://img.a.transfermarkt.technology/portrait/big/605790-1668426832.jpg?lm=1' },
                { name: 'Ayoub El Kaabi', pos: 'ST', club: 'Olympiacos', photo: 'https://img.a.transfermarkt.technology/portrait/big/348434-1663842144.jpg?lm=1' }
            ]
        },
        'fra': {
            name: 'France', code: 'fr', color: 'from-blue-600 to-red-600', coach: 'Didier Deschamps',
            ranking: 2, titles: 2,
            starters: [
                { name: 'Mike Maignan', pos: 'GK', club: 'AC Milan', photo: 'https://img.a.transfermarkt.technology/portrait/big/182906-1694088144.png?lm=1' },
                { name: 'Jules Koundé', pos: 'RB', club: 'Barcelona', photo: 'https://img.a.transfermarkt.technology/portrait/big/341678-1694088254.jpg?lm=1' },
                { name: 'William Saliba', pos: 'CB', club: 'Arsenal', photo: 'https://img.a.transfermarkt.technology/portrait/big/495666-1694088312.jpg?lm=1' },
                { name: 'Ibrahima Konaté', pos: 'CB', club: 'Liverpool', photo: 'https://img.a.transfermarkt.technology/portrait/big/357460-1694088378.jpg?lm=1' },
                { name: 'Theo Hernández', pos: 'LB', club: 'AC Milan', photo: 'https://img.a.transfermarkt.technology/portrait/big/339340-1694088220.png?lm=1' },
                { name: 'N\'Golo Kanté', pos: 'CDM', club: 'Al-Ittihad', photo: 'https://img.a.transfermarkt.technology/portrait/big/225083-1631175856.jpg?lm=1' },
                { name: 'Aurélien Tchouaméni', pos: 'CM', club: 'Real Madrid', photo: 'https://img.a.transfermarkt.technology/portrait/big/587996-1694088449.jpg?lm=1' },
                { name: 'Ousmane Dembélé', pos: 'RW', club: 'PSG', photo: 'https://img.a.transfermarkt.technology/portrait/big/288230-1694088488.jpg?lm=1' },
                { name: 'Antoine Griezmann', pos: 'CAM', club: 'Atlético', photo: 'https://img.a.transfermarkt.technology/portrait/big/125781-1696586774.jpg?lm=1' },
                { name: 'Kylian Mbappé', pos: 'LW', club: 'Real Madrid', photo: 'https://img.a.transfermarkt.technology/portrait/big/342229-1727784337.png?lm=1' },
                { name: 'Marcus Thuram', pos: 'ST', club: 'Inter', photo: 'https://img.a.transfermarkt.technology/portrait/big/371435-1694088586.jpg?lm=1' }
            ],
            subs: [
                { name: 'Alphonse Areola', pos: 'GK', club: 'West Ham', photo: 'https://img.a.transfermarkt.technology/portrait/big/126380-1694088639.jpg?lm=1' },
                { name: 'Dayot Upamecano', pos: 'CB', club: 'Bayern', photo: 'https://img.a.transfermarkt.technology/portrait/big/344522-1694088698.jpg?lm=1' },
                { name: 'Eduardo Camavinga', pos: 'CM', club: 'Real Madrid', photo: 'https://img.a.transfermarkt.technology/portrait/big/566730-1694088753.jpg?lm=1' },
                { name: 'Bradley Barcola', pos: 'LW', club: 'PSG', photo: 'https://img.a.transfermarkt.technology/portrait/big/676005-1694088800.jpg?lm=1' },
                { name: 'Randal Kolo Muani', pos: 'ST', club: 'PSG', photo: 'https://img.a.transfermarkt.technology/portrait/big/381locally709-1694088847.jpg?lm=1' }
            ]
        },
        'esp': {
            name: 'Spain', code: 'es', color: 'from-red-600 to-yellow-500', coach: 'Luis de la Fuente',
            ranking: 3, titles: 1,
            starters: [
                { name: 'Unai Simón', pos: 'GK', club: 'Bilbao', photo: 'https://img.a.transfermarkt.technology/portrait/big/238223-1725029398.jpg?lm=1' },
                { name: 'Dani Carvajal', pos: 'RB', club: 'Real Madrid', photo: 'https://img.a.transfermarkt.technology/portrait/big/138927-1694515366.jpg?lm=1' },
                { name: 'Robin Le Normand', pos: 'CB', club: 'Atlético', photo: 'https://img.a.transfermarkt.technology/portrait/big/406357-1725029495.jpg?lm=1' },
                { name: 'Aymeric Laporte', pos: 'CB', club: 'Al-Nassr', photo: 'https://img.a.transfermarkt.technology/portrait/big/176553-1631187958.jpg?lm=1' },
                { name: 'Marc Cucurella', pos: 'LB', club: 'Chelsea', photo: 'https://img.a.transfermarkt.technology/portrait/big/289592-1725029536.jpg?lm=1' },
                { name: 'Rodri', pos: 'CDM', club: 'Man City', photo: 'https://img.a.transfermarkt.technology/portrait/big/357565-1725029575.jpg?lm=1' },
                { name: 'Fabián Ruiz', pos: 'CM', club: 'PSG', photo: 'https://img.a.transfermarkt.technology/portrait/big/257268-1725029609.jpg?lm=1' },
                { name: 'Lamine Yamal', pos: 'RW', club: 'Barcelona', photo: 'https://img.a.transfermarkt.technology/portrait/big/909028-1724828980.png?lm=1' },
                { name: 'Dani Olmo', pos: 'CAM', club: 'Barcelona', photo: 'https://img.a.transfermarkt.technology/portrait/big/255250-1725029685.jpg?lm=1' },
                { name: 'Nico Williams', pos: 'LW', club: 'Bilbao', photo: 'https://img.a.transfermarkt.technology/portrait/big/685239-1725029719.jpg?lm=1' },
                { name: 'Álvaro Morata', pos: 'ST', club: 'AC Milan', photo: 'https://img.a.transfermarkt.technology/portrait/big/128223-1725029758.jpg?lm=1' }
            ],
            subs: [
                { name: 'David Raya', pos: 'GK', club: 'Arsenal', photo: 'https://img.a.transfermarkt.technology/portrait/big/233410-1694515449.jpg?lm=1' },
                { name: 'Nacho', pos: 'CB', club: 'Al-Qadsiah', photo: 'https://img.a.transfermarkt.technology/portrait/big/58884-1631187924.jpg?lm=1' },
                { name: 'Pedri', pos: 'CM', club: 'Barcelona', photo: 'https://img.a.transfermarkt.technology/portrait/big/568171-1725029877.jpg?lm=1' },
                { name: 'Mikel Merino', pos: 'CM', club: 'Arsenal', photo: 'https://img.a.transfermarkt.technology/portrait/big/244753-1725029910.jpg?lm=1' },
                { name: 'Ferran Torres', pos: 'FW', club: 'Barcelona', photo: 'https://img.a.transfermarkt.technology/portrait/big/398184-1725029944.jpg?lm=1' }
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
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden border-2 border-green-900/50">
                                            <img
                                                src={player.photo || `https://ui-avatars.com/api/?name=${player.name}&background=1f2937&color=fff&size=128`}
                                                alt={player.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://ui-avatars.com/api/?name=${player.name}&background=1f2937&color=fff&size=128`;
                                                }}
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-green-900 text-[10px] font-bold px-1.5 py-0.5 rounded border border-green-500 text-green-100">
                                            {player.pos}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-white">{player.name}</div>
                                        <div className="text-xs text-gray-400">{player.club}</div>
                                    </div>
                                    <div className="text-xl font-black text-gray-700 opacity-50">#{i + 1}</div>
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
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border border-yellow-900/50">
                                            <img
                                                src={player.photo || `https://ui-avatars.com/api/?name=${player.name}&background=1f2937&color=fff&size=128`}
                                                alt={player.name}
                                                className="w-full h-full object-cover grayscale"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://ui-avatars.com/api/?name=${player.name}&background=1f2937&color=fff&size=128`;
                                                }}
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-yellow-900 text-[9px] font-bold px-1.5 py-0.5 rounded border border-yellow-500 text-yellow-100">
                                            {player.pos}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-gray-300">{player.name}</div>
                                        <div className="text-xs text-gray-500">{player.club}</div>
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
