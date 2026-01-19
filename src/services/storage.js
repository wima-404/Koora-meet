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
export const SecurityService = {
  blockUser: (userId) => {
    // In a real app, store this. For now, just simulate success.
    console.log(`User ${userId} blocked.`);
    return true;
  },
  reportUser: (userId, reason) => {
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
