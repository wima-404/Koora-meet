import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../services/storage';
import { Button, Input } from '../components/UI';
import { ArrowRight } from 'lucide-react';

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
        <div className="split-layout">
            {/* Left Side - Visual */}
            <div className="split-left">
                <h1 style={{ fontSize: '4rem', lineHeight: '1.1', marginBottom: '2rem' }}>
                    Experience the <br />
                    <span style={{ color: 'var(--accent-primary)' }}>World Cup 2030</span><br />
                    like never before.
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#cbd5e1', maxWidth: '80%' }}>
                    Connect with your tribe, find the best fan zones, and share the passion of every match.
                </p>
            </div>

            {/* Right Side - Form */}
            <div className="split-right">
                <div className="w-full max-w-[400px] mx-auto">
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                        Enter your credentials to access the locker room.
                    </p>

                    {error && (
                        <div style={{
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid var(--accent-primary)',
                            color: 'var(--accent-primary)',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '2rem'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />

                        <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', cursor: 'pointer' }}>
                                Forgot Password?
                            </span>
                        </div>

                        <Button type="submit" variant="primary">
                            Log In <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                        </Button>
                    </form>

                    <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        Don't have an account? <Link to="/register" style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>Register Here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
