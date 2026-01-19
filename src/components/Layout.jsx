import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, User, Users, MessageCircle } from 'lucide-react';

export default function Layout() {
    const location = useLocation();

    const NavItem = ({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to;
        return (
            <Link
                to={to}
                className={`flex flex-col items-center justify-center p-2 flex-1 ${isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'}`}
                style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
            >
                <Icon size={24} />
                <span style={{ fontSize: '0.75rem', marginTop: '4px' }}>{label}</span>
            </Link>
        );
    };

    return (
        <div className="container" style={{ paddingBottom: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
                <Outlet />
            </div>

            {/* Bottom Navigation */}
            <nav style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                maxWidth: '480px',
                margin: '0 auto',
                backgroundColor: 'var(--bg-card)',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-around',
                padding: '0.5rem 0',
                zIndex: 100
            }}>
                <NavItem to="/dashboard" icon={Home} label="Accueil" />
                <NavItem to="/groups" icon={Users} label="Groupes" />
                <NavItem to="/chatbot" icon={MessageCircle} label="Assistant" />
                <NavItem to="/profile" icon={User} label="Profil" />
            </nav>
        </div>
    );
}
