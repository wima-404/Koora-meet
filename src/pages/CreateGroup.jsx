import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GroupService } from '../services/storage';
import { Button, Input } from '../components/UI';
import { ArrowLeft } from 'lucide-react';

export default function CreateGroup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: 'Amis', // Default
        maxParticipants: 4
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            GroupService.createGroup({
                ...formData,
                maxParticipants: parseInt(formData.maxParticipants)
            });
            navigate('/groups');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="flex flex-col pt-4">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="p-2">
                    <ArrowLeft />
                </button>
                <h1 className="text-xl font-bold">Nouveau Groupe</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    label="Nom du groupe"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                />

                <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>Description</label>
                    <textarea
                        className="input-field"
                        rows="3"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>Type de groupe</label>
                    <select
                        className="input-field"
                        value={formData.type}
                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                    >
                        <option value="Amis">Amis</option>
                        <option value="Famille">Famille</option>
                        <option value="Célibataire">Célibataire</option>
                    </select>
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>Nombre max de participants</label>
                    <select
                        className="input-field"
                        value={formData.maxParticipants}
                        onChange={e => setFormData({ ...formData, maxParticipants: e.target.value })}
                    >
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>

                <Button type="submit" variant="primary">Créer le groupe</Button>
            </form>
        </div>
    );
}
