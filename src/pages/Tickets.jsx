import React, { useState } from 'react';
import { Ticket, Calendar, MapPin, Check, Info } from 'lucide-react';
import { Button } from '../components/UI';

export default function Tickets() {
    const [selectedCat, setSelectedCat] = useState(null);

    const matches = [
        {
            id: 1,
            teams: "Morocco vs Portugal",
            date: "Tomorrow, 22:50",
            venue: "Grand Stade de Casablanca",
            img: "https://images.unsplash.com/photo-1550853024-124d20153956?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            status: "Selling Fast"
        },
        {
            id: 2,
            teams: "Spain vs Italy",
            date: "Sat 17 Jun, 20:00",
            venue: "Santiago Bernabéu, Madrid",
            img: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            status: "Available"
        }
    ];

    const categories = [
        { id: 1, name: "Category 1", price: "2000 DH", desc: "Best view, central stands.", color: "bg-red-500" },
        { id: 2, name: "Category 2", price: "1200 DH", desc: "Corner views, great atmosphere.", color: "bg-orange-500" },
        { id: 3, name: "Category 3", price: "500 DH", desc: "Behind goals, intense fans.", color: "bg-green-600" },
    ];

    const handleBuy = () => {
        alert("Payment Gateway Simulation: Processing payment... \n\nSuccess! Tickets sent to your email.");
    };

    return (
        <div className="pb-24 pt-8">
            <header className="mb-8">
                <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
                    <Ticket className="text-red-500" size={32} />
                    Official Ticketing
                </h1>
                <p className="text-gray-400">Secure your seats for the 2030 World Cup.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {matches.map(match => (
                    <div key={match.id} className="card p-0 overflow-hidden hover:border-red-500/50 transition-colors group">
                        <div className="h-48 relative">
                            <img src={match.img} alt={match.teams} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-4 left-4">
                                <span className="bg-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg mb-2 inline-block">
                                    {match.status}
                                </span>
                                <h3 className="text-2xl font-black">{match.teams}</h3>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex gap-4 mb-6 text-gray-300 text-sm">
                                <div className="flex items-center gap-2"><Calendar size={16} /> {match.date}</div>
                                <div className="flex items-center gap-2"><MapPin size={16} /> {match.venue}</div>
                            </div>

                            <div className="space-y-3 mb-6">
                                {categories.map(cat => (
                                    <div
                                        key={cat.id}
                                        onClick={() => setSelectedCat(cat.id)}
                                        className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${selectedCat === cat.id
                                                ? 'border-red-500 bg-red-500/10'
                                                : 'border-white/10 hover:bg-white/5'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${cat.color}`}></div>
                                            <div>
                                                <div className="font-bold">{cat.name}</div>
                                                <div className="text-xs text-gray-400">{cat.desc}</div>
                                            </div>
                                        </div>
                                        <span className="font-mono font-bold text-lg">{cat.price}</span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                variant="primary"
                                className="w-full py-4 text-lg"
                                onClick={handleBuy}
                            >
                                {selectedCat ? 'Proceed to Checkout' : 'Select a Category'}
                            </Button>

                            <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                                <Info size={12} /> Powered by FIFA Secure Payment
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
