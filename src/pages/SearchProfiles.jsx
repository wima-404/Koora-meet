import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserService } from '../services/storage';
import { Search, MapPin, Shield } from 'lucide-react';

export default function SearchProfiles() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setUsers(UserService.getAllUsers());
    }, []);

    const filteredUsers = users.filter(user =>
        user.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.ville.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.equipe.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="pb-24 pt-8">
            <header className="mb-8">
                <h1 className="text-3xl font-black mb-4">Find Fans</h1>
                <p className="text-gray-400 mb-6">Connect with supporters from your team or city.</p>

                {/* Search Bar */}
                <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        className="w-full bg-[var(--bg-input)] border border-white/5 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                        placeholder="Search by name, city, or team..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredUsers.map(user => (
                    <Link
                        key={user.id}
                        to={`/profile/${user.id}`}
                        className="card group hover:border-red-500/50 transition-all cursor-pointer relative overflow-hidden block"
                    >
                        <div className="flex flex-col items-center p-6 text-center">
                            <div className="w-24 h-24 rounded-full bg-gray-800 border-4 border-[var(--bg-card)] shadow-xl overflow-hidden mb-4">
                                {user.photo ? (
                                    <img src={user.photo} alt={user.nom} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl">👤</div>
                                )}
                            </div>

                            <h2 className="text-xl font-bold mb-1 group-hover:text-red-500 transition-colors">{user.nom}</h2>
                            <div className="text-sm text-gray-500 mb-3 flex items-center gap-1 justify-center">
                                <MapPin size={12} /> {user.ville}
                            </div>

                            <div className="flex items-center gap-2 text-xs font-bold bg-white/5 px-3 py-1 rounded-full text-gray-300 border border-white/5">
                                <Shield size={12} className="text-red-500" />
                                {user.equipe}
                            </div>
                        </div>

                        {/* Hover Footer */}
                        <div className="absolute bottom-0 left-0 right-0 bg-red-600/90 text-white text-center py-2 translate-y-full group-hover:translate-y-0 transition-transform font-bold text-sm">
                            View Profile
                        </div>
                    </Link>
                ))}
            </div>

            {filteredUsers.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-lg">No fans found matching "{searchQuery}"</p>
                </div>
            )}
        </div>
    );
}
