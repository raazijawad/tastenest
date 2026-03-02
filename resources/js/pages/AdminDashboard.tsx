import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Settings,
    HelpCircle,
    LogOut,
    Search,
    Bell,
    Plus,
    TrendingUp,
    TrendingDown,
    UtensilsCrossed,
    ShoppingCart,
    Star,
    Mail,
    Users,
    Handshake,
} from 'lucide-react';

/* ─── tiny SVG area chart ─── */
function AreaChart({ color = '#22c55e', data }: { color?: string; data: number[] }) {
    const w = 460;
    const h = 140;
    const pad = { top: 10, right: 10, bottom: 28, left: 30 };
    const innerW = w - pad.left - pad.right;
    const innerH = h - pad.top - pad.bottom;
    const max = Math.max(...data);
    const min = Math.min(...data) * 0.8;

    const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const step = innerW / (data.length - 1);

    const pts = data.map((v, i) => ({
        x: pad.left + i * step,
        y: pad.top + innerH - ((v - min) / (max - min)) * innerH,
    }));

    const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${pad.top + innerH} L ${pts[0].x} ${pad.top + innerH} Z`;

    const yTicks = [1, 2, 3, 4, 5];

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
            <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.02" />
                </linearGradient>
            </defs>

            {/* Y-axis grid lines */}
            {yTicks.map((t) => {
                const y = pad.top + innerH - ((t - min) / (max - min)) * innerH;
                return (
                    <g key={t}>
                        <line x1={pad.left} y1={y} x2={pad.left + innerW} y2={y} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
                        <text x={pad.left - 6} y={y + 4} textAnchor="end" fontSize="10" fill="#9ca3af">{t}</text>
                    </g>
                );
            })}

            {/* Area fill */}
            <path d={areaPath} fill="url(#areaGrad)" />

            {/* Line */}
            <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* X-axis labels */}
            {pts.map((p, i) => (
                <text key={i} x={p.x} y={h - 6} textAnchor="middle" fontSize="10" fill="#9ca3af">{months[i]}</text>
            ))}

            {/* Dots */}
            {pts.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="white" stroke={color} strokeWidth="2" />
            ))}
        </svg>
    );
}

/* ─── component ─── */
export default function AdminDashboard({ auth }: any) {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [searchValue, setSearchValue] = useState('');

    const navMain = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    ];

    const navWorkspace = [
        { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
    ];

    const kpiCards = [
        { label: 'Total Users', value: '2,984', change: '+4.2% today', positive: true, icon: <Users size={20} /> },
        { label: 'New Orders', value: '186', change: '+12.4% this month', positive: true, icon: <ShoppingCart size={20} /> },
        { label: 'Active Deals', value: '42', change: '-0.84% this week', positive: false, icon: <Handshake size={20} /> },
        { label: 'Win Rate', value: '27%', change: '+13.2% today', positive: true, icon: <Star size={20} /> },
        { label: 'E-mail sent', value: '2,829', change: '+13.2% today', positive: true, icon: <Mail size={20} /> },
    ];

    const chartData = [2, 2.2, 2.8, 3.1, 3.0, 4.8, 3.5];

    return (
        <>
            <Head title="Admin Dashboard – TasteNest">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>

            <div
                className="flex h-screen overflow-hidden"
                style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f9fafb', color: '#111827' }}
            >
                {/* ── Sidebar ── */}
                <aside className="w-52 shrink-0 bg-white border-r border-gray-100 flex flex-col py-4 overflow-y-auto">
                    {/* Logo */}
                    <div className="px-5 mb-6 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-md bg-[#E05D36] flex items-center justify-center">
                            <UtensilsCrossed size={14} className="text-white" />
                        </div>
                        <span className="text-sm font-bold text-gray-800 tracking-tight">TasteNest</span>
                    </div>

                    {/* Main nav */}
                    <nav className="flex-1 px-3">
                        <div className="space-y-0.5">
                            {navMain.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group relative ${activeSection === item.id
                                            ? 'bg-gray-100 text-gray-900 font-medium'
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                        }`}
                                >
                                    <span className={activeSection === item.id ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-600'}>
                                        {item.icon}
                                    </span>
                                    <span className="flex-1 text-left">{item.label}</span>
                                    {item.badge && (
                                        <span className="ml-auto bg-gray-200 text-gray-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Workspace section */}
                        <p className="mt-5 mb-1.5 px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Workspace</p>
                        <div className="space-y-0.5">
                            {navWorkspace.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group ${activeSection === item.id
                                            ? 'bg-gray-100 text-gray-900 font-medium'
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                        }`}
                                >
                                    <span className={activeSection === item.id ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-600'}>
                                        {item.icon}
                                    </span>
                                    <span className="flex-1 text-left">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </nav>

                    {/* Bottom links */}
                    <div className="px-3 mt-4 border-t border-gray-100 pt-4 space-y-0.5">
                        <a
                            href="#"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all"
                        >
                            <HelpCircle size={18} className="text-gray-400" />
                            Help
                        </a>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
                        >
                            <LogOut size={18} className="text-gray-400" />
                            Logout
                        </Link>
                    </div>
                </aside>

                {/* ── Main ── */}
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    {/* Top bar */}
                    <header className="h-14 shrink-0 bg-white border-b border-gray-100 flex items-center px-6 gap-4">
                        {/* Search */}
                        <div className="flex-1 max-w-xs relative">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search contacts, leads..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 placeholder:text-gray-400"
                            />
                        </div>

                        <div className="flex items-center gap-3 ml-auto">
                            {/* Bell */}
                            <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-50 transition">
                                <Bell size={18} />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E05D36] rounded-full" />
                            </button>

                            {/* Avatar */}
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-[#E05D36] flex items-center justify-center text-white text-xs font-bold shrink-0">
                                    {auth?.user?.name?.charAt(0) ?? 'A'}
                                </div>
                                <span className="text-sm font-medium text-gray-700 hidden md:block">
                                    {auth?.user?.name ?? 'Admin'}
                                </span>
                            </div>
                        </div>
                    </header>

                    {/* Scrollable content */}
                    <main className="flex-1 overflow-y-auto p-6">
                        <AnimatePresence mode="wait">
                            {activeSection === 'dashboard' && (
                                <motion.div
                                    key="dashboard"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-6"
                                >
                                    {/* Page header */}
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900">Dashboard overview</h1>
                                        <p className="text-sm text-gray-500 mt-0.5">Track pipeline, task, and recent activities</p>
                                    </div>

                                    {/* KPI cards */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                                        {kpiCards.map((card, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 16 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.06 }}
                                                className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
                                            >
                                                <p className="text-xs text-gray-500 mb-2">{card.label}</p>
                                                <p className="text-2xl font-bold text-gray-900 mb-2">{card.value}</p>
                                                <div className={`flex items-center gap-1 text-xs ${card.positive ? 'text-green-500' : 'text-red-500'}`}>
                                                    {card.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                                    <span>{card.change}</span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Middle row: Chart + Today's Tasks */}
                                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                                        {/* Pipeline chart */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.35 }}
                                            className="lg:col-span-3 bg-white rounded-xl border border-gray-100 p-5"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h2 className="text-sm font-semibold text-gray-800">Pipeline performance</h2>
                                                    <p className="text-xs text-gray-400 mt-0.5">Leads through stage over selected period</p>
                                                </div>
                                                <button className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition">
                                                    Export
                                                </button>
                                            </div>

                                            {/* Legend */}
                                            <div className="flex items-center gap-4 mb-3">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-3 h-2 rounded-full bg-blue-400 inline-block" />
                                                    <span className="text-xs text-gray-500">Leads</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-3 h-2 rounded-full bg-green-400 inline-block" />
                                                    <span className="text-xs text-gray-500">Won</span>
                                                </div>
                                            </div>

                                            <div className="h-36">
                                                <AreaChart color="#22c55e" data={chartData} />
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </>
    );
}
