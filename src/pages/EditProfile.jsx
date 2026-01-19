import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/storage';
import { Button, Input } from '../components/UI';
import { ArrowLeft } from 'lucide-react';

export default function EditProfile() {
    const navigate = useNavigate();
    const user = AuthService.getCurrentUser();

    const [formData, setFormData] = useState({
        nom: user?.nom || '',
        prenom: user?.prenom || '',
        ville: user?.ville || '',
        equipe: user?.equipe || '',
        emplacement: user?.emplacement || 'Au Maroc',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        AuthService.updateProfile(formData);
        navigate('/profile');
    };

    return (
        <div className="flex flex-col pt-4">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="p-2">
                    <ArrowLeft />
                </button>
                <h1 className="text-xl font-bold">Modifier le profil</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    label="Nom"
                    value={formData.nom}
                    onChange={e => setFormData({ ...formData, nom: e.target.value })}
                />
                <Input
                    label="Prénom"
                    value={formData.prenom}
                    onChange={e => setFormData({ ...formData, prenom: e.target.value })}
                />
                <Input
                    label="Ville"
                    value={formData.ville}
                    onChange={e => setFormData({ ...formData, ville: e.target.value })}
                />

                <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>Équipe supportée</label>
                    <select
                        className="input-field"
                        value={formData.equipe}
                        onChange={e => setFormData({ ...formData, equipe: e.target.value })}
                    >
                        <option value="Maroc">Maroc 🇲🇦</option>
                        <option value="France">France 🇫🇷</option>
                        <option value="Espagne">Espagne 🇪🇸</option>
                        <option value="Portugal">Portugal 🇵🇹</option>
                        <option value="Argentine">Argentine 🇦🇷</option>
                    </select>
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>Emplacement actuel</label>
                    <select
                        className="input-field"
                        value={formData.emplacement}
                        onChange={e => setFormData({ ...formData, emplacement: e.target.value })}
                    >
                        <option value="Au Maroc">Au Maroc</option>
                        <option value="Hors Maroc">Hors Maroc</option>
                    </select>
                </div>

                <Button type="submit" variant="primary">Enregistrer</Button>
            </form>
        </div>
    );
}
