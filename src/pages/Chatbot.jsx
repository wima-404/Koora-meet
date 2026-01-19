import React, { useState, useEffect, useRef } from 'react';
import { AuthService, ChatbotService } from '../services/storage';
import { Button, Input } from '../components/UI';
import { Send } from 'lucide-react';

export default function Chatbot() {
    const currentUser = AuthService.getCurrentUser();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [step, setStep] = useState('PRELIMINARY'); // PRELIMINARY, MAIN_MENU, RESPONSE
    const [userData, setUserData] = useState({});
    const bottomRef = useRef(null);

    useEffect(() => {
        // Initial Greeting
        addBotMessage(`Bonjour ${currentUser.prenom} ! Je suis votre assistant Koora Meet. Je suis là pour vous aider à vivre la meilleure expérience Coupe du Monde 2030.`);

        // Check if we need preliminary info (though we have auth data, script says ask questions)
        // We will ask them anyway to follow script, or skip if redundant? 
        // Script says: "Chatbot pose les questions suivantes : Nom, Prénom, Ville..."
        // Let's assume we confirm them or ask missing ones.

        setTimeout(() => {
            askNextQuestion();
        }, 1000);
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
        // Script:
        // Étape 1 – Questions préliminaires
        // Nom, Prénom, Ville, Emplacement, Âge -> We have these in Profile usually.
        // Let's Simulate the script flow as requested.

        addBotMessage("Pour mieux vous servir, confirmez-vous ces informations ?", [
            { label: "Oui, commencer", value: "START_MAIN" },
            { label: "Non, modifier", value: "EDIT_INFO" } // Placeholder for simplicity
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
        // Simple State Machine based on Script

        if (text === 'START_MAIN') {
            setTimeout(() => {
                setStep('MAIN_MENU');
                addBotMessage("Que souhaitez-vous savoir ?", [
                    { label: "1. Stade du match", value: "1" },
                    { label: "2. Où acheter des tenues ?", value: "2" },
                    { label: "3. Les Fan Zones", value: "3" },
                    { label: "4. Activités à faire", value: "4" },
                    { label: "Autre", value: "OTHER" }
                ]);
            }, 500);
            return;
        }

        if (step === 'MAIN_MENU') {
            let response = "";
            let nextOptions = [];

            switch (text) {
                case "1":
                    response = "Le prochain match du Maroc se jouera au Grand Stade de Casablanca à 20h00.";
                    break;
                case "2":
                    response = "Vous pouvez acheter les tenues officielles au Morocco Mall ou à la boutique du stade.";
                    break;
                case "3":
                    response = "Les Fan Zones sont situées à : Corniche Ain Diab, Place Mohammed V, et Parc de la Ligue Arabe.";
                    break;
                case "4":
                    response = "Je vais vous aider à trouver une activité adéquate pour vous. Veuillez répondre à ces questions.";
                    nextOptions = [
                        { label: "A. Culture & Histoire", value: "A" },
                        { label: "B. Gastronomie", value: "B" },
                        { label: "C. Sport & Aventure", value: "C" }
                    ];
                    setStep('ACTIVITIES');
                    break;
                default:
                    response = "Je n'ai pas compris. Veuillez choisir une option.";
                    nextOptions = [
                        { label: "1. Stade du match", value: "1" },
                        { label: "2. Où acheter des tenues ?", value: "2" },
                        { label: "3. Les Fan Zones", value: "3" },
                        { label: "4. Activités à faire", value: "4" }
                    ];
            }

            setTimeout(() => addBotMessage(response, nextOptions), 500);
            return;
        }

        if (step === 'ACTIVITIES') {
            let response = "";
            switch (text) {
                case "A":
                    response = "Je vous recommande de visiter la Mosquée Hassan II et l'Ancienne Médina.";
                    break;
                case "B":
                    response = "Essayez le restaurant 'Rick's Café' ou les stands de street food à Bab Marrakech.";
                    break;
                case "C":
                    response = "Vous pouvez faire du surf à Aïn Diab ou un match de foot à City Foot.";
                    break;
                default:
                    response = "Choix non reconnu.";
            }
            setTimeout(() => {
                addBotMessage(response);
                addBotMessage("Autre chose ?", [
                    { label: "Retour au menu", value: "START_MAIN" },
                    { label: "Non, merci", value: "END" }
                ]);
            }, 500);
            setStep('MAIN_MENU'); // Reset or End
            return;
        }

        if (text === "END") {
            setTimeout(() => addBotMessage("Merci ! Bon match ! ⚽"), 500);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)]">
            <div className="p-4 border-b border-gray-700 bg-[var(--bg-card)]">
                <h1 className="text-xl font-bold">Assistant Koora</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                        <div
                            className={`max-w-[85%] p-3 rounded-lg ${msg.sender === 'user'
                                    ? 'bg-[var(--accent-primary)] text-white'
                                    : 'bg-gray-700 text-gray-200'
                                }`}
                        >
                            {msg.text}
                        </div>

                        {msg.sender === 'bot' && msg.options && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {msg.options.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionClick(opt.value, opt.label)}
                                        className="px-3 py-1 bg-slate-600 rounded-full text-sm hover:bg-slate-500 transition-colors"
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="p-4 bg-[var(--bg-card)] border-t border-gray-700">
                <form onSubmit={handleSend} className="flex gap-2">
                    <input
                        className="flex-1 p-2 rounded bg-slate-800 border border-slate-600 text-white"
                        placeholder="Écrivez..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <Button type="submit" style={{ width: 'auto', padding: '0.5rem 1rem' }}>
                        <Send size={20} />
                    </Button>
                </form>
            </div>
        </div>
    );
}
