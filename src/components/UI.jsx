import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from '../services/storage';

// --- Button Component ---
export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    return (
        <button
            className={`btn btn-${variant} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

// --- Input Component ---
export const Input = ({ label, id, error, ...props }) => {
    return (
        <div className="input-group">
            {label && <label htmlFor={id} style={{ display: 'block', fontSize: '0.9rem', color: '#cbd5e1' }}>{label}</label>}
            <input
                id={id}
                className="input-field"
                {...props}
            />
            {error && <span style={{ color: 'var(--accent-primary)', fontSize: '0.8rem' }}>{error}</span>}
        </div>
    );
};

// --- ProtectedRoute Component ---
export const ProtectedRoute = ({ children }) => {
    const user = AuthService.getCurrentUser();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};
