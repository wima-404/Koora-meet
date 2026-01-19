import React from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from '../services/storage';
import { Button } from '../components/UI';
import { Users, MessageCircle, MapPin, Calendar } from 'lucide-react';

export default function Dashboard() {
    const user = AuthService.getCurrentUser();

    return (
        <div className="flex flex-col pt-8 pb-20">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Bonjour, {user?.prenom} ! 👋</h1>
                <p className="text-gray-400">Prêt pour le match ?</p>
            </div>

            {/* Match Card */}
            <div className="card bg-gradient-to-r from-red-600 to-red-800 text-white mb-6">
                <h3 className="font-bold text-lg mb-2">Prochain Match</h3>
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🇲🇦</span>
                        <span className="font-bold">MAR</span>
                    </div>
                    <span className="font-bold text-xl">VS</span>
                    <div className="flex items-center gap-2">
                        <span className="font-bold">ESP</span>
                        <span className="text-2xl">🇪🇸</span>
                    </div>
                </div>
                <div className="text-sm opacity-90 flex items-center gap-2">
                    <Calendar size={14} /> 20:00 • Grand Stade Casablanca
                </div>
            </div>

            {/* Quick Actions */}
            <h3 className="font-bold text-lg mb-4">Accès Rapide</h3>
            <div className="grid grid-cols-2 gap-4">
                <Link to="/groups" className="card flex flex-col items-center justify-center p-4 hover:bg-slate-700 transition-colors">
                    <Users size={32} className="text-[var(--accent-primary)] mb-2" />
                    <span className="font-bold">Groupes</span>
                </Link>

                <Link to="/chatbot" className="card flex flex-col items-center justify-center p-4 hover:bg-slate-700 transition-colors">
                    <MessageCircle size={32} className="text-green-500 mb-2" />
                    <span className="font-bold">Assistant IA</span>
                </Link>

                <div className="card flex flex-col items-center justify-center p-4 opacity-70">
                    <MapPin size={32} className="text-blue-400 mb-2" />
                    <span className="font-bold">Fan Zones</span>
                    <span className="text-xs text-center text-gray-400">(Bientôt)</span>
                </div>

                <div className="card flex flex-col items-center justify-center p-4 opacity-70">
                    <Calendar size={32} className="text-yellow-500 mb-2" />
                    <span className="font-bold">Events</span>
                    <span className="text-xs text-center text-gray-400">(Bientôt)</span>
                </div>
            </div>
        </div>
    );
}
