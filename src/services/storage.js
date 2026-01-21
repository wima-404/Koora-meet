/**
 * Simulated Backend Service using localStorage
 */

const KEYS = {
  USERS: 'koora_users',
  CURRENT_USER: 'koora_current_user',
  GROUPS: 'koora_groups',
  MESSAGES: 'koora_messages',
  CHATBOT_SESSIONS: 'koora_chatbot_sessions',
  POSTS: 'koora_posts',
};

// --- DATA INITIALIZATION ---
const initStorage = () => {
  if (!localStorage.getItem(KEYS.USERS)) localStorage.setItem(KEYS.USERS, JSON.stringify([]));
  if (!localStorage.getItem(KEYS.GROUPS)) localStorage.setItem(KEYS.GROUPS, JSON.stringify([]));
  if (!localStorage.getItem(KEYS.MESSAGES)) localStorage.setItem(KEYS.MESSAGES, JSON.stringify([]));
  if (!localStorage.getItem(KEYS.POSTS)) localStorage.setItem(KEYS.POSTS, JSON.stringify([]));
};

// --- AUTH SERVICE ---
export const AuthService = {
  register: (userData) => {
    initStorage();
    const users = JSON.parse(localStorage.getItem(KEYS.USERS));

    if (users.find(u => u.email === userData.email)) {
      throw new Error('Email déjà utilisé');
    }

    const newUser = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...userData,
      photo: userData.photo || null, // Optional
      equipe: userData.equipe || 'Maroc', // Default
    };

    users.push(newUser);
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(newUser));
    return newUser;
  },

  login: (email, password) => {
    initStorage();
    const users = JSON.parse(localStorage.getItem(KEYS.USERS));
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Email ou mot de passe incorrect');
    }

    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem(KEYS.CURRENT_USER);
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem(KEYS.CURRENT_USER));
  },

  updateProfile: (updatedData) => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) throw new Error("Non connecté");

    const users = JSON.parse(localStorage.getItem(KEYS.USERS));
    const index = users.findIndex(u => u.id === currentUser.id);

    if (index !== -1) {
      const updatedUser = { ...users[index], ...updatedData };
      users[index] = updatedUser;
      localStorage.setItem(KEYS.USERS, JSON.stringify(users));
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(updatedUser)); // Update session too
      return updatedUser;
    }
    return currentUser;
  }
};

// --- GROUP SERVICE ---
export const GroupService = {
  createGroup: (groupData) => {
    const currentUser = AuthService.getCurrentUser();
    // Validation: Max 4 participants including creator? Or just max setting?
    // User requested "Max participants (2 à 4)"

    const groups = JSON.parse(localStorage.getItem(KEYS.GROUPS));
    const newGroup = {
      id: crypto.randomUUID(),
      creatorId: currentUser.id,
      participants: [currentUser.id],
      ...groupData
    };

    groups.push(newGroup);
    localStorage.setItem(KEYS.GROUPS, JSON.stringify(groups));
    return newGroup;
  },

  getAllGroups: () => {
    return JSON.parse(localStorage.getItem(KEYS.GROUPS)) || [];
  },

  joinGroup: (groupId) => {
    const currentUser = AuthService.getCurrentUser();
    const groups = JSON.parse(localStorage.getItem(KEYS.GROUPS));
    const index = groups.findIndex(g => g.id === groupId);

    if (index === -1) throw new Error("Groupe non trouvé");

    if (groups[index].participants.includes(currentUser.id)) {
      return groups[index]; // Already joined
    }

    if (groups[index].participants.length >= groups[index].maxParticipants) {
      throw new Error("Groupe complet");
    }

    groups[index].participants.push(currentUser.id);
    localStorage.setItem(KEYS.GROUPS, JSON.stringify(groups));
    return groups[index];
  },

  leaveGroup: (groupId) => {
    const currentUser = AuthService.getCurrentUser();
    const groups = JSON.parse(localStorage.getItem(KEYS.GROUPS));
    const index = groups.findIndex(g => g.id === groupId);

    if (index === -1) throw new Error("Groupe non trouvé");

    groups[index].participants = groups[index].participants.filter(id => id !== currentUser.id);
    localStorage.setItem(KEYS.GROUPS, JSON.stringify(groups));
  },

  kickMember: (groupId, userId) => {
    const groups = JSON.parse(localStorage.getItem(KEYS.GROUPS));
    const index = groups.findIndex(g => g.id === groupId);
    if (index === -1) throw new Error("Group not found");

    groups[index].participants = groups[index].participants.filter(id => id !== userId);
    localStorage.setItem(KEYS.GROUPS, JSON.stringify(groups));
  }
};

// --- CHAT SERVICE ---
export const ChatService = {
  sendMessage: (roomId, text, senderOverride = null) => {
    // Bad Word Filter (Simple)
    const badWords = ['bad', 'hate', 'stupid', 'idiot']; // Add localized words as needed
    const containsBadWord = badWords.some(word => text.toLowerCase().includes(word));

    if (containsBadWord) {
      throw new Error("Message contains inappropriate content.");
    }

    const currentUser = AuthService.getCurrentUser();
    const messages = JSON.parse(localStorage.getItem(KEYS.MESSAGES));

    // Use senderOverride if provided (for simulation), otherwise use current user
    const sender = senderOverride || {
      id: currentUser.id,
      name: currentUser.nom + ' ' + currentUser.prenom
    };

    const newMessage = {
      id: crypto.randomUUID(),
      roomId,
      senderId: sender.id,
      senderName: sender.name,
      text,
      createdAt: new Date().toISOString()
    };

    messages.push(newMessage);
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify(messages));
    return newMessage;
  },

  getMessages: (roomId) => {
    const messages = JSON.parse(localStorage.getItem(KEYS.MESSAGES)) || [];
    return messages.filter(m => m.roomId === roomId).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }
};

// --- SECURITY SERVICE (Simple simulation) ---
// --- SECURITY SERVICE ---
export const SecurityService = {
  blockUser: (userId) => {
    const currentUser = AuthService.getCurrentUser();
    let blocked = JSON.parse(localStorage.getItem('koora_blocked')) || {};

    if (!blocked[currentUser.id]) blocked[currentUser.id] = [];
    if (!blocked[currentUser.id].includes(userId)) {
      blocked[currentUser.id].push(userId);
    }

    localStorage.setItem('koora_blocked', JSON.stringify(blocked));
    console.log(`User ${userId} blocked.`);
    return true;
  },

  isBlocked: (userId) => {
    const currentUser = AuthService.getCurrentUser();
    let blocked = JSON.parse(localStorage.getItem('koora_blocked')) || {};
    return blocked[currentUser.id]?.includes(userId);
  },

  reportUser: (userId, reason) => {
    let reports = JSON.parse(localStorage.getItem('koora_reports')) || [];
    reports.push({
      reporterId: AuthService.getCurrentUser().id,
      reportedId: userId,
      reason,
      date: new Date().toISOString()
    });
    localStorage.setItem('koora_reports', JSON.stringify(reports));
    console.log(`User ${userId} reported for: ${reason}`);
    return true;
  }
};

// --- SYSTEM SERVICE ---
export const SystemService = {
  resetApp: () => {
    localStorage.removeItem(KEYS.USERS);
    localStorage.removeItem(KEYS.CURRENT_USER);
    localStorage.removeItem(KEYS.GROUPS);
    localStorage.removeItem(KEYS.MESSAGES);
    localStorage.removeItem(KEYS.POSTS);
    localStorage.removeItem(KEYS.CHATBOT_SESSIONS);
    window.location.reload();
  }
};

// --- CHATBOT SERVICE ---
export const ChatbotService = {
  saveSession: (userId, data) => {
    let sessions = JSON.parse(localStorage.getItem(KEYS.CHATBOT_SESSIONS)) || {};
    sessions[userId] = { ...sessions[userId], ...data };
    localStorage.setItem(KEYS.CHATBOT_SESSIONS, JSON.stringify(sessions));
  },

  getSession: (userId) => {
    let sessions = JSON.parse(localStorage.getItem(KEYS.CHATBOT_SESSIONS)) || {};
    return sessions[userId] || {};
  }
};

// --- POST SERVICE ---
export const PostService = {
  createPost: (text, image = null) => {
    const currentUser = AuthService.getCurrentUser();
    const posts = JSON.parse(localStorage.getItem(KEYS.POSTS)) || [];

    const newPost = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      userName: currentUser.nom + ' ' + currentUser.prenom,
      userPhoto: currentUser.photo,
      text,
      image,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString()
    };

    posts.unshift(newPost); // Add to top
    localStorage.setItem(KEYS.POSTS, JSON.stringify(posts));
    return newPost;
  },

  getAllPosts: () => {
    return JSON.parse(localStorage.getItem(KEYS.POSTS)) || [];
  },

  likePost: (postId) => {
    const posts = JSON.parse(localStorage.getItem(KEYS.POSTS)) || [];
    const index = posts.findIndex(p => p.id === postId);
    if (index !== -1) {
      posts[index].likes = (posts[index].likes || 0) + 1;
      localStorage.setItem(KEYS.POSTS, JSON.stringify(posts));
      return posts[index];
    }
    return null;
  }
};

export const PredictionService = {
  getPredictions: (userId) => {
    const allPredictions = JSON.parse(localStorage.getItem('koora_predictions')) || {};
    return allPredictions[userId] || [];
  },

  submitPrediction: (userId, matchId, homeScore, awayScore) => {
    const all = JSON.parse(localStorage.getItem('koora_predictions')) || {};
    if (!all[userId]) all[userId] = [];

    // Remove existing if any
    all[userId] = all[userId].filter(p => p.matchId !== matchId);

    all[userId].push({
      matchId,
      homeScore,
      awayScore,
      points: Math.floor(Math.random() * 10) // Simulated points for demo
    });

    localStorage.setItem('koora_predictions', JSON.stringify(all));
  },

  getLeaderboard: () => {
    // Mock Leaderboard
    return [
      { id: 1, name: "Amine M.", points: 120, rank: 1 },
      { id: 2, name: "Sarah K.", points: 115, rank: 2 },
      { id: 3, name: "Youssef B.", points: 98, rank: 3 },
    ];
  }
};

export const CarpoolService = {
  getRides: () => {
    return JSON.parse(localStorage.getItem('koora_rides')) || [
      { id: 1, driver: "Omar", from: "Casablanca", to: "Tangier", date: "2030-06-14", time: "09:00", price: "150 DH", seats: 2 },
      { id: 2, driver: "Leila", from: "Rabat", to: "Marrakech", date: "2030-06-15", time: "14:00", price: "200 DH", seats: 3 },
    ];
  },

  addRide: (ride) => {
    const rides = CarpoolService.getRides();
    rides.push({ ...ride, id: Date.now(), seats: 4 }); // Default 4 seats
    localStorage.setItem('koora_rides', JSON.stringify(rides));
  },

  bookSeat: (rideId) => {
    const rides = CarpoolService.getRides();
    const index = rides.findIndex(r => r.id === rideId);
    if (index !== -1 && rides[index].seats > 0) {
      rides[index].seats -= 1;
      localStorage.setItem('koora_rides', JSON.stringify(rides));
      return true;
    }
    return false;
  }
};

// --- USER SERVICE ---
export const UserService = {
  getAllUsers: () => {
    return JSON.parse(localStorage.getItem(KEYS.USERS)) || [];
  },

  getUserById: (id) => {
    const users = JSON.parse(localStorage.getItem(KEYS.USERS)) || [];
    return users.find(u => u.id === id) || null;
  }
};
