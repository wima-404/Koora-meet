import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../services/storage';
import { Button, Input } from '../components/UI';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            AuthService.login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container flex flex-col items-center justify-center">
            <div className="card w-full">
                <h1 className="text-center" style={{ marginBottom: '2rem' }}>Connexion</h1>

                {error && <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
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

                    <Button type="submit" style={{ marginTop: '1rem' }}>Se connecter</Button>
                </form>

                <p className="text-center" style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
                    Pas encore de compte ? <Link to="/register" style={{ color: 'var(--accent-primary)' }}>S'inscrire</Link>
                </p>
            </div>
        </div>
    );
}
