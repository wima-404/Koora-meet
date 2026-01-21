export const chatbotKb = {
    // --- HOST & CITIES ---
    cities: [
        {
            keywords: ["casablanca", "casa"],
            response: "📍 **Casablanca** is the economic heart of Morocco. For the World Cup:\n- **Stadium**: Grand Stade de Casablanca (115,000 capacity).\n- **Vibe**: Electric! The Corniche Ain Diab will be one giant Fan Zone.\n- **Tip**: Try the seafood at 'Port de Pêche'."
        },
        {
            keywords: ["rabat", "capital"],
            response: "📍 **Rabat** combines history and modernity.\n- **Stadium**: Prince Moulay Abdellah.\n- **See**: Hassan Tower and the Kasbah of the Udayas.\n- **Transport**: Very easy tramway system connecting to Salé."
        },
        {
            keywords: ["tanger", "tangier"],
            response: "📍 **Tangier**, the gateway to Africa.\n- **Stadium**: Grand Stade de Tanger (Ibn Batouta).\n- **Vibe**: Where the Mediterranean meets the Atlantic.\n- **Transport**: Al-Boraq high-speed train connects to Casa in ~2 hours."
        },
        {
            keywords: ["marrakech"],
            response: "📍 **Marrakech** is pure magic.\n- **Stadium**: Grand Stade de Marrakech.\n- **Must-Do**: Jemaa el-Fnaa square at night.\n- **Note**: It gets hot! Stay hydrated."
        },
        {
            keywords: ["stade", "stadium", "arena"],
            response: "The jewel is the new **Grand Stade de Casablanca** (115k seats) in Benslimane. Other key venues include Ibn Batouta (Tangier), Prince Moulay Abdellah (Rabat), and stadiums in Madrid, Barcelona, and Lisbon."
        }
    ],

    // --- TEAMS & PLAYERS ---
    teams: [
        {
            keywords: ["morocco", "maroc", "lion", "atlas"],
            response: "🇲🇦 **The Atlas Lions** made history in 2022 (Semi-Finals)!\n- **Key Players**: Hakimi, Diaz, Bounou.\n- **Coach**: Walid Regragui.\n- **Goal**: Win it on home soil in 2030!"
        },
        {
            keywords: ["spain", "espagne", "roja"],
            response: "🇪🇸 **La Roja** are co-hosts.\n- **Style**: Tiki-taka evolved.\n- **Key Players**: Yamal, Pedri, Rodri.\n- **History**: Champions in 2010."
        },
        {
            keywords: ["portugal", "ronaldo"],
            response: "🇵🇹 **Portugal** completes the host trio.\n- **Key Players**: Leão, Fernandes, Dias.\n- **Ambition**: Their first World Cup trophy."
        },
        {
            keywords: ["brazil", "bresil"],
            response: "🇧🇷 **Brazil** is always a favorite. 5 stars on the crest. Can they add a 6th in 2030?"
        },
        {
            keywords: ["argentina", "messi"],
            response: "🇦🇷 **Argentina** are defending legends. They will playing their opening match at home in South America to celebrate the centenary."
        },
        {
            keywords: ["player", "joueur", "star"],
            response: "2030 will feature stars like Lamine Yamal (ESP), Brahim Diaz (MAR), Vinicius Jr (BRA), and maybe the last dance for some legends!"
        }
    ],

    // --- HISTORY & FACTS ---
    history: [
        {
            keywords: ["winner", "champion", "history"],
            response: "🏆 **Past Winners**:\n- 2026: TBD\n- 2022: Argentina 🇦🇷\n- 2018: France 🇫🇷\n- 2014: Germany 🇩🇪\n- 2010: Spain 🇪🇸"
        },
        {
            keywords: ["1930", "first", "uruguay"],
            response: "The first World Cup was in 1930 in Uruguay. 2030 marks the **100th Anniversary**, which is why opening matches will be held in Uruguay, Argentina, and Paraguay."
        }
    ],

    // --- PRACTICAL INFO ---
    practical: [
        {
            keywords: ["ticket", "billet", "price", "prix"],
            response: "🎟️ **Tickets** will be sold via FIFA.com.\n- **Phases**: Random Draw -> FCFS -> Last Minute.\n- **Est. Prices**: Group stage starting ~$70 (Category 3). Finals can go up to $1000+."
        },
        {
            keywords: ["transport", "travel", "train", "tgv"],
            response: "🚅 **Transport in Morocco**:\n- **Al-Boraq (HSR)**: Tangier ↔ Kenitra ↔ Rabat ↔ Casablanca.\n- **Tramway**: Efficient in Rabat and Casa.\n- **Taxis**: Petit Taxi (city) and Grand Taxi (intercity). Always check the meter!"
        },
        {
            keywords: ["hotel", "stay", "hebergement", "sleep"],
            response: "🏨 Book early! Options range from luxury hotels (Sofitel, Marriott) to traditional Riads in Medina. Koora Meet partners offer discounts with code **KOORA2030**."
        },
        {
            keywords: ["visa", "entry"],
            response: "🛂 Morocco is visa-free for many countries (EU, USA, etc.) for up to 90 days. Check with your local consulate. An 'Electronic Travel Authority' might be implemented for 2030."
        },
        {
            keywords: ["safety", "security", "uruguay"],
            response: "👮 Morocco is a safe tourist destination. Police are helpful (Tourist Police brigades exist). Emergency numbers: 190 (Police), 15 (Ambulance)."
        }
    ],

    // --- FUN ---
    fun: [
        {
            keywords: ["joke", "blague"],
            response: "Why did the football coach go to the bank? To get his quarterback! ... Wait, wrong football. ⚽"
        },
        {
            keywords: ["chant", "song", "music"],
            response: "🎶 *Dima Maghreb!* (Clap, clap, clap) 🎶\nPrepare your vocal cords, the atmosphere will be deafening!"
        },
        {
            keywords: ["hello", "hi", "bonjour", "salam"],
            response: "Salam! 👋 Marhba bik (Welcome)! How can I help you navigate World Cup 2030?"
        },

        {
            keywords: ["tickets", "buy", "billet", "acheter"],
            response: "🎟️ You can buy tickets directly in the **Tickets** tab! Prices start from 500 DH. Hurry, they are selling out fast!"
        },
        {
            keywords: ["food", "eat", "manger", "restaurant"],
            response: "🍽️ **Moroccan Food** is legendary!\n- Try **Couscous** on Fridays.\n- **Tajine** is a must.\n- **Pastilla** for a sweet/savory mix.\n- Best spots: Rick's Café (Casa), Dar Zellij (Marrakech)."
        },
        {
            keywords: ["weather", "meteo", "temperature"],
            response: "☀️ June/July in Morocco is warm.\n- **Coastal (Casa/Rabat)**: 25-30°C, pleasant breeze.\n- **Inland (Marrakech)**: Can reach 40°C. Bring sunscreen and a hat!"
        },
        {
            keywords: ["emergency", "police", "hopital", "help"],
            response: "🆘 **Emergency Numbers**:\n- **190**: Police\n- **150**: Ambulance/Fire\n- **177**: Gendarmerie (outside cities)\nStay safe and drink water!"
        }
    ]
};

// Helper: Flattened list for search
export const allTopics = [
    ...chatbotKb.cities,
    ...chatbotKb.teams,
    ...chatbotKb.history,
    ...chatbotKb.practical,
    ...chatbotKb.fun
];
