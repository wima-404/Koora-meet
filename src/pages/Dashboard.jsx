import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { PostService, AuthService, NotificationService } from '../services/storage';
import { Button } from '../components/UI';
import { Search, Bell, Filter, Heart, MessageSquare, Share2, MoreHorizontal, Calendar, Users, Flame, ChevronRight, Hash, MapPin, TrendingUp, Sparkles } from 'lucide-react';

export default function Dashboard() {
    const [user, setUser] = useState(AuthService.getCurrentUser());
    const [posts, setPosts] = useState([]);
    const [isPosting, setIsPosting] = useState(false);
    const [newPostText, setNewPostText] = useState('');
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (user) {
            setPosts(PostService.getAllPosts());
            setNotifications(NotificationService.getNotifications(user.id));
        }
    }, [user]);

    const handleCreatePost = (e) => {
        e.preventDefault();
        if (!newPostText.trim()) return;
        PostService.createPost(newPostText);
        setNewPostText('');
        setIsPosting(false);
        setPosts(PostService.getAllPosts());
    };

    const handleLike = (postId) => {
        PostService.likePost(postId);
        setPosts(PostService.getAllPosts());
    };

    const handleComment = (postId) => {
        const comment = prompt("Add a comment:");
        if (comment && comment.trim()) {
            PostService.addComment(postId, comment);
            setPosts(PostService.getAllPosts());
        }
    };

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const MatchCard = () => (
        <div className="relative rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl mb-8 group animate-in fade-in zoom-in-95 duration-700">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000&auto=format&fit=crop"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt="Stadium"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)] via-[var(--bg-dark)]/40 to-transparent"></div>
            </div>

            <div className="relative z-10 p-8 pt-24">
                <div className="flex gap-2 mb-6">
                    <span className="bg-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-600/20">
                        Match of the Day
                    </span>
                    <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                        Group A • Open
                    </span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight">Morocco <span className="text-red-500 italic">vs</span> Portugal</h2>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-8 font-medium">
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/5">
                        <Calendar size={16} className="text-red-500" /> Tomorrow, 22:50
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/5">
                        <MapPin size={16} className="text-red-500" /> Casablanca Stadium
                    </div>
                </div>

                <div className="flex gap-4">
                    <Link to="/tickets">
                        <Button variant="primary" className="!w-auto px-8 h-12 !text-sm flex items-center gap-2 group">
                            Book Tickets
                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <Link to="/stats">
                        <button className="px-8 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all font-bold text-sm">
                            Match Stats
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );

    const QuickAction = ({ icon: Icon, title, desc, color, to }) => (
        <Link to={to} className="group">
            <div className="card h-full flex flex-col justify-between hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-20 ${color}`}></div>
                <div>
                    <div className={`p-4 rounded-2xl w-fit mb-6 ${color} bg-opacity-10 text-white shadow-inner`}>
                        <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-black mb-2 group-hover:text-red-500 transition-colors">{title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-red-500 transition-colors">
                    Get Started <ChevronRight size={14} />
                </div>
            </div>
        </Link>
    );

    return (
        <div className="flex flex-col lg:flex-row gap-8 pb-32 pt-12">
            {/* Main Content */}
            <div className="flex-1 space-y-12">
                <header className="flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-2 text-red-500 text-xs font-black uppercase tracking-widest mb-1">
                            <Sparkles size={14} /> Dima Maghreb 🇲🇦
                        </div>
                        <h1 className="text-4xl font-black tracking-tight">Welcome, {user?.prenom}!</h1>
                        <p className="text-gray-400">Ready for the 2030 World Cup experience?</p>
                    </div>
                    <Link to="/settings" className="p-3 bg-white/5 rounded-full hover:bg-white/10 border border-white/5 transition-all active:scale-95 relative group">
                        <Bell size={24} />
                        {(notifications || []).filter(n => n && !n.read).length > 0 && (
                            <span className="absolute top-2.5 right-2.5 w-3 h-3 bg-red-600 rounded-full border-2 border-[var(--bg-card)]"></span>
                        )}
                        <div className="absolute -bottom-10 right-0 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Notifications
                        </div>
                    </Link>
                </header>

                <MatchCard />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <QuickAction
                        icon={Flame}
                        title="Watch Party"
                        desc="Gather your squad and host an epic viewing party in your city."
                        color="bg-orange-500"
                        to="/groups/create"
                    />
                    <QuickAction
                        icon={Users}
                        title="Meetups"
                        desc="Join local fans in Casablanca for pre-match celebrations."
                        color="bg-red-600"
                        to="/groups"
                    />
                </div>

                {/* Community Feed */}
                <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                        <div>
                            <h3 className="text-2xl font-black">Community Flux</h3>
                            <p className="text-sm text-gray-500">Live updates from fans around the world.</p>
                        </div>
                        <button
                            onClick={() => setIsPosting(!isPosting)}
                            className="bg-white/5 hover:bg-red-600 hover:text-white border border-white/10 rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition-all"
                        >
                            {isPosting ? 'Cancel' : '+ Message'}
                        </button>
                    </div>

                    {isPosting && (
                        <div className="card animate-in fade-in slide-in-from-top-4 duration-300">
                            <textarea
                                className="w-full bg-black/20 border border-white/10 rounded-2xl p-6 text-white focus:outline-none focus:border-red-500 transition-all resize-none text-lg"
                                rows="3"
                                placeholder="What's happening at the fan zone?..."
                                value={newPostText}
                                onChange={(e) => setNewPostText(e.target.value)}
                            />
                            <div className="flex justify-end pt-4">
                                <Button
                                    variant="primary"
                                    className="!w-auto px-10 h-14"
                                    onClick={handleCreatePost}
                                >
                                    Publish Post
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        {posts.length === 0 ? (
                            <div className="text-center py-20 bg-white/2 border border-dashed border-white/10 rounded-3xl">
                                <MessageSquare className="mx-auto mb-4 text-gray-700" size={48} />
                                <p className="text-gray-500 font-bold italic">No posts yet. Be the first to shout!</p>
                            </div>
                        ) : (
                            posts.map(post => (
                                <div key={post.id} className="card group hover:bg-white/10 transition-all duration-300 border-white/5 p-8 relative overflow-hidden">
                                    <div className="flex items-center gap-4 mb-6 relative z-10">
                                        <div className="w-14 h-14 bg-gray-700 rounded-full overflow-hidden border-2 border-red-900 group-hover:border-red-500 transition-colors">
                                            <img src={post.userPhoto || `https://i.pravatar.cc/150?u=${post.userId}`} alt="User" />
                                        </div>
                                        <div>
                                            <div className="font-black text-xl">{post.userName || 'Fan Member'}</div>
                                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                                <MapPin size={10} /> {post.createdAt ? new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'} • Fan Zone
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mb-8 text-gray-300 text-lg leading-relaxed relative z-10">
                                        {post.text}
                                    </p>
                                    <div className="flex gap-8 text-sm font-black uppercase tracking-widest text-gray-400 border-t border-white/5 pt-6 relative z-10">
                                        <button
                                            onClick={() => handleLike(post.id)}
                                            className="flex items-center gap-2 hover:text-red-500 transition-colors"
                                        >
                                            <Flame size={20} className={post.likes > 0 ? "text-red-500" : ""} />
                                            {post.likes || 0} Hype
                                        </button>
                                        <button
                                            onClick={() => handleComment(post.id)}
                                            className="flex items-center gap-2 hover:text-blue-500 transition-colors"
                                        >
                                            <MessageSquare size={20} /> {post.comments || 0} Comments
                                        </button>
                                    </div>
                                    {/* Abstract background shape for posts */}
                                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-red-600/5 rounded-full blur-[60px] group-hover:bg-red-600/10 transition-colors"></div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Right Sidebar (Desktop only) */}
            <div className="hidden lg:flex flex-col w-[340px] gap-8 sticky top-12 h-fit">

                {/* Stats Spotlight */}
                <div className="card p-8 bg-gradient-to-br from-red-900/40 to-[var(--bg-card)] border-white/10 group">
                    <div className="flex items-center gap-2 text-xs font-black text-red-500 uppercase tracking-widest mb-4">
                        <TrendingUp size={14} /> Live Stats
                    </div>
                    <h3 className="text-2xl font-black mb-6">Top Scorer</h3>
                    <div className="flex items-center gap-4 group-hover:translate-x-1 transition-transform">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 overflow-hidden border border-white/10">
                            <img src="https://i.pravatar.cc/150?u=mbappe" alt="Player" />
                        </div>
                        <div>
                            <p className="font-black text-lg">K. Mbappé 🇫🇷</p>
                            <p className="text-red-500 font-black text-2xl">4 <span className="text-[10px] text-gray-500 uppercase tracking-widest pl-1">Goals</span></p>
                        </div>
                    </div>
                    <Link to="/stats">
                        <button className="w-full mt-8 py-3 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                            See All Stats
                        </button>
                    </Link>
                </div>

                {/* Upcoming Matches */}
                <div className="card p-0 overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/2">
                        <h3 className="font-black text-sm uppercase tracking-widest">Upcoming Matches</h3>
                        <Link to="/teams" className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">See All</Link>
                    </div>
                    <div className="p-6 space-y-6">
                        <MatchItem home="🇫🇷 France" away="🇧🇷 Brazil" time="20:00" />
                        <MatchItem home="🇪🇸 Spain" away="🇮🇹 Italy" time="22:00" />
                        <MatchItem home="🇲🇦 Morocco" away="🇩🇪 Germany" time="Sat 20:00" />
                    </div>
                </div>

                {/* Your Squad */}
                <div className="card p-0 overflow-hidden border-white/5">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/2">
                        <h3 className="font-black text-sm uppercase tracking-widest">Your Squad</h3>
                        <Link to="/friends" className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline hover:scale-105 transition-transform">+ Invite</Link>
                    </div>
                    <div className="p-6 space-y-4">
                        <UserItem name="Amine M." img="https://i.pravatar.cc/150?img=3" status="Online" color="bg-green-500" userId="amine_m" />
                        <UserItem name="Sarah K." img="https://i.pravatar.cc/150?img=5" status="Away" color="bg-yellow-500" userId="sarah_k" />
                        <UserItem name="Yassin L." img="https://i.pravatar.cc/150?img=4" status="Online" color="bg-green-500" userId="yassin_l" />
                    </div>
                </div>

                {/* Trending Tags */}
                <div className="px-2">
                    <h3 className="font-black text-xs text-gray-500 uppercase tracking-widest mb-4">Trending #Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {['DimaMaghreb', 'WorldCup2030', 'Casablanca', 'Ultras', 'RoadTo2030'].map(tag => (
                            <span key={tag} className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/5 hover:border-red-500/50 hover:bg-red-600/10 hover:text-red-500 transition-all text-[10px] font-black uppercase tracking-widest cursor-pointer">#{tag}</span>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

const MatchItem = ({ home, away, time }) => (
    <div className="flex items-center justify-between group cursor-pointer hover:bg-white/2 p-2 -m-2 rounded-xl transition-colors">
        <div className="flex items-center gap-3">
            <div className="flex flex-col">
                <span className="font-black text-xs group-hover:text-red-500 transition-colors">{home} vs {away}</span>
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Stadium: Casablanca</span>
            </div>
        </div>
        <span className="text-[10px] font-black bg-red-600/10 text-red-500 px-3 py-1 rounded-lg border border-red-500/20">{time}</span>
    </div>
);

const UserItem = ({ name, img, status, color, userId }) => (
    <Link to={`/chat/${userId}`} className="flex items-center justify-between group cursor-pointer">
        <div className="flex items-center gap-3">
            <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gray-700 overflow-hidden group-hover:ring-2 ring-red-500 transition-all">
                    <img src={img} alt={name} className="w-full h-full object-cover" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 ${color} rounded-full border-2 border-[var(--bg-card)]`}></div>
            </div>
            <div>
                <div className="font-black text-sm group-hover:text-red-500 transition-colors">{name}</div>
                <div className="text-[10px] font-bold text-gray-400">{status}</div>
            </div>
        </div>
        <ChevronRight size={14} className="text-gray-700 group-hover:text-red-500 transition-colors" />
    </Link>
);

