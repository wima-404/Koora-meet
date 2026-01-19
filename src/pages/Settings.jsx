import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/storage';
import { Button } from '../components/UI';
import { User, Bell, Volume2, Shield, LogOut, Moon, Globe, ChevronRight } from 'lucide-react';

export default function Settings() {
    const navigate = useNavigate();
    const user = AuthService.getCurrentUser();
    const [notifications, setNotifications] = useState(true);
    const [sound, setSound] = useState(true);

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    const SettingSection = ({ title, children }) => (
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-gray-400 font-bold uppercase text-xs tracking-wider mb-4 px-2">{title}</h3>
            <div className="bg-[var(--bg-card)] rounded-2xl border border-white/5 overflow-hidden">
                {children}
            </div>
        </div>
    );

    const SettingItem = ({ icon: Icon, label, value, onClick, type = 'link', isDestructive = false }) => (
        <div
            onClick={onClick}
            className={`flex items-center justify-between p-4 border-b border-white/5 last:border-0 cursor-pointer hover:bg-white/5 transition-colors ${isDestructive ? 'text-red-500' : 'text-white'}`}
        >
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDestructive ? 'bg-red-500/10' : 'bg-white/5'}`}>
                    <Icon size={20} className={isDestructive ? 'text-red-500' : 'text-gray-300'} />
                </div>
                <span className="font-medium">{label}</span>
            </div>

            {type === 'toggle' && (
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${value ? 'bg-green-500' : 'bg-gray-700'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${value ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
            )}

            {type === 'link' && <ChevronRight size={18} className="text-gray-500" />}

            {type === 'value' && <span className="text-gray-500 text-sm">{value}</span>}
        </div>
    );

    return (
        <div className="pb-24 pt-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-black mb-8 px-2">Settings</h1>

            {/* Profile Card */}
            <div className="flex items-center gap-4 bg-gradient-to-r from-red-900/40 to-black p-6 rounded-3xl border border-white/10 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="w-16 h-16 rounded-full bg-gray-700 border-2 border-white/20 overflow-hidden">
                    <img src={user?.photo || `https://i.pravatar.cc/150?u=${user?.id}`} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-bold">{user?.prenom} {user?.nom}</h2>
                    <p className="text-gray-400">{user?.email}</p>
                </div>
                <Button variant="secondary" onClick={() => navigate('/profile/edit')} className="text-xs px-4 py-2">
                    Edit
                </Button>
            </div>

            <SettingSection title="Preferences">
                <SettingItem
                    icon={Bell}
                    label="Notifications"
                    type="toggle"
                    value={notifications}
                    onClick={() => setNotifications(!notifications)}
                />
                <SettingItem
                    icon={Volume2}
                    label="Sound Effects"
                    type="toggle"
                    value={sound}
                    onClick={() => setSound(!sound)}
                />
                <SettingItem
                    icon={Moon}
                    label="Appearance"
                    type="value"
                    value="Dark Mode"
                />
                <SettingItem
                    icon={Globe}
                    label="Language"
                    type="value"
                    value="English (US)"
                />
            </SettingSection>

            <SettingSection title="My Fandom">
                <SettingItem
                    icon={Shield}
                    label="My Team"
                    type="value"
                    value={user?.equipe || 'Not Selected'}
                    onClick={() => navigate('/profile/edit')}
                />
            </SettingSection>

            <SettingSection title="Account">
                <SettingItem
                    icon={LogOut}
                    label="Log Out"
                    isDestructive
                    onClick={handleLogout}
                />
            </SettingSection>

            <p className="text-center text-gray-600 text-xs mt-8">
                Koora Meet v1.0.0 (Beta) • World Cup 2030 Edition
            </p>
        </div>
    );
}
