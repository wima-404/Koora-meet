import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChatService, AuthService, GroupService } from '../services/storage';
import { Button, Input } from '../components/UI';
import { ArrowLeft, Send } from 'lucide-react';

export default function ChatRoom() {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [groupName, setGroupName] = useState('');
    const bottomRef = useRef(null);
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        // Load group details
        const groups = GroupService.getAllGroups();
        const group = groups.find(g => g.id === groupId);
        if (group) setGroupName(group.name);

        // Load messages initially
        loadMessages();

        // Polling simulation
        const interval = setInterval(loadMessages, 2000);
        return () => clearInterval(interval);
    }, [groupId]);

    const loadMessages = () => {
        const msgs = ChatService.getMessages(groupId);
        setMessages(msgs);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        ChatService.sendMessage(groupId, newMessage);
        setNewMessage('');
        loadMessages();
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)]"> {/* Subtract bottom nav height */}
            {/* Header */}
            <div className="flex items-center gap-4 p-4 border-b border-gray-700 bg-[var(--bg-card)]">
                <button onClick={() => navigate('/groups')} className="p-2">
                    <ArrowLeft />
                </button>
                <h1 className="text-xl font-bold">{groupName || 'Chat'}</h1>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {messages.map(msg => {
                    const isMe = msg.senderId === currentUser.id;
                    return (
                        <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                            <div
                                className={`max-w-[80%] p-3 rounded-lg ${isMe
                                        ? 'bg-[var(--accent-primary)] text-white'
                                        : 'bg-gray-700 text-gray-200'
                                    }`}
                            >
                                {!isMe && <div className="text-xs font-bold text-gray-400 mb-1">{msg.senderName}</div>}
                                <div>{msg.text}</div>
                                <div className="text-[10px] opacity-70 mt-1 text-right">
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-[var(--bg-card)] border-t border-gray-700">
                <form onSubmit={handleSend} className="flex gap-2">
                    <input
                        className="flex-1 p-2 rounded bg-slate-800 border border-slate-600 text-white"
                        placeholder="Votre message..."
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                    />
                    <Button type="submit" style={{ width: 'auto', padding: '0.5rem 1rem' }}>
                        <Send size={20} />
                    </Button>
                </form>
            </div>
        </div>
    );
}
