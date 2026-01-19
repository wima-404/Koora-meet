import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GroupService, AuthService } from '../services/storage';
import { Button } from '../components/UI';
import { Plus, Users } from 'lucide-react';

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
            loadGroups(); // Refresh
            alert("Vous avez rejoint le groupe !");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="flex flex-col pt-4 pb-20"> {/* pb-20 for bottom nav space */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">Groupes de supporters</h1>
                <Link to="/groups/create">
                    <Button variant="primary" style={{ padding: '0.5rem 1rem' }}>
                        <Plus size={20} />
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col gap-4">
                {groups.length === 0 ? (
                    <p className="text-center text-gray-400 mt-10">Aucun groupe pour le moment. Créez-en un !</p>
                ) : (
                    groups.map(group => {
                        const isMember = group.participants.includes(currentUser.id);
                        const isFull = group.participants.length >= group.maxParticipants;

                        return (
                            <div key={group.id} className="card">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg">{group.name}</h3>
                                    <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300">
                                        {group.type}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-400 mb-4">{group.description}</p>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1 text-sm text-gray-400">
                                        <Users size={16} />
                                        <span>{group.participants.length} / {group.maxParticipants}</span>
                                    </div>

                                    {isMember ? (
                                        <Link to={`/groups/${group.id}/chat`}>
                                            <Button variant="secondary" className="px-4 py-2 text-sm">Discuter</Button>
                                        </Link>
                                    ) : (
                                        <Button
                                            variant="primary"
                                            className="px-4 py-2 text-sm"
                                            onClick={() => handleJoin(group.id)}
                                            disabled={isFull}
                                            style={{ opacity: isFull ? 0.5 : 1 }}
                                        >
                                            {isFull ? 'Complet' : 'Rejoindre'}
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
