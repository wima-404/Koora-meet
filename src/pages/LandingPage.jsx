import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/UI';

export default function LandingPage() {
    return (
        <div className="container flex flex-col items-center justify-center text-center">
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
                Koora Meet
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                Vivez la Coupe du Monde 2030 comme jamais auparavant. Rejoignez la communauté !
            </p>

            <div className="w-full flex flex-col gap-2">
                <Link to="/register" className="w-full">
                    <Button variant="primary">Créer un compte</Button>
                </Link>
                <Link to="/login" className="w-full">
                    <Button variant="secondary">Se connecter</Button>
                </Link>
            </div>
        </div>
    );
}
