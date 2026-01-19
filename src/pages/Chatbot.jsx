import React, { useState, useEffect, useRef } from 'react';
import { AuthService } from '../services/storage';
import { Send, Bot, Sparkles } from 'lucide-react';

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
        if (text === 'START_MAIN') {
            setTimeout(() => {
                setStep('MAIN_MENU');
                addBotMessage("Comment puis-je vous aider aujourd'hui ? 🏆", [
                    { label: "🏟️ Stade du match", value: "1" },
                    { label: "👕 Boutiques Officielles", value: "2" },
                    { label: "🎉 Fan Zones", value: "3" },
                    { label: "📍 Activités", value: "4" }
                ]);
            }, 500);
            return;
        }

        if (step === 'MAIN_MENU') {
            let response = "";
            let nextOptions = [];

            switch (text) {
                case "1":
                    response = "📍 Le prochain match du Maroc se jouera au **Grand Stade de Casablanca** à 20h00.";
                    break;
                case "2":
                    response = "🛍️ Vous trouverez les maillots officiels au **Morocco Mall** (2ème étage) ou à la boutique du stade.";
                    break;
                case "3":
                    response = "🎉 Les meilleures Fan Zones sont : \n1. Corniche Ain Diab\n2. Place Mohammed V\n3. Parc de la Ligue Arabe.";
                    break;
                case "4":
                    response = "Je peux vous recommander des activités selon vos goûts :";
                    nextOptions = [
                        { label: "🏛️ Culture & Histoire", value: "A" },
                        { label: "🥘 Gastronomie", value: "B" },
                        { label: "⚽ Sport & Aventure", value: "C" }
                    ];
                    setStep('ACTIVITIES');
                    break;
                default:
                    response = "Je n'ai pas compris. Veuillez choisir une option dans la liste 👇";
                    nextOptions = [
                        { label: "🏟️ Stade", value: "1" },
                        { label: "👕 Boutiques", value: "2" },
                        { label: "🎉 Fan Zones", value: "3" },
                        { label: "📍 Activités", value: "4" }
                    ];
            }
            setTimeout(() => addBotMessage(response, nextOptions), 500);
            return;
        }

        if (step === 'ACTIVITIES') {
            let response = "";
            switch (text) {
                case "A": response = "🏛️ Ne manquez pas la **Mosquée Hassan II** et une balade dans l'**Ancienne Médina**."; break;
                case "B": response = "🥘 Pour un bon tajine, essayez **'Rick's Café'** ou les grillades à **Bab Marrakech**."; break;
                case "C": response = "⚽ Pourquoi pas un match 5vs5 à **City Foot** ou du surf à **Aïn Diab** ?"; break;
                default: response = "Choix non reconnu.";
            }
            setTimeout(() => {
                addBotMessage(response);
                addBotMessage("Autre chose ?", [
                    { label: "🔄 Menu Principal", value: "START_MAIN" },
                    { label: "👋 Terminer", value: "END" }
                ]);
            }, 500);
            setStep('MAIN_MENU');
            return;
        }

        if (text === "END") {
            setTimeout(() => addBotMessage("Bon match ! Allez le Maroc ! 🇲🇦⚽"), 500);
        }
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
