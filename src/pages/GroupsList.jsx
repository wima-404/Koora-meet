import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GroupService, AuthService } from '../services/storage';
import { Button } from '../components/UI';
import { Plus, Users, Search, Filter } from 'lucide-react';

export default function GroupsList() {
    const [groups, setGroups] = useState([]);
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        loadGroups();
    }, []);

    const loadGroups = () => {
        setGroups(GroupService.getAllGroups());
    };

    const handleJoin = (groupId) => {
        try {
            GroupService.joinGroup(groupId);
            loadGroups();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="flex flex-col pt-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black mb-2">Fan Meets around you</h1>
                    <p className="text-gray-400">Find your squad and watch the games together.</p>
                </div>
                <Link to="/groups/create">
                    <Button variant="primary" className="shadow-lg shadow-red-600/20">
                        <Plus size={20} className="mr-2" /> Create Squad
                    </Button>
                </Link>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex gap-4 mb-8">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        className="w-full bg-[var(--bg-input)] border border-white/5 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                        placeholder="Search by team, location..."
                    />
                </div>
                <button className="px-4 rounded-full border border-white/10 bg-[var(--bg-card)] hover:bg-white/5 flex items-center gap-2">
                    <Filter size={18} /> <span className="hidden sm:inline">Filters</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groups.length === 0 ? (
                    <div className="col-span-full py-12 text-center border border-dashed border-gray-800 rounded-xl">
                        <Users size={48} className="mx-auto mb-4 text-gray-600" />
                        <p className="text-gray-400">No active fan meets found.</p>
                        <Link to="/groups/create" className="text-red-500 font-bold hover:underline">Start the first one!</Link>
                    </div>
                ) : (
                    groups.map(group => {
                        const isMember = group.participants.includes(currentUser.id);
                        const isFull = group.participants.length >= group.maxParticipants;

                        return (
                            <div key={group.id} className="card group hover:border-red-500/30 transition-all duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-xl group-hover:text-red-500 transition-colors">{group.name}</h3>
                                        <div className="flex gap-2 mt-2">
                                            <span className="text-xs px-2 py-1 rounded bg-red-900/20 text-red-500 border border-red-900/30 font-bold uppercase tracking-wide">
                                                {group.type}
                                            </span>
                                            <span className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-400 border border-gray-700">
                                                {group.equipe || 'General'}
                                            </span>
                                        </div>
                                    </div>
                                    {isMember && <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>}
                                </div>

                                <p className="text-sm text-gray-400 mb-6 line-clamp-2">{group.description}</p>

                                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                            {/* Mock avatars based on count */}
                                            {[...Array(Math.min(3, group.participants.length))].map((_, i) => (
                                                <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-[var(--bg-card)]"></div>
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-400 font-medium ml-1">
                                            {group.participants.length} / {group.maxParticipants} joined
                                        </span>
                                    </div>

                                    {isMember ? (
                                        <Link to={`/groups/${group.id}/chat`}>
                                            <Button variant="secondary" className="px-6 py-2 text-sm border-green-900/30 text-green-500 hover:bg-green-900/10">Enter Chat</Button>
                                        </Link>
                                    ) : (
                                        <Button
                                            variant="primary"
                                            className={`px-6 py-2 text-sm ${isFull ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                                            onClick={() => handleJoin(group.id)}
                                            disabled={isFull}
                                        >
                                            {isFull ? 'Full' : 'Join Squad'}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
