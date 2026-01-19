import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/storage';
import { Button } from '../components/UI';
import { LogOut, Edit } from 'lucide-react';

export default function Profile() {
    const navigate = useNavigate();
    const user = AuthService.getCurrentUser();

    if (!user) return null;

    const handleLogout = () => {
        AuthService.logout();
        navigate('/');
    };

    // Flag logic (Simulated)
    const getFlagUrl = (country) => {
        // Simple mapping for demo. In real app, store country code.
        const code = country?.toLowerCase().slice(0, 2) || 'ma'; // default Morocco
        return `https://flagcdn.com/w80/${code}.png`;
    };

    return (
        <div className="flex flex-col items-center pt-8">
            {/* Profile Header */}
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    backgroundColor: '#334155',
                    overflow: 'hidden',
                    border: '4px solid var(--bg-card)'
                }}>
                    {user.photo ? (
                        <img src={user.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div className="flex items-center justify-center h-full text-4xl">👤</div>
                    )}
                </div>

                {/* Flag Badge */}
                <div style={{
                    position: 'absolute',
                    bottom: '5px',
                    right: '5px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid var(--bg-dark)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>
                    <img
                        src={getFlagUrl('ma')} // Hardcoded to 'ma' for demo as user probably selected Morocco, or use user.paysOrigine logic
                        alt="Flag"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            </div>

            <h2 className="text-xl font-bold">{user.nom} {user.prenom}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Supporter: <span style={{ color: 'var(--accent-primary)' }}>{user.equipe || 'Maroc'}</span></p>

            {/* Stats / Info */}
            <div className="w-full grid grid-cols-2 gap-4 mt-8 mb-8 text-center" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="card text-center p-4">
                    <div className="text-sm text-gray-400">Ville</div>
                    <div className="font-bold">{user.ville || 'Non renseigné'}</div>
                </div>
                <div className="card text-center p-4">
                    <div className="text-sm text-gray-400">Âge</div>
                    <div className="font-bold">{user.age || '--'} ans</div>
                </div>
            </div>

            <div className="w-full flex flex-col gap-3">
                <Link to="/profile/edit" className="w-full">
                    <Button variant="secondary" className="w-full flex justify-center gap-2">
                        <Edit size={18} /> Modifier le profil
                    </Button>
                </Link>

                <Button onClick={handleLogout} variant="secondary" style={{ color: '#ef4444', borderColor: '#7f1d1d' }} className="w-full flex justify-center gap-2">
                    <LogOut size={18} /> Déconnexion
                </Button>
            </div>
        </div>
    );
}
