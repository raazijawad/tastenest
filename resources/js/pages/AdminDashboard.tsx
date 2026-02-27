import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import {
    BarChart3,
    Users,
    Calendar,
    UtensilsCrossed,
    Folder,
    Target,
    TrendingUp,
    LogOut,
    DollarSign,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

const iconMap: { [key: string]: React.ReactNode } = {
    overview: <BarChart3 size={20} />,
    users: <Users size={20} />,
    reservations: <Calendar size={20} />,
    orders: <UtensilsCrossed size={20} />,
    categories: <Folder size={20} />,
    products: <Target size={20} />,
    analytics: <TrendingUp size={20} />,
};

const kpiIcons = {
    users: <Users size={32} className="opacity-20" />,
    revenue: <DollarSign size={32} className="opacity-20" />,
    orders: <UtensilsCrossed size={32} className="opacity-20" />,
    reservations: <Calendar size={32} className="opacity-20" />,
};

export default function AdminDashboard({ auth }: any) {
    const [activeSection, setActiveSection] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const menuItems = [
        { id: 'overview', label: 'Overview', section: 'dashboard' },
        { id: 'users', label: 'Users', section: 'management' },
        { id: 'reservations', label: 'Reservations', section: 'management' },
        { id: 'orders', label: 'Orders', section: 'management' },
        { id: 'categories', label: 'Category Resources', section: 'resources' },
        { id: 'products', label: 'Product Resources', section: 'resources' },
        { id: 'analytics', label: 'Analytics', section: 'insights' },
    ];

    return (
        <>
            <Head title="Admin Dashboard - TasteNest">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
            </Head>

            <div className="flex h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
                {/* Background Noise Texture */}
                <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay pointer-events-none z-0" />

                {/* Sidebar */}
                <motion.div
                    initial={{ x: -300 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`${
                        sidebarOpen ? 'w-72' : 'w-20'
                    } bg-[#111315] border-r border-white/5 overflow-y-auto transition-all duration-300 flex flex-col relative z-10`}
                >
                    {/* Sidebar Background Glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#E05D36] rounded-full blur-[150px] opacity-[0.02] pointer-events-none" />
                    {/* Admin Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className={`${sidebarOpen ? 'px-6 py-4' : 'px-3 py-4'} border-b border-white/5 flex items-center justify-between relative z-10`}
                    >
                        <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
                            <div className="w-10 h-10 rounded-full bg-[#E05D36]/30 flex items-center justify-center border border-[#E05D36]/50">
                                <span className="text-sm font-bold font-serif">{auth.user.name.charAt(0)}</span>
                            </div>
                            {sidebarOpen && (
                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs font-semibold truncate">{auth.user.name}</span>
                                    <span className="text-xs text-gray-500">Administrator</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="hidden lg:flex p-1 hover:bg-white/10 rounded-lg transition text-gray-400 hover:text-[#E05D36]"
                            >
                                {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                            </button>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="p-1 hover:bg-red-500/10 rounded-lg transition text-gray-400 hover:text-red-400"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Menu Sections */}
                    <nav className="flex-1 px-3 py-6 space-y-6 overflow-y-auto relative z-10">
                        {/* Dashboard Section */}
                        {sidebarOpen && (
                            <div>
                                <p className="px-3 text-[9px] font-bold text-[#E05D36]/70 uppercase tracking-[0.3em] mb-3 font-serif">
                                    Dashboard
                                </p>
                            </div>
                        )}
                        <div className="space-y-2">
                            {menuItems
                                .filter((item) => item.section === 'dashboard')
                                .map((item, i) => (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all relative overflow-hidden group ${
                                            activeSection === item.id
                                                ? 'bg-[#E05D36] text-white shadow-lg shadow-[#E05D36]/20'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                                        }`}
                                    >
                                        <span className="flex-shrink-0">{iconMap[item.id]}</span>
                                        {sidebarOpen && (
                                            <span className="text-xs font-medium tracking-narrow truncate">{item.label}</span>
                                        )}
                                        {activeSection === item.id && (
                                            <div className="absolute left-0 top-0 h-full w-1 bg-white/50" />
                                        )}
                                    </motion.button>
                                ))}
                        </div>

                        {/* Management Section */}
                        {sidebarOpen && (
                            <div>
                                <p className="px-3 text-[9px] font-bold text-[#E05D36]/70 uppercase tracking-[0.3em] mb-3 font-serif">
                                    Management
                                </p>
                            </div>
                        )}
                        <div className="space-y-2">
                            {menuItems
                                .filter((item) => item.section === 'management')
                                .map((item, i) => (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.15 * i }}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all relative overflow-hidden group ${
                                            activeSection === item.id
                                                ? 'bg-[#E05D36] text-white shadow-lg shadow-[#E05D36]/20'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                                        }`}
                                    >
                                        <span className="flex-shrink-0">{iconMap[item.id]}</span>
                                        {sidebarOpen && (
                                            <span className="text-xs font-medium tracking-narrow truncate">{item.label}</span>
                                        )}
                                        {activeSection === item.id && (
                                            <div className="absolute left-0 top-0 h-full w-1 bg-white/50" />
                                        )}
                                    </motion.button>
                                ))}
                        </div>

                        {/* Resources Section */}
                        {sidebarOpen && (
                            <div>
                                <p className="px-3 text-[9px] font-bold text-[#E05D36]/70 uppercase tracking-[0.3em] mb-3 font-serif">
                                    Resources
                                </p>
                            </div>
                        )}
                        <div className="space-y-2">
                            {menuItems
                                .filter((item) => item.section === 'resources')
                                .map((item, i) => (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 * i }}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all relative overflow-hidden group ${
                                            activeSection === item.id
                                                ? 'bg-[#E05D36] text-white shadow-lg shadow-[#E05D36]/20'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                                        }`}
                                    >
                                        <span className="flex-shrink-0">{iconMap[item.id]}</span>
                                        {sidebarOpen && (
                                            <span className="text-xs font-medium tracking-narrow truncate">{item.label}</span>
                                        )}
                                        {activeSection === item.id && (
                                            <div className="absolute left-0 top-0 h-full w-1 bg-white/50" />
                                        )}
                                    </motion.button>
                                ))}
                        </div>

                        {/* Insights Section */}
                        {sidebarOpen && (
                            <div>
                                <p className="px-3 text-[9px] font-bold text-[#E05D36]/70 uppercase tracking-[0.3em] mb-3 font-serif">
                                    Insights
                                </p>
                            </div>
                        )}
                        <div className="space-y-2">
                            {menuItems
                                .filter((item) => item.section === 'insights')
                                .map((item, i) => (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.25 * i }}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all relative overflow-hidden group ${
                                            activeSection === item.id
                                                ? 'bg-[#E05D36] text-white shadow-lg shadow-[#E05D36]/20'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                                        }`}
                                    >
                                        <span className="flex-shrink-0">{iconMap[item.id]}</span>
                                        {sidebarOpen && (
                                            <span className="text-xs font-medium tracking-narrow truncate">{item.label}</span>
                                        )}
                                        {activeSection === item.id && (
                                            <div className="absolute left-0 top-0 h-full w-1 bg-white/50" />
                                        )}
                                    </motion.button>
                                ))}
                        </div>
                    </nav>
                </motion.div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden relative z-10">
                    {/* Top Bar */}
                    <div className="h-20 bg-[#111315] border-b border-white/5 flex items-center justify-between px-8 relative">
                        {/* Top Bar Background Glow */}
                        <div className="absolute top-0 right-0 w-96 h-full bg-[#E05D36] rounded-full blur-[100px] opacity-[0.02] pointer-events-none" />

                        <div className="relative z-10">
                            <h1 className="text-2xl font-bold text-white font-serif tracking-tight">
                                {menuItems.find((item) => item.id === activeSection)?.label}
                            </h1>
                            <p className="text-[10px] text-[#E05D36] tracking-widest uppercase mt-1">Dashboard</p>
                        </div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="text-right hidden md:block">
                                <p className="text-xs text-gray-500">Welcome back</p>
                                <p className="text-sm font-semibold text-white">{auth.user.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-8">
                            {/* Overview Section */}
                            {activeSection === 'overview' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6"
                                >
                                    {/* KPI Cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {[
                                            { label: 'Total Users', value: '2,547', change: '+12%', key: 'users', color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30' },
                                            { label: 'Total Revenue', value: '$24,580', change: '+8%', key: 'revenue', color: 'from-green-500/20 to-green-600/10 border-green-500/30' },
                                            { label: 'Pending Orders', value: '34', change: 'Awaiting', key: 'orders', color: 'from-[#E05D36]/20 to-[#E05D36]/10 border-[#E05D36]/30' },
                                            { label: 'Reservations', value: '18', change: 'Confirmed', key: 'reservations', color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30' },
                                        ].map((card, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className={`bg-gradient-to-br ${card.color} border rounded-sm p-6 relative overflow-hidden group`}
                                            >
                                                {/* Card Hover Effect */}
                                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                <div className="relative z-10 flex items-start justify-between mb-4">
                                                    <div>
                                                        <p className="text-gray-400 text-xs mb-2 tracking-widest uppercase font-sans">{card.label}</p>
                                                        <div className="text-3xl font-bold text-white font-serif">{card.value}</div>
                                                    </div>
                                                    <span className="opacity-20 transition-opacity group-hover:opacity-40">{kpiIcons[card.key as keyof typeof kpiIcons]}</span>
                                                </div>
                                                <p className="text-xs text-gray-400 relative z-10">{card.change} from last month</p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Recent Activity */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="bg-[#111]/90 backdrop-blur-md border border-white/5 rounded-sm p-6"
                                        >
                                            <h3 className="text-lg font-bold text-white mb-4 font-serif">Recent Orders</h3>
                                            <div className="space-y-3">
                                                {[1, 2, 3].map((i) => (
                                                    <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-sm border border-white/5 hover:border-[#E05D36]/30 transition">
                                                        <span className="text-sm text-gray-400">Order #{12350 + i}</span>
                                                        <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-sm">Delivered</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="bg-[#111]/90 backdrop-blur-md border border-white/5 rounded-sm p-6"
                                        >
                                            <h3 className="text-lg font-bold text-white mb-4 font-serif">Quick Actions</h3>
                                            <div className="space-y-3">
                                                <button className="w-full bg-[#E05D36] hover:bg-[#C8502D] text-white px-4 py-3 rounded-sm transition font-medium text-xs tracking-widest uppercase">
                                                    Create Menu Item
                                                </button>
                                                <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-3 rounded-sm transition font-medium text-xs tracking-widest uppercase">
                                                    View Reports
                                                </button>
                                                <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-3 rounded-sm transition font-medium text-xs tracking-widest uppercase">
                                                    Settings
                                                </button>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Users Management */}
                            {activeSection === 'users' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-400 text-sm">Managing <span className="font-bold text-white">5</span> active users</p>
                                        <button className="bg-[#E05D36] hover:bg-[#C8502D] text-white px-4 py-3 rounded-sm transition font-medium text-xs tracking-widest uppercase">
                                            + Add User
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="bg-[#111]/90 backdrop-blur-md border border-white/5 rounded-sm p-6 flex justify-between items-center hover:border-[#E05D36]/30 transition"
                                            >
                                                <div>
                                                    <p className="text-white font-semibold">User #{1000 + i}</p>
                                                    <p className="text-gray-400 text-sm">user{i}@example.com</p>
                                                </div>
                                                <div className="flex gap-3">
                                                    <button className="text-xs bg-blue-500/20 text-blue-400 px-3 py-2 rounded-sm transition hover:bg-blue-500/30">
                                                        Edit
                                                    </button>
                                                    <button className="text-xs bg-red-500/20 text-red-400 px-3 py-2 rounded-sm transition hover:bg-red-500/30">
                                                        Deactivate
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Category Resources */}
                            {activeSection === 'categories' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-400 text-sm">Managing <span className="font-bold text-white">4</span> menu categories</p>
                                        <button className="bg-[#E05D36] hover:bg-[#C8502D] text-white px-4 py-3 rounded-sm transition font-medium text-xs tracking-widest uppercase">
                                            + Add Category
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {['Burgers', 'Pasta', 'Sides', 'Beverages'].map((cat, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="bg-gradient-to-br from-[#111]/90 to-[#0a0a0a] border border-white/5 rounded-sm p-6 hover:border-[#E05D36]/30 transition group"
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <h3 className="text-lg font-bold text-white font-serif">{cat}</h3>
                                                    <Folder size={32} className="opacity-30 group-hover:opacity-50 transition" />
                                                </div>
                                                <p className="text-gray-400 text-sm mb-6">{8 - i * 2} items in this category</p>
                                                <div className="flex gap-2">
                                                    <button className="flex-1 text-xs bg-blue-500/20 text-blue-400 px-3 py-2 rounded-sm transition hover:bg-blue-500/30">
                                                        Edit
                                                    </button>
                                                    <button className="flex-1 text-xs bg-red-500/20 text-red-400 px-3 py-2 rounded-sm transition hover:bg-red-500/30">
                                                        Delete
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Product Resources */}
                            {activeSection === 'products' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-400 text-sm">Managing <span className="font-bold text-white">12</span> menu items</p>
                                        <button className="bg-[#E05D36] hover:bg-[#C8502D] text-white px-4 py-3 rounded-sm transition font-medium text-xs tracking-widest uppercase">
                                            + Add Product
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { name: 'Artisan Burger Board', category: 'Burgers', price: '$18.00', stock: 45 },
                                            { name: 'Truffle Luxe Burger', category: 'Burgers', price: '$24.00', stock: 12 },
                                            { name: 'Beef Pasta', category: 'Pasta', price: '$18.50', stock: 28 },
                                            { name: 'Crispy Fries', category: 'Sides', price: '$6.00', stock: 120 },
                                            { name: 'Classic Milkshake', category: 'Beverages', price: '$5.50', stock: 80 },
                                        ].map((product, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: i * 0.08 }}
                                                className="bg-[#111]/90 backdrop-blur-md border border-white/5 rounded-sm p-6 flex justify-between items-center hover:border-[#E05D36]/30 transition"
                                            >
                                                <div className="flex-1">
                                                    <p className="text-white font-semibold">{product.name}</p>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <span className="text-xs text-gray-500">{product.category}</span>
                                                        <span className="text-xs text-[#E05D36] font-bold">{product.price}</span>
                                                        <span className={`text-xs px-2 py-1 rounded-sm ${
                                                            product.stock > 30
                                                                ? 'bg-green-500/20 text-green-400'
                                                                : product.stock > 10
                                                                ? 'bg-yellow-500/20 text-yellow-400'
                                                                : 'bg-red-500/20 text-red-400'
                                                        }`}>
                                                            Stock: {product.stock}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3">
                                                    <button className="text-xs bg-blue-500/20 text-blue-400 px-3 py-2 rounded-sm transition hover:bg-blue-500/30">
                                                        Edit
                                                    </button>
                                                    <button className="text-xs bg-red-500/20 text-red-400 px-3 py-2 rounded-sm transition hover:bg-red-500/30">
                                                        Delete
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Reservations Section */}
                            {activeSection === 'reservations' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6"
                                >
                                    <p className="text-gray-400 text-sm"><span className="font-bold text-white">6</span> reservations today</p>
                                    <div className="space-y-4">
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: i * 0.08 }}
                                                className="bg-[#111]/90 backdrop-blur-md border border-white/5 rounded-sm p-6 flex justify-between items-center hover:border-[#E05D36]/30 transition"
                                            >
                                                <div>
                                                    <p className="text-white font-semibold">Reservation #{i}</p>
                                                    <p className="text-gray-400 text-sm">March {15 + i}, 2024 • Party of {3 + i}</p>
                                                </div>
                                                <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-sm text-xs font-medium">
                                                    Confirmed
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Orders Section */}
                            {activeSection === 'orders' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6"
                                >
                                    <p className="text-gray-400 text-sm"><span className="font-bold text-white">34</span> orders pending</p>
                                    <div className="space-y-4">
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: i * 0.08 }}
                                                className="bg-[#111]/90 backdrop-blur-md border border-white/5 rounded-sm p-6 flex justify-between items-center hover:border-[#E05D36]/30 transition"
                                            >
                                                <div>
                                                    <p className="text-white font-semibold">Order #{12340 + i}</p>
                                                    <p className="text-gray-400 text-sm">Items: {2 + i} • Total: ${23 + i * 2}</p>
                                                </div>
                                                <select className="bg-[#1a2322]/90 text-white text-xs px-3 py-2 rounded-sm border border-white/5 hover:border-[#E05D36]/50 transition">
                                                    <option>Pending</option>
                                                    <option>Preparing</option>
                                                    <option>Ready</option>
                                                    <option>Delivered</option>
                                                </select>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Analytics Section */}
                            {activeSection === 'analytics' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="bg-[#111]/90 backdrop-blur-md border border-white/5 rounded-sm p-6"
                                    >
                                        <h3 className="text-lg font-bold text-white mb-6 font-serif">Peak Hours</h3>
                                        {[
                                            { time: '11:00 AM - 1:00 PM', percentage: 85 },
                                            { time: '6:00 PM - 9:00 PM', percentage: 95 },
                                            { time: '12:00 AM - 2:00 AM', percentage: 30 },
                                        ].map((hour, i) => (
                                            <div key={i} className="mb-6">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm text-gray-400">{hour.time}</span>
                                                    <span className="text-sm font-semibold text-white">{hour.percentage}%</span>
                                                </div>
                                                <div className="w-full bg-white/5 rounded-full h-2">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${hour.percentage}%` }}
                                                        transition={{ duration: 1, delay: i * 0.2 }}
                                                        className="bg-gradient-to-r from-[#E05D36] to-[#FF7A5C] h-2 rounded-full"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-[#111]/90 backdrop-blur-md border border-white/5 rounded-sm p-6"
                                    >
                                        <h3 className="text-lg font-bold text-white mb-6 font-serif">Top Selling Items</h3>
                                        {[
                                            { name: 'Artisan Burger', count: 542 },
                                            { name: 'Truffle Fries', count: 438 },
                                            { name: 'Beef Pasta', count: 356 },
                                        ].map((item, i) => (
                                            <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                                                <span className="text-gray-400">{item.name}</span>
                                                <span className="text-[#E05D36] font-bold">{item.count} sold</span>
                                            </div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
