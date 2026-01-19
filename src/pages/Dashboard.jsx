import React from 'react';
import { Link } from 'react-router-dom';
import { AuthService, PostService } from '../services/storage';
import { Button } from '../components/UI';
import { Calendar, Users, Flame, ChevronRight, Bell, Plus, Hash } from 'lucide-react';

export default function Dashboard() {
    const user = AuthService.getCurrentUser();

    const MatchCard = () => (
        <div style={{
            background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1510051640316-54084b11492e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            color: 'white',
            marginBottom: '2rem',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
        }}>
            <div className="flex justify-between items-start mb-12">
                <div className="flex gap-2">
                    <span className="bg-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/20">
                        SOLD OUT
                    </span>
                    <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">
                        GROUP B
                    </span>
                </div>
            </div>

            <h2 className="text-4xl font-black mb-2">Morocco vs Portugal</h2>
            <div className="flex items-center gap-2 text-gray-300 mb-8 font-medium">
                <Calendar size={16} /> Tomorrow, 22:50 • Casablanca
            </div>

            <div className="flex gap-3">
                <Button variant="primary" style={{ backgroundColor: 'white', color: 'black', background: 'white' }}>
                    View Details
                </Button>
                <button className="px-6 py-3 rounded-full bg-transparent border border-white/20 hover:bg-white/10 transition-colors font-bold text-sm">
                    Stats Match
                </button>
            </div>
        </div>
    );

    const QuickAction = ({ icon: Icon, title, desc, color }) => (
        <div className="card hover:border-red-500/50 transition-colors cursor-pointer group h-full flex flex-col justify-between">
            <div>
                <div className={`p-3 rounded-full w-fit mb-4 ${color} bg-opacity-20`}>
                    <Icon size={24} className={color.replace('bg-', 'text-')} />
                </div>
                <h3 className="text-xl font-bold mb-1">{title}</h3>
                <p className="text-sm text-gray-500 mb-4">{desc}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-500 transition-colors ml-auto">
                <ChevronRight size={20} />
            </div>
        </div>
    );

    const [posts, setPosts] = React.useState([]);
    const [isPosting, setIsPosting] = React.useState(false);
    const [newPostText, setNewPostText] = React.useState('');

    React.useEffect(() => {
        setPosts(PostService.getAllPosts());
    }, []);

    const handleCreatePost = (e) => {
        e.preventDefault();
        if (!newPostText.trim()) return;
        PostService.createPost(newPostText);
        setNewPostText('');
        setIsPosting(false);
        setPosts(PostService.getAllPosts());
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 pb-20 pt-8 lg:pt-12">
            {/* Main Content */}
            <div className="flex-1">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black mb-1">Welcome back, {user?.prenom}! 🦁</h1>
                        <p className="text-gray-400">Ready for the next match?</p>
                    </div>
                    <button className="p-3 bg-white/5 rounded-full hover:bg-white/10 border border-white/5 transition-colors relative">
                        <Bell size={24} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                </header>

                <MatchCard />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <Link to="/groups/create">
                        <QuickAction
                            icon={Flame}
                            title="Host a Watch Party"
                            desc="Gather your squad for the game."
                            color="bg-orange-500"
                        />
                    </Link>
                    <Link to="/groups">
                        <QuickAction
                            icon={Users}
                            title="Find a Meetup"
                            desc="Join local fans in Casablanca."
                            color="bg-red-600"
                        />
                    </Link>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Community Feed</h3>
                    <button
                        onClick={() => setIsPosting(!isPosting)}
                        className="text-sm text-red-500 cursor-pointer hover:underline font-bold"
                    >
                        + New Post
                    </button>
                </div>

                {/* New Post Form */}
                {isPosting && (
                    <div className="card mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
                        <textarea
                            className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 transition-colors resize-none"
                            rows="3"
                            placeholder="What's on your mind?..."
                            value={newPostText}
                            onChange={(e) => setNewPostText(e.target.value)}
                        />
                        <div className="flex justify-end gap-2 mt-3">
                            <button
                                onClick={() => setIsPosting(false)}
                                className="px-4 py-2 rounded-lg text-gray-400 hover:text-white font-medium"
                            >
                                Cancel
                            </button>
                            <Button
                                variant="primary"
                                style={{ width: 'auto', padding: '0.5rem 1.5rem' }}
                                onClick={handleCreatePost}
                            >
                                Post
                            </Button>
                        </div>
                    </div>
                )}

                {/* Feed Posts */}
                {posts.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 border border-dashed border-white/10 rounded-xl">
                        No posts yet. Be the first to start the conversation!
                    </div>
                ) : (
                    posts.map(post => (
                        <div key={post.id} className="card hover:bg-white/5 transition-colors mb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden border-2 border-red-900">
                                    <img src={post.userPhoto || `https://i.pravatar.cc/150?u=${post.userId}`} alt="User" />
                                </div>
                                <div>
                                    <div className="font-bold">{post.userName}</div>
                                    <div className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Fan Zone</div>
                                </div>
                            </div>
                            <p className="mb-4 text-gray-300 text-lg">
                                {post.text}
                            </p>
                            <div className="flex gap-6 text-sm text-gray-400 border-t border-white/5 pt-4">
                                <button className="flex items-center gap-2 hover:text-red-500 transition-colors"><Flame size={18} /> {post.likes} Hype</button>
                                <button className="flex items-center gap-2 hover:text-blue-500 transition-colors"><Hash size={18} /> {post.comments} Comments</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Right Sidebar (Desktop only) */}
            <div className="hidden lg:flex flex-col w-[320px] gap-6 sticky top-8 h-fit">

                {/* Upcoming Matches */}
                <div className="card p-0 overflow-hidden">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                        <h3 className="font-bold">Upcoming Matches</h3>
                        <span className="text-xs text-red-500 cursor-pointer">See All</span>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🇫🇷</span>
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm">France</span>
                                    <span className="text-[10px] text-gray-500">VS Brazil</span>
                                </div>
                            </div>
                            <span className="text-xs font-bold bg-green-500/20 text-green-500 px-2 py-1 rounded">20:00</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🇪🇸</span>
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm">Spain</span>
                                    <span className="text-[10px] text-gray-500">VS Italy</span>
                                </div>
                            </div>
                            <span className="text-xs font-bold bg-gray-700 text-gray-400 px-2 py-1 rounded">22:00</span>
                        </div>
                    </div>
                </div>

                {/* Your Squad */}
                <div className="card p-0 overflow-hidden">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                        <h3 className="font-bold">Your Squad</h3>
                        <span className="text-xs text-red-500 cursor-pointer">+ Invite</span>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden"><img src="https://i.pravatar.cc/150?img=3" alt="" /></div>
                                <div>
                                    <div className="font-bold text-sm">Amine M.</div>
                                    <div className="text-[10px] text-green-500">Online</div>
                                </div>
                            </div>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden"><img src="https://i.pravatar.cc/150?img=5" alt="" /></div>
                                <div>
                                    <div className="font-bold text-sm">Sarah K.</div>
                                    <div className="text-[10px] text-gray-500">Offline 2h ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trending Tags */}
                <div className="">
                    <h3 className="font-bold mb-3 px-1 text-gray-400 text-sm uppercase">Trending Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-white/5 hover:bg-red-600 hover:text-white transition-colors text-xs font-bold cursor-pointer">#DimaMaghreb</span>
                        <span className="px-3 py-1 rounded-full bg-white/5 hover:bg-red-600 hover:text-white transition-colors text-xs font-bold cursor-pointer">#WorldCup2030</span>
                        <span className="px-3 py-1 rounded-full bg-white/5 hover:bg-red-600 hover:text-white transition-colors text-xs font-bold cursor-pointer">#Casablanca</span>
                        <span className="px-3 py-1 rounded-full bg-white/5 hover:bg-red-600 hover:text-white transition-colors text-xs font-bold cursor-pointer">#Ultras</span>
                    </div>
                </div>

            </div>

            {/* Mobile FAB Chat (Hidden on Desktop) */}
            <button className="lg:hidden fixed bottom-24 right-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg text-white z-50">
                <Hash size={20} />
            </button>
        </div>
    );
}
