import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Building2,
    Handshake,
    Inbox,
    CheckSquare,
    BarChart2,
    CalendarDays,
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
    MessageSquare,
    Clock,
    CheckCircle2,
    AlertCircle,
    Phone,
    ChevronRight,
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
        { id: 'contacts', label: 'Contacts', icon: <Users size={18} />, badge: 4 },
        { id: 'companies', label: 'Companies', icon: <Building2 size={18} /> },
        { id: 'deals', label: 'Deals', icon: <Handshake size={18} /> },
        { id: 'inbox', label: 'Inbox', icon: <Inbox size={18} />, badge: 12 },
    ];

    const navWorkspace = [
        { id: 'tasks', label: 'Tasks', icon: <CheckSquare size={18} /> },
        { id: 'report', label: 'Report', icon: <BarChart2 size={18} /> },
        { id: 'calendar', label: 'Calendar', icon: <CalendarDays size={18} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
    ];

    const kpiCards = [
        { label: 'Total Users', value: '2,984', change: '+4.2% today', positive: true, icon: <Users size={20} /> },
        { label: 'New Orders', value: '186', change: '+12.4% this month', positive: true, icon: <ShoppingCart size={20} /> },
        { label: 'Active Deals', value: '42', change: '-0.84% this week', positive: false, icon: <Handshake size={20} /> },
        { label: 'Win Rate', value: '27%', change: '+13.2% today', positive: true, icon: <Star size={20} /> },
        { label: 'E-mail sent', value: '2,829', change: '+13.2% today', positive: true, icon: <Mail size={20} /> },
    ];

    const todayTasks = [
        { id: 1, title: 'Call Sophia James', sub: 'Follow up on proposal', time: '2:00 PM', status: 'upcoming', icon: <Phone size={14} /> },
        { id: 2, title: 'Email Indigo tech', sub: 'Scheduled demo', time: 'Due 4PM', status: 'due', icon: <Mail size={14} /> },
        { id: 3, title: 'Preparation for weekly review', sub: 'Gather KPIs', time: 'Today', status: 'today', icon: <CheckSquare size={14} /> },
        { id: 4, title: 'Contact bookmarked', sub: 'Yesterday', time: 'Done', status: 'done', icon: <MessageSquare size={14} /> },
    ];

    const recentContacts = [
        { name: 'Sophia James', company: 'IndigoTech', status: 'Active', deal: '$4,200' },
        { name: 'Marcus White', company: 'BluePeak Ltd', status: 'Lead', deal: '$1,800' },
        { name: 'Anna Reeves', company: 'Orion Group', status: 'Won', deal: '$9,500' },
        { name: 'Daniel Cruz', company: 'NovaBuild', status: 'Inactive', deal: '$650' },
    ];

    const activities = [
        { text: 'New reservation from Table 4', time: '2 min ago', icon: <CalendarDays size={14} className="text-blue-500" /> },
        { text: 'Order #1872 marked as delivered', time: '10 min ago', icon: <CheckCircle2 size={14} className="text-green-500" /> },
        { text: 'New user registered: Lara Adams', time: '28 min ago', icon: <Users size={14} className="text-purple-500" /> },
        { text: 'Low stock alert: Truffle Fries', time: '1 hr ago', icon: <AlertCircle size={14} className="text-amber-500" /> },
        { text: 'Email campaign sent (186 recipients)', time: '2 hr ago', icon: <Mail size={14} className="text-[#E05D36]" /> },
    ];

    const chartData = [2, 2.2, 2.8, 3.1, 3.0, 4.8, 3.5];

    const taskStatusColor: Record<string, string> = {
        upcoming: 'text-gray-500',
        due: 'text-amber-500 font-semibold',
        today: 'text-green-500 font-semibold',
        done: 'text-green-600',
    };

    const taskIconBg: Record<string, string> = {
        upcoming: 'bg-blue-50 text-blue-400',
        due: 'bg-amber-50 text-amber-400',
        today: 'bg-green-50 text-green-500',
        done: 'bg-green-50 text-green-500',
    };

    const contactStatusColor: Record<string, string> = {
        Active: 'bg-green-50 text-green-600',
        Lead: 'bg-blue-50 text-blue-600',
        Won: 'bg-emerald-50 text-emerald-600',
        Inactive: 'bg-gray-100 text-gray-500',
    };

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

                                        {/* Today's tasks */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <h2 className="text-sm font-semibold text-gray-800">Today's task</h2>
                                                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#E05D36] transition">
                                                    <Plus size={13} /> Add
                                                </button>
                                            </div>

                                            <div className="space-y-0">
                                                {todayTasks.map((task, i) => (
                                                    <div
                                                        key={task.id}
                                                        className={`flex items-start gap-3 py-3 ${i < todayTasks.length - 1 ? 'border-b border-gray-50' : ''}`}
                                                    >
                                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${taskIconBg[task.status]}`}>
                                                            {task.icon}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-800 truncate">{task.title}</p>
                                                            <p className="text-xs text-gray-400 truncate">{task.sub}</p>
                                                        </div>
                                                        <span className={`text-xs shrink-0 ml-2 mt-0.5 ${taskStatusColor[task.status]}`}>
                                                            {task.time}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Bottom row: Recent contacts + Activity feed */}
                                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                                        {/* Recent contacts */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="lg:col-span-3 bg-white rounded-xl border border-gray-100 p-5"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <h2 className="text-sm font-semibold text-gray-800">Recent contact</h2>
                                                <button className="text-xs text-[#E05D36] hover:underline transition">View all</button>
                                            </div>

                                            <table className="w-full">
                                                <thead>
                                                    <tr className="text-left">
                                                        <th className="pb-2 text-[11px] font-medium text-gray-400 uppercase tracking-wider">Name</th>
                                                        <th className="pb-2 text-[11px] font-medium text-gray-400 uppercase tracking-wider">Company</th>
                                                        <th className="pb-2 text-[11px] font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                                        <th className="pb-2 text-[11px] font-medium text-gray-400 uppercase tracking-wider text-right">Deal</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50">
                                                    {recentContacts.map((c, i) => (
                                                        <motion.tr
                                                            key={i}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: 0.55 + i * 0.05 }}
                                                            className="group hover:bg-gray-50/60 transition-colors"
                                                        >
                                                            <td className="py-3 pr-4">
                                                                <div className="flex items-center gap-2.5">
                                                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#E05D36]/20 to-orange-100 flex items-center justify-center text-xs font-semibold text-[#E05D36] shrink-0">
                                                                        {c.name.charAt(0)}
                                                                    </div>
                                                                    <span className="text-sm font-medium text-gray-800">{c.name}</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-3 pr-4 text-sm text-gray-500">{c.company}</td>
                                                            <td className="py-3 pr-4">
                                                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${contactStatusColor[c.status]}`}>
                                                                    {c.status}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 text-right text-sm font-semibold text-gray-800">{c.deal}</td>
                                                        </motion.tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </motion.div>

                                        {/* Activity feed */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.55 }}
                                            className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h2 className="text-sm font-semibold text-gray-800">Activity feed</h2>
                                                    <p className="text-xs text-gray-400 mt-0.5">Latest event from your workplace</p>
                                                </div>
                                                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#E05D36] transition">
                                                    <Plus size={13} /> Add
                                                </button>
                                            </div>

                                            <div className="space-y-1">
                                                {activities.map((a, i) => (
                                                    <div
                                                        key={i}
                                                        className={`flex items-start gap-3 py-2.5 ${i < activities.length - 1 ? 'border-b border-gray-50' : ''}`}
                                                    >
                                                        <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center shrink-0 mt-0.5">
                                                            {a.icon}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs text-gray-700 leading-snug">{a.text}</p>
                                                            <div className="flex items-center gap-1 mt-0.5">
                                                                <Clock size={10} className="text-gray-300" />
                                                                <span className="text-[10px] text-gray-400">{a.time}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}

                            {/* ── Contacts ── */}
                            {activeSection === 'contacts' && (
                                <motion.div
                                    key="contacts"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-5"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h1 className="text-xl font-bold text-gray-900">Contacts</h1>
                                            <p className="text-sm text-gray-500 mt-0.5">Manage your customer contacts</p>
                                        </div>
                                        <button className="flex items-center gap-2 bg-[#E05D36] hover:bg-[#C8502D] text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                                            <Plus size={16} /> Add Contact
                                        </button>
                                    </div>

                                    <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50/60 transition-colors">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E05D36]/20 to-orange-100 flex items-center justify-center text-sm font-semibold text-[#E05D36] shrink-0">
                                                    {String.fromCharCode(65 + i)}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-800">Contact User {i + 1}</p>
                                                    <p className="text-xs text-gray-400">user{i + 1}@example.com</p>
                                                </div>
                                                <span className="text-xs bg-green-50 text-green-600 px-2.5 py-1 rounded-full font-medium">Active</span>
                                                <button className="text-gray-400 hover:text-gray-600 transition">
                                                    <ChevronRight size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* ── Deals ── */}
                            {activeSection === 'deals' && (
                                <motion.div
                                    key="deals"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-5"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h1 className="text-xl font-bold text-gray-900">Deals</h1>
                                            <p className="text-sm text-gray-500 mt-0.5">Track active and closed deals</p>
                                        </div>
                                        <button className="flex items-center gap-2 bg-[#E05D36] hover:bg-[#C8502D] text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                                            <Plus size={16} /> New Deal
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {[
                                            { stage: 'Leads', items: ['IndigoTech Proposal', 'NovaBuild Pitch'], color: 'bg-blue-50 border-blue-100' },
                                            { stage: 'Negotiation', items: ['Orion Group Contract', 'BluePeak Ltd'], color: 'bg-amber-50 border-amber-100' },
                                            { stage: 'Won', items: ['Apex Solutions – $9.5k', 'ZenCore – $4.2k'], color: 'bg-green-50 border-green-100' },
                                        ].map((col, ci) => (
                                            <div key={ci} className={`rounded-xl border p-4 ${col.color} space-y-3`}>
                                                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{col.stage}</p>
                                                {col.items.map((item, ii) => (
                                                    <div key={ii} className="bg-white rounded-lg border border-white p-3 shadow-sm">
                                                        <p className="text-sm font-medium text-gray-800">{item}</p>
                                                        <p className="text-xs text-gray-400 mt-1">Updated 2h ago</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* ── Orders / Inbox ── */}
                            {(activeSection === 'inbox' || activeSection === 'orders') && (
                                <motion.div
                                    key="inbox"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-5"
                                >
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900">Inbox</h1>
                                        <p className="text-sm text-gray-500 mt-0.5">12 unread messages</p>
                                    </div>
                                    <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="flex items-start gap-4 p-4 hover:bg-gray-50/60 transition-colors">
                                                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Mail size={15} className="text-gray-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-semibold text-gray-800">New inquiry #{1001 + i}</p>
                                                        <span className="text-xs text-gray-400">2:0{i}PM</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-0.5">Hi, I'd like to make a reservation for our team...</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* ── Tasks ── */}
                            {activeSection === 'tasks' && (
                                <motion.div
                                    key="tasks"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-5"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h1 className="text-xl font-bold text-gray-900">Tasks</h1>
                                            <p className="text-sm text-gray-500 mt-0.5">Your workspace tasks</p>
                                        </div>
                                        <button className="flex items-center gap-2 bg-[#E05D36] hover:bg-[#C8502D] text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                                            <Plus size={16} /> New Task
                                        </button>
                                    </div>
                                    <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
                                        {todayTasks.map((t) => (
                                            <div key={t.id} className="flex items-start gap-4 p-4 hover:bg-gray-50/60 transition-colors">
                                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${taskIconBg[t.status]}`}>
                                                    {t.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-800">{t.title}</p>
                                                    <p className="text-xs text-gray-400">{t.sub}</p>
                                                </div>
                                                <span className={`text-xs shrink-0 ${taskStatusColor[t.status]}`}>{t.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* ── Report / Analytics ── */}
                            {activeSection === 'report' && (
                                <motion.div
                                    key="report"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-5"
                                >
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900">Report</h1>
                                        <p className="text-sm text-gray-500 mt-0.5">Performance overview</p>
                                    </div>
                                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                                        <h2 className="text-sm font-semibold text-gray-800 mb-4">Sales trend</h2>
                                        <div className="h-48">
                                            <AreaChart color="#E05D36" data={[1.2, 1.8, 2.4, 1.9, 3.2, 4.0, 3.6]} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {[
                                            { label: 'Peak Hours', value: '6–9 PM', sub: '95% capacity', color: 'text-green-500' },
                                            { label: 'Top Item', value: 'Artisan Burger', sub: '542 sold this month', color: 'text-[#E05D36]' },
                                            { label: 'Avg. Order Value', value: '$24.80', sub: '+$3.20 vs last month', color: 'text-blue-500' },
                                        ].map((s, i) => (
                                            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
                                                <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                                                <p className={`text-lg font-bold ${s.color} mb-1`}>{s.value}</p>
                                                <p className="text-xs text-gray-500">{s.sub}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* ── Calendar / Companies / Settings ── */}
                            {['calendar', 'companies', 'settings'].includes(activeSection) && (
                                <motion.div
                                    key={activeSection}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex items-center justify-center h-64"
                                >
                                    <div className="text-center">
                                        <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                                            {activeSection === 'calendar' && <CalendarDays size={24} className="text-gray-400" />}
                                            {activeSection === 'companies' && <Building2 size={24} className="text-gray-400" />}
                                            {activeSection === 'settings' && <Settings size={24} className="text-gray-400" />}
                                        </div>
                                        <p className="text-gray-800 font-semibold capitalize">{activeSection}</p>
                                        <p className="text-sm text-gray-400 mt-1">Coming soon</p>
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
