import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../services/storage';
import { Button, Input } from '../components/UI';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        age: '',
        ville: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            // Basic validation
            if (!formData.email || !formData.password || !formData.nom) {
                throw new Error("Veuillez remplir les champs obligatoires");
            }

            AuthService.register(formData);
            // Redirect to profile setup or dashboard? Dashboard for now as per MVP.
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container flex flex-col items-center justify-center">
            <div className="card w-full">
                <h1 className="text-center" style={{ marginBottom: '2rem' }}>Inscription</h1>

                {error && <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                        <Input
                            label="Nom"
                            id="nom"
                            value={formData.nom}
                            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                            required
                        />
                        <Input
                            label="Prénom"
                            id="prenom"
                            value={formData.prenom}
                            onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                            required
                        />
                    </div>

                    <Input
                        label="Email"
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <Input
                        label="Mot de passe"
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />

                    <div className="flex gap-2">
                        <Input
                            label="Âge"
                            type="number"
                            id="age"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        />
                        <Input
                            label="Ville"
                            id="ville"
                            value={formData.ville}
                            onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                        />
                    </div>

                    <Button type="submit" style={{ marginTop: '1rem' }}>S'inscrire</Button>
                </form>

                <p className="text-center" style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
                    Déjà un compte ? <Link to="/login" style={{ color: 'var(--accent-primary)' }}>Se connecter</Link>
                </p>
            </div>
        </div>
    );
}
