import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import { ProtectedRoute } from './components/UI';

import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import GroupsList from './pages/GroupsList';
import CreateGroup from './pages/CreateGroup';
import ChatRoom from './pages/ChatRoom';
import Chatbot from './pages/Chatbot';

// Placeholder for future Dashboard
// Removed inline component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/groups" element={<GroupsList />} />
          <Route path="/groups/create" element={<CreateGroup />} />
          <Route path="/groups/:groupId/chat" element={<ChatRoom />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
