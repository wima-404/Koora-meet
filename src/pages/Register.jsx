import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../services/storage';
import { Button, Input } from '../components/UI';
import { ArrowRight, User, Users, GlassWater } from 'lucide-react'; // GlassWater as generic icon for Party/Solo

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        password: '',
        age: '',
        ville: 'Casablanca',
        equipe: 'Maroc',
        type: 'Friends' // Solo, Friends, Family
    });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (!formData.email || !formData.password || !formData.nom) {
                throw new Error("Required fields missing");
            }
            AuthService.register(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    const SelectionCard = ({ icon: Icon, label, value }) => (
        <div
            onClick={() => setFormData({ ...formData, type: value })}
            style={{
                flex: 1,
                padding: '1rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: formData.type === value ? 'var(--accent-primary)' : 'var(--bg-input)',
                border: `1px solid ${formData.type === value ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
            }}
        >
            <Icon size={24} color={formData.type === value ? 'white' : '#9ca3af'} />
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: formData.type === value ? 'white' : '#9ca3af' }}>{label}</span>
        </div>
    );

    return (
        <div className="split-layout">
            {/* Left Side - Visual */}
            <div className="split-left">
                <h1 style={{ fontSize: '3.5rem', lineHeight: '1.2', marginBottom: '2rem' }}>
                    Setup your <br />
                    <span style={{ color: 'var(--accent-primary)' }}>Fan Profile</span><br />
                    to join the action.
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#cbd5e1', maxWidth: '80%' }}>
                    We match you with the right crowd and customize the app with your team's colors.
                </p>
            </div>

            {/* Right Side - Form */}
            <div className="split-right">
                <div className="w-full max-w-[450px] mx-auto">
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Create Account</h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div style={{ flex: 1 }}>
                                <Input
                                    label="Full Name / Psuedo"
                                    placeholder="e.g. Hakim Ziyech"
                                    value={formData.nom}
                                    onChange={e => setFormData({ ...formData, nom: e.target.value })}
                                />
                            </div>
                            <div style={{ width: '80px' }}>
                                <Input
                                    label="Age"
                                    placeholder="25"
                                    value={formData.age}
                                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                                />
                            </div>
                        </div>

                        <Input
                            label="Email Address"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />

                        <div className="flex gap-4">
                            <div style={{ flex: 1 }}>
                                <Input
                                    label="City / Country"
                                    value={formData.ville}
                                    onChange={e => setFormData({ ...formData, ville: e.target.value })}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div className="input-group" style={{ marginBottom: 0 }}>
                                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>Favorite Team</label>
                                    <select
                                        className="input-field"
                                        style={{ marginTop: 0 }}
                                        value={formData.equipe}
                                        onChange={e => setFormData({ ...formData, equipe: e.target.value })}
                                    >
                                        <option value="Maroc">Maroc 🇲🇦</option>
                                        <option value="France">France 🇫🇷</option>
                                        <option value="Espagne">Espagne 🇪🇸</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.75rem' }}>
                                Who are you joining with?
                            </label>
                            <div className="flex gap-3">
                                <SelectionCard icon={User} label="Solo" value="Solo" />
                                <SelectionCard icon={Users} label="Friends" value="Friends" />
                                <SelectionCard icon={GlassWater} label="Couple" value="Couple" />
                                <SelectionCard icon={Users} label="Family" value="Family" />
                            </div>
                        </div>

                        <Button type="submit" variant="primary">
                            Start Your Journey <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                        </Button>
                    </form>

                    <div style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        Already part of the squad? <Link to="/login" style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>Log In here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
