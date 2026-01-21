import React, { useState, useEffect, useRef } from 'react';
import { AuthService } from '../services/storage';
import { Send, Bot, Sparkles } from 'lucide-react';
import { allTopics } from '../data/chatbotData';

export default function Chatbot() {
    const currentUser = AuthService.getCurrentUser();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [step, setStep] = useState('PRELIMINARY');
    const bottomRef = useRef(null);

    useEffect(() => {
        addBotMessage(`Bonjour ${currentUser.prenom} ! 👋 Je suis l'assistant Koora. Prêt pour la Coupe du Monde ?`);
        setTimeout(() => askNextQuestion(), 1000);
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const addBotMessage = (text, options = []) => {
        setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text, options }]);
    };

    const addUserMessage = (text) => {
        setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text }]);
    };

    const askNextQuestion = () => {
        addBotMessage("Vos informations sont-elles correctes pour le pass supporter ?", [
            { label: "✅ Oui, continuer", value: "START_MAIN" },
            { label: "✏️ Modifier", value: "EDIT_INFO" }
        ]);
    };

    const handleOptionClick = (value, label) => {
        addUserMessage(label);
        processInput(value);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        addUserMessage(input);
        processInput(input);
        setInput('');
    };

    const processInput = (text) => {
        // Normalize input
        const lowerInput = text.toLowerCase();

        // 1. Check for Menu Navigation (Legacy support for buttons)
        if (text === 'START_MAIN') {
            setStep('MAIN_MENU');
            addBotMessage("Ask me anything! Examples:\n- Tickets info 🎟️\n- Casablanca Stadium 🏟️\n- Morocco Team stats 🇲🇦\n- Where to sleep? 🏨");
            return;
        }

        // 2. Smart Search in KB
        // Simple scoring: count how many keywords match
        let bestMatch = null;
        let maxScore = 0;

        allTopics.forEach(topic => {
            let score = 0;
            topic.keywords.forEach(kw => {
                if (lowerInput.includes(kw)) score += 2; // Exact match
            });

            if (score > maxScore) {
                maxScore = score;
                bestMatch = topic;
            }
        });

        if (bestMatch && maxScore > 0) {
            setTimeout(() => addBotMessage(bestMatch.response), 500);
            return;
        }

        // 3. Fallback / Default
        const fallbacks = [
            "I'm learning more every day! Could you rephrase that? 🤔",
            "Not sure about that one yet. Try asking about 'Tickets', 'Stadiums', or 'Teams'.",
            "My scout report doesn't cover that. Ask me about World Cup 2030 cities! 🌍"
        ];
        setTimeout(() => addBotMessage(fallbacks[Math.floor(Math.random() * fallbacks.length)]), 500);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] lg:h-[calc(100vh-2rem)] bg-[var(--bg-dark)]">
            <div className="p-8 pb-0 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 text-red-500 border border-red-600/20 text-xs font-bold uppercase tracking-wider mb-4">
                    <Sparkles size={14} /> AI Powered
                </div>
                <h1 className="text-3xl font-black mb-2">Koora Assistant</h1>
                <p className="text-gray-400 max-w-md mx-auto lg:mx-0">
                    Your personal guide for World Cup 2030. Ask me about matches, tickets, or local spots.
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 lg:p-8 flex flex-col gap-6">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${msg.sender === 'bot' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-gray-700'
                            }`}>
                            {msg.sender === 'bot' ? <Bot size={20} /> : <div className="font-bold">ME</div>}
                        </div>

                        <div className={`flex flex-col gap-2 max-w-[85%] lg:max-w-[70%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                            <div
                                className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.sender === 'user'
                                    ? 'bg-white/10 text-white rounded-tr-none'
                                    : 'bg-[var(--bg-card)] border border-white/5 text-gray-200 rounded-tl-none shadow-xl'
                                    }`}
                            >
                                {msg.text}
                            </div>

                            {msg.sender === 'bot' && msg.options && (
                                <div className="flex flex-wrap gap-2">
                                    {msg.options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionClick(opt.value, opt.label)}
                                            className="px-4 py-2 bg-white/5 hover:bg-red-600 hover:text-white border border-white/10 rounded-xl text-sm transition-all duration-300 font-medium"
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="p-4 lg:p-8">
                <form onSubmit={handleSend} className="relative">
                    <input
                        className="w-full p-4 pr-14 rounded-2xl bg-[var(--bg-card)] border border-white/10 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all shadow-xl placeholder-gray-500"
                        placeholder="Ask anything..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-2 p-2 rounded-xl bg-red-600 text-white hover:bg-red-500 transition-colors"
                        disabled={!input.trim()}
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}
