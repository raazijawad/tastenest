import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
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
    Tags,
    Package,
    FileText,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Eye,
    EyeOff,
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
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryDescription, setNewCategoryDescription] = useState('');
    const [categories, setCategories] = useState<any[]>([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductCategory, setNewProductCategory] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductImage, setNewProductImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [sizeOptions, setSizeOptions] = useState<{ size: string; price: string }[]>([]);
    const [portionOptions, setPortionOptions] = useState<{ portion: string; price: string }[]>([]);
    const [customSizeOptions, setCustomSizeOptions] = useState<{ size: string; price: string }[]>([]);
    const [optionTypeSelected, setOptionTypeSelected] = useState<'size' | 'portion' | 'custom' | null>(null);
    const [addons, setAddons] = useState<{ name: string; price: string }[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [showEditProduct, setShowEditProduct] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [editProductName, setEditProductName] = useState('');
    const [editProductPrice, setEditProductPrice] = useState('');
    const [editProductCategory, setEditProductCategory] = useState('');
    const [editProductDescription, setEditProductDescription] = useState('');
    const [editProductImage, setEditProductImage] = useState<File | null>(null);
    const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
    const [editSizeOptions, setEditSizeOptions] = useState<{ size: string; price: string }[]>([]);
    const [editPortionOptions, setEditPortionOptions] = useState<{ portion: string; price: string }[]>([]);
    const [editCustomSizeOptions, setEditCustomSizeOptions] = useState<{ size: string; price: string }[]>([]);
    const [editOptionTypeSelected, setEditOptionTypeSelected] = useState<'size' | 'portion' | 'custom' | null>(null);
    const [editAddons, setEditAddons] = useState<{ name: string; price: string }[]>([]);
    const [editSizeOptionsDetails, setEditSizeOptionsDetails] = useState<{ size: string; price: string; enabled: boolean }[]>([]);
    const [editPortionOptionsDetails, setEditPortionOptionsDetails] = useState<{ portion: string; price: string; enabled: boolean }[]>([]);
    const [editCustomSizeOptionsDetails, setEditCustomSizeOptionsDetails] = useState<{ size: string; price: string; enabled: boolean }[]>([]);
    const [editOptionTypeSelectedDetails, setEditOptionTypeSelectedDetails] = useState<'size' | 'portion' | 'custom' | null>(null);
    const [editAddonsDetails, setEditAddonsDetails] = useState<{ name: string; price: string; enabled: boolean }[]>([]);
    const [showEditProductDetails, setShowEditProductDetails] = useState(false);
    const [editingProductDetails, setEditingProductDetails] = useState<any>(null);
    const [editProductNameDetails, setEditProductNameDetails] = useState('');
    const [editProductPriceDetails, setEditProductPriceDetails] = useState('');
    const [editProductCategoryDetails, setEditProductCategoryDetails] = useState('');
    const [editProductDescriptionDetails, setEditProductDescriptionDetails] = useState('');
    const [editProductImageDetails, setEditProductImageDetails] = useState<File | null>(null);
    const [editImagePreviewDetails, setEditImagePreviewDetails] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fetch categories from API on mount
    useEffect(() => {
        axios.get('/api/categories')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    // Fetch products from API on mount
    useEffect(() => {
        axios.get('/api/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const navMain = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    ];

    const navMenuManager = [
        { id: 'category', label: 'Category', icon: <Tags size={18} /> },
        { id: 'products', label: 'Products', icon: <Package size={18} /> },
        { id: 'products-details', label: 'Products Details', icon: <FileText size={18} /> },
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
                                    {(item as any).badge && (
                                        <span className="ml-auto bg-gray-200 text-gray-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                                            {(item as any).badge}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Menu Manager section */}
                        <p className="mt-5 mb-1.5 px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Menu Manager</p>
                        <div className="space-y-0.5">
                            {navMenuManager.map((item) => (
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

                            {/* ── Category ── */}
                            {activeSection === 'category' && (
                                <motion.div
                                    key="category"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-5"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h1 className="text-xl font-bold text-gray-900">Category</h1>
                                            <p className="text-sm text-gray-500 mt-0.5">Manage your menu categories</p>
                                        </div>
                                        <button
                                            onClick={() => setShowAddCategory(true)}
                                            className="flex items-center gap-2 bg-[#E05D36] hover:bg-[#C8502D] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                                        >
                                            <Plus size={16} /> Add Category
                                        </button>
                                    </div>

                                    {/* Add Category Modal */}
                                    {showAddCategory && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                                            onClick={() => setShowAddCategory(false)}
                                        >
                                            <motion.div
                                                initial={{ scale: 0.95, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.95, opacity: 0 }}
                                                className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <div className="flex items-center justify-between mb-6">
                                                    <h2 className="text-lg font-bold text-gray-900">Add New Category</h2>
                                                    <button
                                                        onClick={() => setShowAddCategory(false)}
                                                        className="text-gray-400 hover:text-gray-600 transition"
                                                    >
                                                        <Plus size={20} className="rotate-45" />
                                                    </button>
                                                </div>

                                                <form className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                            Category Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={newCategoryName}
                                                            onChange={(e) => setNewCategoryName(e.target.value)}
                                                            placeholder="e.g., Appetizers, Main Course"
                                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-sm"
                                                            autoFocus
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                            Description
                                                        </label>
                                                        <textarea
                                                            value={newCategoryDescription}
                                                            onChange={(e) => setNewCategoryDescription(e.target.value)}
                                                            placeholder="Brief description of this category"
                                                            rows={3}
                                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-sm resize-none"
                                                        />
                                                    </div>

                                                    <div className="flex gap-3 pt-4">
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowAddCategory(false)}
                                                            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (newCategoryName.trim()) {
                                                                    axios.post('/api/categories', {
                                                                        name: newCategoryName,
                                                                        description: newCategoryDescription,
                                                                        status: 'Active'
                                                                    })
                                                                    .then((response) => {
                                                                        setCategories([...categories, response.data]);
                                                                        setNewCategoryName('');
                                                                        setNewCategoryDescription('');
                                                                        setShowAddCategory(false);
                                                                    })
                                                                    .catch((error) => {
                                                                        console.error('Error adding category:', error);
                                                                    });
                                                                }
                                                            }}
                                                            className="flex-1 px-4 py-2.5 bg-[#E05D36] hover:bg-[#C8502D] text-white rounded-lg text-sm font-medium transition"
                                                        >
                                                            Add Category
                                                        </button>
                                                    </div>
                                                </form>
                                            </motion.div>
                                        </motion.div>
                                    )}

                                    <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
                                        {categories.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-12 px-4">
                                                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                                                    <Tags size={24} className="text-gray-400" />
                                                </div>
                                                <p className="text-gray-800 font-semibold">No categories yet</p>
                                                <p className="text-sm text-gray-400 mt-1">Click "Add Category" to create your first category</p>
                                            </div>
                                        ) : (
                                            categories.map((category) => (
                                                <div key={category.id} className="flex items-center gap-4 p-4 hover:bg-gray-50/60 transition-colors">
                                                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#E05D36]/20 to-orange-100 flex items-center justify-center shrink-0">
                                                        <Tags size={16} className="text-[#E05D36]" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-800">{category.name}</p>
                                                        <p className="text-xs text-gray-400">{category.description || 'No description'}</p>
                                                    </div>
                                                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${category.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                                        {category.status}
                                                    </span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {/* ── Products ── */}
                            {activeSection === 'products' && (
                                <motion.div
                                    key="products"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-5"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h1 className="text-xl font-bold text-gray-900">Products</h1>
                                            <p className="text-sm text-gray-500 mt-0.5">Manage your menu items</p>
                                        </div>
                                        <button
                                            onClick={() => setShowAddProduct(true)}
                                            className="flex items-center gap-2 bg-[#E05D36] hover:bg-[#C8502D] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                                        >
                                            <Plus size={16} /> Add Product
                                        </button>
                                    </div>

                                    {/* Add Product Modal */}
                                    {showAddProduct && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                                            onClick={() => setShowAddProduct(false)}
                                        >
                                            <motion.div
                                                initial={{ scale: 0.95, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.95, opacity: 0 }}
                                                className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <div className="flex items-center justify-between mb-6">
                                                    <h2 className="text-lg font-bold text-gray-900">Add New Product</h2>
                                                    <button
                                                        onClick={() => setShowAddProduct(false)}
                                                        className="text-gray-400 hover:text-gray-600 transition"
                                                    >
                                                        <Plus size={20} className="rotate-45" />
                                                    </button>
                                                </div>

                                                <form>
                                                    <div className="grid grid-cols-3 gap-6">
                                                        <div className="col-span-2 space-y-4">
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                                                        Product Name
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        value={newProductName}
                                                                        onChange={(e) => setNewProductName(e.target.value)}
                                                                        placeholder="e.g., Artisan Burger"
                                                                        className="w-full px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                        autoFocus
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                                                        Category
                                                                    </label>
                                                                    <select
                                                                        value={newProductCategory}
                                                                        onChange={(e) => setNewProductCategory(e.target.value)}
                                                                        className="w-full px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                    >
                                                                        <option value="">Select a category</option>
                                                                        {categories.map((cat) => (
                                                                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                                    Description
                                                                </label>
                                                                <textarea
                                                                    value={newProductDescription}
                                                                    onChange={(e) => setNewProductDescription(e.target.value)}
                                                                    placeholder="Brief description of this product"
                                                                    rows={3}
                                                                    className="w-full px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs resize-none"
                                                                />
                                                            </div>

                                                            {/* Size Options */}
                                                            <div className="space-y-2">
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <label className="block text-sm font-medium text-gray-700">
                                                                        Size Options
                                                                    </label>
                                                                    <div className="flex items-center gap-3">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setCustomSizeOptions([...customSizeOptions, { size: '', price: '' }]);
                                                                                setOptionTypeSelected('custom');
                                                                            }}
                                                                            disabled={optionTypeSelected === 'size' || optionTypeSelected === 'portion'}
                                                                            className={`text-xs font-medium flex items-center gap-1 transition-all ${
                                                                                optionTypeSelected === 'size' || optionTypeSelected === 'portion'
                                                                                    ? 'text-gray-400 cursor-not-allowed'
                                                                                    : 'text-[#E05D36] hover:text-[#C8502D]'
                                                                            }`}
                                                                        >
                                                                            <Plus size={14} /> Custom Size
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setPortionOptions([...portionOptions, { portion: '', price: '' }]);
                                                                                setOptionTypeSelected('portion');
                                                                            }}
                                                                            disabled={optionTypeSelected === 'size' || optionTypeSelected === 'custom'}
                                                                            className={`text-xs font-medium flex items-center gap-1 transition-all ${
                                                                                optionTypeSelected === 'size' || optionTypeSelected === 'custom'
                                                                                    ? 'text-gray-400 cursor-not-allowed'
                                                                                    : 'text-[#E05D36] hover:text-[#C8502D]'
                                                                            }`}
                                                                        >
                                                                            <Plus size={14} /> Add Portion
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setSizeOptions([...sizeOptions, { size: '', price: '' }]);
                                                                                setOptionTypeSelected('size');
                                                                            }}
                                                                            disabled={optionTypeSelected === 'portion' || optionTypeSelected === 'custom'}
                                                                            className={`text-xs font-medium flex items-center gap-1 transition-all ${
                                                                                optionTypeSelected === 'portion' || optionTypeSelected === 'custom'
                                                                                    ? 'text-gray-400 cursor-not-allowed'
                                                                                    : 'text-[#E05D36] hover:text-[#C8502D]'
                                                                            }`}
                                                                        >
                                                                            <Plus size={14} /> Add Size
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    {sizeOptions.map((option, index) => (
                                                                        <div key={index} className="flex gap-2">
                                                                            <select
                                                                                value={option.size}
                                                                                onChange={(e) => {
                                                                                    const newOptions = [...sizeOptions];
                                                                                    newOptions[index].size = e.target.value;
                                                                                    setSizeOptions(newOptions);
                                                                                }}
                                                                                className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                            >
                                                                                <option value="">Select Size</option>
                                                                                <option value="Small">Small</option>
                                                                                <option value="Medium">Medium</option>
                                                                                <option value="Large">Large</option>
                                                                            </select>
                                                                            <input
                                                                                type="number"
                                                                                step="0.01"
                                                                                value={option.price}
                                                                                onChange={(e) => {
                                                                                    const newOptions = [...sizeOptions];
                                                                                    newOptions[index].price = e.target.value;
                                                                                    setSizeOptions(newOptions);
                                                                                }}
                                                                                placeholder="Price"
                                                                                className="w-24 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    const newOptions = sizeOptions.filter((_, i) => i !== index);
                                                                                    setSizeOptions(newOptions);
                                                                                    if (newOptions.length === 0) {
                                                                                        setOptionTypeSelected(null);
                                                                                    }
                                                                                }}
                                                                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                                                                            >
                                                                                <Plus size={14} className="rotate-45" />
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                {sizeOptions.length === 0 && (
                                                                    <p className="text-xs text-gray-400 mt-1">No size options added</p>
                                                                )}

                                                                {/* Custom Size Options */}
                                                                <div className="space-y-2">
                                                                    {customSizeOptions.map((option, index) => (
                                                                        <div key={index} className="flex gap-2">
                                                                            <input
                                                                                type="text"
                                                                                value={option.size}
                                                                                onChange={(e) => {
                                                                                    const newOptions = [...customSizeOptions];
                                                                                    newOptions[index].size = e.target.value;
                                                                                    setCustomSizeOptions(newOptions);
                                                                                }}
                                                                                placeholder="Enter custom size"
                                                                                className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                            />
                                                                            <input
                                                                                type="number"
                                                                                step="0.01"
                                                                                value={option.price}
                                                                                onChange={(e) => {
                                                                                    const newOptions = [...customSizeOptions];
                                                                                    newOptions[index].price = e.target.value;
                                                                                    setCustomSizeOptions(newOptions);
                                                                                }}
                                                                                placeholder="Price"
                                                                                className="w-24 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    const newOptions = customSizeOptions.filter((_, i) => i !== index);
                                                                                    setCustomSizeOptions(newOptions);
                                                                                    if (newOptions.length === 0) {
                                                                                        setOptionTypeSelected(null);
                                                                                    }
                                                                                }}
                                                                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                                                                            >
                                                                                <Plus size={14} className="rotate-45" />
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                {customSizeOptions.length === 0 && (
                                                                    <p className="text-xs text-gray-400 mt-1">No custom size options added</p>
                                                                )}

                                                                {/* Portion Options */}
                                                                <div className="space-y-2">
                                                                    {portionOptions.map((option, index) => (
                                                                        <div key={index} className="flex gap-2">
                                                                            <select
                                                                                value={option.portion}
                                                                                onChange={(e) => {
                                                                                    const newOptions = [...portionOptions];
                                                                                    newOptions[index].portion = e.target.value;
                                                                                    setPortionOptions(newOptions);
                                                                                }}
                                                                                className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                            >
                                                                                <option value="">Select Portion</option>
                                                                                <option value="Normal Portion">Normal Portion</option>
                                                                                <option value="Full Portion">Full Portion</option>
                                                                            </select>
                                                                            <input
                                                                                type="number"
                                                                                step="0.01"
                                                                                value={option.price}
                                                                                onChange={(e) => {
                                                                                    const newOptions = [...portionOptions];
                                                                                    newOptions[index].price = e.target.value;
                                                                                    setPortionOptions(newOptions);
                                                                                }}
                                                                                placeholder="Price"
                                                                                className="w-24 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    const newOptions = portionOptions.filter((_, i) => i !== index);
                                                                                    setPortionOptions(newOptions);
                                                                                    if (newOptions.length === 0) {
                                                                                        setOptionTypeSelected(null);
                                                                                    }
                                                                                }}
                                                                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                                                                            >
                                                                                <Plus size={14} className="rotate-45" />
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                {portionOptions.length === 0 && (
                                                                    <p className="text-xs text-gray-400 mt-1">No portion options added</p>
                                                                )}
                                                            </div>

                                                            {/* Add-ons */}
                                                            <div className="space-y-2">
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <label className="block text-sm font-medium text-gray-700">
                                                                        Add-ons / Extras
                                                                    </label>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setAddons([...addons, { name: '', price: '' }])}
                                                                        className="text-xs text-[#E05D36] hover:text-[#C8502D] font-medium flex items-center gap-1"
                                                                    >
                                                                        <Plus size={14} /> Add Extra
                                                                    </button>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    {addons.map((addon, index) => (
                                                                        <div key={index} className="flex gap-2">
                                                                            <input
                                                                                type="text"
                                                                                value={addon.name}
                                                                                onChange={(e) => {
                                                                                    const newAddons = [...addons];
                                                                                    newAddons[index].name = e.target.value;
                                                                                    setAddons(newAddons);
                                                                                }}
                                                                                placeholder="e.g., Extra Cheese"
                                                                                className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                            />
                                                                            <input
                                                                                type="number"
                                                                                step="0.01"
                                                                                value={addon.price}
                                                                                onChange={(e) => {
                                                                                    const newAddons = [...addons];
                                                                                    newAddons[index].price = e.target.value;
                                                                                    setAddons(newAddons);
                                                                                }}
                                                                                placeholder="Price"
                                                                                className="w-24 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    const newAddons = addons.filter((_, i) => i !== index);
                                                                                    setAddons(newAddons);
                                                                                }}
                                                                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                                                                            >
                                                                                <Plus size={14} className="rotate-45" />
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                {addons.length === 0 && (
                                                                    <p className="text-xs text-gray-400 mt-1">No add-ons added</p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="col-span-1 space-y-5">
                                                            <div>
                                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                                    Base Price ($)
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    step="0.01"
                                                                    value={newProductPrice}
                                                                    onChange={(e) => setNewProductPrice(e.target.value)}
                                                                    placeholder="e.g., 12.99"
                                                                    className="w-full px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                />
                                                            </div>

                                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                                Product Image
                                                            </label>
                                                            <div className="flex flex-col">
                                                                {imagePreview ? (
                                                                    <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-200 mb-3">
                                                                        <img
                                                                            src={imagePreview}
                                                                            alt="Preview"
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <div className="w-full aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center mb-3 bg-gray-50">
                                                                        <Package size={40} className="text-gray-400 mb-2" />
                                                                        <span className="text-sm text-gray-500 text-center px-4">
                                                                            Drag and drop or click to upload
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                <label className="w-full cursor-pointer">
                                                                    <div className="flex items-center justify-center px-4 py-3 bg-[#E05D36] hover:bg-[#C8502D] text-white rounded-lg text-sm font-medium transition">
                                                                        <Package size={18} className="mr-2" />
                                                                        {imagePreview ? 'Change Image' : 'Upload Image'}
                                                                    </div>
                                                                    <input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={(e) => {
                                                                            const file = e.target.files?.[0];
                                                                            if (file) {
                                                                                setNewProductImage(file);
                                                                                const reader = new FileReader();
                                                                                reader.onloadend = () => {
                                                                                    setImagePreview(reader.result as string);
                                                                                };
                                                                                reader.readAsDataURL(file);
                                                                            }
                                                                        }}
                                                                        className="hidden"
                                                                    />
                                                                </label>
                                                                {imagePreview && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setNewProductImage(null);
                                                                            setImagePreview(null);
                                                                        }}
                                                                        className="w-full mt-2 px-4 py-3 border border-red-200 text-red-500 hover:bg-red-50 rounded-lg text-sm font-medium transition"
                                                                    >
                                                                        Remove Image
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-3 pt-4 mt-6 border-t border-gray-100">
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowAddProduct(false)}
                                                            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (newProductName.trim() && newProductPrice) {
                                                                    const formData = new FormData();
                                                                    formData.append('name', newProductName);
                                                                    formData.append('category', newProductCategory || 'Uncategorized');
                                                                    formData.append('price', newProductPrice);
                                                                    formData.append('description', newProductDescription);
                                                                    formData.append('status', 'Available');
                                                                    // Combine size, custom size, and portion options
                                                                    const allSizeOptions = [...sizeOptions, ...customSizeOptions];
                                                                    if (portionOptions.length > 0) {
                                                                        portionOptions.forEach((opt) => {
                                                                            allSizeOptions.push({ size: opt.portion, price: opt.price });
                                                                        });
                                                                    }
                                                                    // Always send size_options (even if empty array)
                                                                    formData.append('size_options', JSON.stringify(allSizeOptions));
                                                                    // Always send addons (even if empty array)
                                                                    formData.append('addons', JSON.stringify(addons));
                                                                    if (newProductImage) {
                                                                        formData.append('image', newProductImage);
                                                                    }

                                                                    axios.post('/api/products', formData, {
                                                                        headers: {
                                                                            'Content-Type': 'multipart/form-data',
                                                                        },
                                                                    })
                                                                    .then((response) => {
                                                                        setProducts([...products, response.data]);
                                                                        setCurrentPage(1);
                                                                        setNewProductName('');
                                                                        setNewProductPrice('');
                                                                        setNewProductCategory('');
                                                                        setNewProductDescription('');
                                                                        setNewProductImage(null);
                                                                        setImagePreview(null);
                                                                        setSizeOptions([]);
                                                                        setPortionOptions([]);
                                                                        setCustomSizeOptions([]);
                                                                        setOptionTypeSelected(null);
                                                                        setAddons([]);
                                                                        setShowAddProduct(false);
                                                                    })
                                                                    .catch((error) => {
                                                                        console.error('Error adding product:', error);
                                                                    });
                                                                }
                                                            }}
                                                            className="flex-1 px-4 py-2.5 bg-[#E05D36] hover:bg-[#C8502D] text-white rounded-lg text-sm font-medium transition"
                                                        >
                                                            Add Product
                                                        </button>
                                                    </div>
                                                </form>
                                            </motion.div>
                                        </motion.div>
                                    )}

                                    <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
                                        {/* Header */}
                                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-t-xl border-b border-gray-100">
                                            <div className="w-9 h-9 shrink-0"></div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Name</p>
                                            </div>
                                            <div className="w-32 shrink-0">
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</p>
                                            </div>
                                            <div className="w-24 shrink-0">
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Base Price</p>
                                            </div>
                                            <div className="w-20 shrink-0">
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Visible</p>
                                            </div>
                                            <div className="w-20 shrink-0">
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Actions</p>
                                            </div>
                                        </div>

                                        {/* Products List */}
                                        {products.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-12 px-4">
                                                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                                                    <Package size={24} className="text-gray-400" />
                                                </div>
                                                <p className="text-gray-800 font-semibold">No products yet</p>
                                                <p className="text-sm text-gray-400 mt-1">Click "Add Product" to create your first product</p>
                                            </div>
                                        ) : (
                                            products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((product) => (
                                                <div key={product.id} className="flex items-center gap-4 p-4 hover:bg-gray-50/60 transition-colors group">
                                                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#E05D36]/20 to-orange-100 flex items-center justify-center shrink-0">
                                                        <Package size={16} className="text-[#E05D36]" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                                                    </div>
                                                    <div className="w-32 shrink-0">
                                                        <p className="text-sm text-gray-600">{product.category}</p>
                                                    </div>
                                                    <div className="w-24 shrink-0">
                                                        <p className="text-sm font-bold text-[#E05D36] text-right">${parseFloat(product.price).toFixed(2)}</p>
                                                    </div>
                                                    <div className="w-28 shrink-0 flex justify-center">
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={product.status === 'Available'}
                                                                onChange={() => {
                                                                    const formData = new FormData();
                                                                    formData.append('_method', 'PUT');
                                                                    formData.append('status', product.status === 'Available' ? 'Hidden' : 'Available');
                                                                    axios.post(`/api/products/${product.id}`, formData, {
                                                                        headers: {
                                                                            'Content-Type': 'multipart/form-data',
                                                                        },
                                                                    })
                                                                    .then(() => {
                                                                        setProducts(products.map(p => p.id === product.id ? { ...p, status: product.status === 'Available' ? 'Hidden' : 'Available' } : p));
                                                                    })
                                                                    .catch((error) => {
                                                                        console.error('Error updating product visibility:', error);
                                                                    });
                                                                }}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#E05D36]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E05D36]"></div>
                                                        </label>
                                                    </div>
                                                    <div className="w-20 shrink-0 flex gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setEditingProduct(product);
                                                                setEditProductName(product.name);
                                                                setEditProductPrice(product.price);
                                                                setEditProductCategory(product.category || '');
                                                                setEditProductDescription(product.description || '');
                                                                setEditImagePreview(product.image ? `/storage/${product.image}` : null);
                                                                // Separate size options from portion options
                                                                const sizeOpts = Array.isArray(product.size_options) ? product.size_options : [];
                                                                const portionOpts = sizeOpts.filter((opt: any) => ['Normal Portion', 'Full Portion'].includes(opt.size));
                                                                // Predefined sizes: Small, Medium, Large (use dropdown)
                                                                const predefinedSizes = ['Small', 'Medium', 'Large'];
                                                                const predefinedSizeOpts = sizeOpts.filter((opt: any) => predefinedSizes.includes(opt.size));
                                                                // Custom sizes: anything else (use text input)
                                                                const customSizeOpts = sizeOpts.filter((opt: any) => !predefinedSizes.includes(opt.size) && !['Normal Portion', 'Full Portion'].includes(opt.size));
                                                                setEditSizeOptions(predefinedSizeOpts.map((opt: any) => ({ size: opt.size, price: opt.price })));
                                                                setEditCustomSizeOptions(customSizeOpts.map((opt: any) => ({ size: opt.size, price: opt.price })));
                                                                setEditPortionOptions(portionOpts.map((opt: any) => ({ portion: opt.size, price: opt.price })));
                                                                setEditAddons(Array.isArray(product.addons) ? product.addons : []);
                                                                setShowEditProduct(true);
                                                            }}
                                                            className="p-2 text-gray-400 hover:text-[#E05D36] hover:bg-gray-100 rounded-lg transition"
                                                        >
                                                            <Edit size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('Are you sure you want to delete this product?')) {
                                                                    axios.delete(`/api/products/${product.id}`)
                                                                        .then(() => {
                                                                            setProducts(products.filter(p => p.id !== product.id));
                                                                            if (products.length <= itemsPerPage && currentPage > 1) {
                                                                                setCurrentPage(currentPage - 1);
                                                                            }
                                                                        })
                                                                        .catch((error) => {
                                                                            console.error('Error deleting product:', error);
                                                                        });
                                                                }
                                                            }}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    {/* Pagination */}
                                    {products.length > 0 && (
                                        <div className="flex items-center justify-between mt-4">
                                            <p className="text-sm text-gray-500">
                                                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, products.length)} of {products.length} products
                                            </p>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => setCurrentPage(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                    className="p-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                                >
                                                    <ChevronLeft size={16} />
                                                </button>
                                                {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
                                                    <button
                                                        key={page}
                                                        onClick={() => setCurrentPage(page)}
                                                        className={`px-3 py-1.5 border rounded-lg text-sm font-medium transition ${currentPage === page
                                                                ? 'bg-[#E05D36] text-white border-[#E05D36]'
                                                                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => setCurrentPage(currentPage + 1)}
                                                    disabled={currentPage * itemsPerPage >= products.length}
                                                    className="p-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                                >
                                                    <ChevronRight size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* ── Products Details ── */}
                            {activeSection === 'products-details' && (
                                <motion.div
                                    key="products-details"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-5"
                                >
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900">Products Details</h1>
                                        <p className="text-sm text-gray-500 mt-0.5">Detailed product information and analytics</p>
                                    </div>

                                    <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
                                        {/* Header */}
                                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-t-xl border-b border-gray-100">
                                            <div className="w-9 h-9 shrink-0"></div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Name</p>
                                            </div>
                                            <div className="w-32 shrink-0">
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</p>
                                            </div>
                                            <div className="w-24 shrink-0">
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Base Price</p>
                                            </div>
                                            <div className="w-20 shrink-0">
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Visible</p>
                                            </div>
                                            <div className="w-20 shrink-0">
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Actions</p>
                                            </div>
                                        </div>

                                        {/* Products List */}
                                        {products.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-12 px-4">
                                                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                                                    <Package size={24} className="text-gray-400" />
                                                </div>
                                                <p className="text-gray-800 font-semibold">No products yet</p>
                                                <p className="text-sm text-gray-400 mt-1">Click "Add Product" to create your first product</p>
                                            </div>
                                        ) : (
                                            products.map((product) => (
                                                <div key={product.id} className="flex items-center gap-4 p-4 hover:bg-gray-50/60 transition-colors group">
                                                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#E05D36]/20 to-orange-100 flex items-center justify-center shrink-0">
                                                        <Package size={16} className="text-[#E05D36]" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                                                    </div>
                                                    <div className="w-32 shrink-0">
                                                        <p className="text-sm text-gray-600">{product.category}</p>
                                                    </div>
                                                    <div className="w-24 shrink-0">
                                                        <p className="text-sm font-bold text-[#E05D36] text-right">${parseFloat(product.price).toFixed(2)}</p>
                                                    </div>
                                                    <div className="w-28 shrink-0 flex justify-center">
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={product.status === 'Available'}
                                                                onChange={() => {
                                                                    const formData = new FormData();
                                                                    formData.append('_method', 'PUT');
                                                                    formData.append('status', product.status === 'Available' ? 'Hidden' : 'Available');
                                                                    axios.post(`/api/products/${product.id}`, formData, {
                                                                        headers: {
                                                                            'Content-Type': 'multipart/form-data',
                                                                        },
                                                                    })
                                                                    .then(() => {
                                                                        setProducts(products.map(p => p.id === product.id ? { ...p, status: product.status === 'Available' ? 'Hidden' : 'Available' } : p));
                                                                    })
                                                                    .catch((error) => {
                                                                        console.error('Error updating product visibility:', error);
                                                                    });
                                                                }}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#E05D36]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E05D36]"></div>
                                                        </label>
                                                    </div>
                                                    <div className="w-20 shrink-0 flex gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setEditingProductDetails(product);
                                                                setEditProductNameDetails(product.name);
                                                                setEditProductPriceDetails(product.price);
                                                                setEditProductCategoryDetails(product.category || '');
                                                                setEditProductDescriptionDetails(product.description || '');
                                                                setEditImagePreviewDetails(product.image ? `/storage/${product.image}` : null);
                                                                const sizeOpts = Array.isArray(product.size_options) ? product.size_options : [];
                                                                const addonOpts = Array.isArray(product.addons) ? product.addons : [];
                                                                // Separate size options from portion options
                                                                const portionOpts = sizeOpts.filter((opt: any) => ['Normal Portion', 'Full Portion'].includes(opt.size));
                                                                // Predefined sizes: Small, Medium, Large (use dropdown)
                                                                const predefinedSizes = ['Small', 'Medium', 'Large'];
                                                                const predefinedSizeOpts = sizeOpts.filter((opt: any) => predefinedSizes.includes(opt.size));
                                                                // Custom sizes: anything else (use text input)
                                                                const customSizeOpts = sizeOpts.filter((opt: any) => !predefinedSizes.includes(opt.size) && !['Normal Portion', 'Full Portion'].includes(opt.size));
                                                                // Restore enabled state from saved data, default to true if not present
                                                                setEditSizeOptionsDetails(predefinedSizeOpts.map((opt: any) => ({
                                                                    size: opt.size,
                                                                    price: opt.price,
                                                                    enabled: opt.enabled !== undefined ? opt.enabled : true
                                                                })));
                                                                setEditCustomSizeOptionsDetails(customSizeOpts.map((opt: any) => ({
                                                                    size: opt.size,
                                                                    price: opt.price,
                                                                    enabled: opt.enabled !== undefined ? opt.enabled : true
                                                                })));
                                                                setEditPortionOptionsDetails(portionOpts.map((opt: any) => ({
                                                                    portion: opt.size,
                                                                    price: opt.price,
                                                                    enabled: opt.enabled !== undefined ? opt.enabled : true
                                                                })));
                                                                setEditAddonsDetails(addonOpts.map((opt: any) => ({
                                                                    name: opt.name,
                                                                    price: opt.price,
                                                                    enabled: opt.enabled !== undefined ? opt.enabled : true
                                                                })));
                                                                setShowEditProductDetails(true);
                                                            }}
                                                            className="p-2 text-gray-400 hover:text-[#E05D36] hover:bg-gray-100 rounded-lg transition"
                                                        >
                                                            <Edit size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('Are you sure you want to delete this product?')) {
                                                                    axios.delete(`/api/products/${product.id}`)
                                                                        .then(() => {
                                                                            setProducts(products.filter(p => p.id !== product.id));
                                                                        })
                                                                        .catch((error) => {
                                                                            console.error('Error deleting product:', error);
                                                                        });
                                                                }
                                                            }}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Edit Product Modal - Outside AnimatePresence for global access */}
                        {showEditProduct && editingProduct && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                                onClick={() => setShowEditProduct(false)}
                            >
                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.95, opacity: 0 }}
                                    className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-lg font-bold text-gray-900">Edit Product</h2>
                                        <button
                                            onClick={() => setShowEditProduct(false)}
                                            className="text-gray-400 hover:text-gray-600 transition"
                                        >
                                            <Plus size={20} className="rotate-45" />
                                        </button>
                                    </div>

                                    <form>
                                        <div className="grid grid-cols-3 gap-8">
                                            <div className="col-span-2 space-y-4">
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Product Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={editProductName}
                                                            onChange={(e) => setEditProductName(e.target.value)}
                                                            placeholder="e.g., Artisan Burger"
                                                            className="w-full px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                            autoFocus
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Category
                                                        </label>
                                                        <select
                                                            value={editProductCategory}
                                                            onChange={(e) => setEditProductCategory(e.target.value)}
                                                            className="w-full px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                        >
                                                            <option value="">Select a category</option>
                                                            {categories.map((cat) => (
                                                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                                        Description
                                                    </label>
                                                    <textarea
                                                        value={editProductDescription}
                                                        onChange={(e) => setEditProductDescription(e.target.value)}
                                                        placeholder="Brief description of this product"
                                                        rows={3}
                                                        className="w-full px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs resize-none"
                                                    />
                                                </div>

                                                {/* Size Options */}
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Size Options
                                                        </label>
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setEditCustomSizeOptions([...editCustomSizeOptions, { size: '', price: '' }]);
                                                                    setEditOptionTypeSelected('custom');
                                                                }}
                                                                disabled={editOptionTypeSelected === 'size' || editOptionTypeSelected === 'portion'}
                                                                className={`text-xs font-medium flex items-center gap-1 transition-all ${
                                                                    editOptionTypeSelected === 'size' || editOptionTypeSelected === 'portion'
                                                                        ? 'text-gray-400 cursor-not-allowed'
                                                                        : 'text-[#E05D36] hover:text-[#C8502D]'
                                                                }`}
                                                            >
                                                                <Plus size={14} /> Custom Size
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setEditPortionOptions([...editPortionOptions, { portion: '', price: '' }]);
                                                                    setEditOptionTypeSelected('portion');
                                                                }}
                                                                disabled={editOptionTypeSelected === 'size' || editOptionTypeSelected === 'custom'}
                                                                className={`text-xs font-medium flex items-center gap-1 transition-all ${
                                                                    editOptionTypeSelected === 'size' || editOptionTypeSelected === 'custom'
                                                                        ? 'text-gray-400 cursor-not-allowed'
                                                                        : 'text-[#E05D36] hover:text-[#C8502D]'
                                                                }`}
                                                            >
                                                                <Plus size={14} /> Add Portion
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setEditSizeOptions([...editSizeOptions, { size: '', price: '' }]);
                                                                    setEditOptionTypeSelected('size');
                                                                }}
                                                                disabled={editOptionTypeSelected === 'portion' || editOptionTypeSelected === 'custom'}
                                                                className={`text-xs font-medium flex items-center gap-1 transition-all ${
                                                                    editOptionTypeSelected === 'portion' || editOptionTypeSelected === 'custom'
                                                                        ? 'text-gray-400 cursor-not-allowed'
                                                                        : 'text-[#E05D36] hover:text-[#C8502D]'
                                                                }`}
                                                            >
                                                                <Plus size={14} /> Add Size
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {editSizeOptions.map((option, index) => (
                                                            <div key={index} className="flex gap-2">
                                                                <select
                                                                    value={option.size}
                                                                    onChange={(e) => {
                                                                        const newOptions = [...editSizeOptions];
                                                                        newOptions[index].size = e.target.value;
                                                                        setEditSizeOptions(newOptions);
                                                                    }}
                                                                    className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                >
                                                                    <option value="">Select Size</option>
                                                                    <option value="Small">Small</option>
                                                                    <option value="Medium">Medium</option>
                                                                    <option value="Large">Large</option>
                                                                </select>
                                                                <input
                                                                    type="number"
                                                                    step="0.01"
                                                                    value={option.price}
                                                                    onChange={(e) => {
                                                                        const newOptions = [...editSizeOptions];
                                                                        newOptions[index].price = e.target.value;
                                                                        setEditSizeOptions(newOptions);
                                                                    }}
                                                                    placeholder="Price"
                                                                    className="w-24 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const newOptions = editSizeOptions.filter((_, i) => i !== index);
                                                                        setEditSizeOptions(newOptions);
                                                                        if (newOptions.length === 0) {
                                                                            setEditOptionTypeSelected(null);
                                                                        }
                                                                    }}
                                                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                                                                >
                                                                    <Plus size={14} className="rotate-45" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {editSizeOptions.length === 0 && (
                                                        <p className="text-xs text-gray-400 mt-1">No size options added</p>
                                                    )}

                                                    {/* Custom Size Options */}
                                                    <div className="space-y-2">
                                                        {editCustomSizeOptions.map((option, index) => (
                                                            <div key={index} className="flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={option.size}
                                                                    onChange={(e) => {
                                                                        const newOptions = [...editCustomSizeOptions];
                                                                        newOptions[index].size = e.target.value;
                                                                        setEditCustomSizeOptions(newOptions);
                                                                    }}
                                                                    placeholder="Enter custom size"
                                                                    className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                />
                                                                <input
                                                                    type="number"
                                                                    step="0.01"
                                                                    value={option.price}
                                                                    onChange={(e) => {
                                                                        const newOptions = [...editCustomSizeOptions];
                                                                        newOptions[index].price = e.target.value;
                                                                        setEditCustomSizeOptions(newOptions);
                                                                    }}
                                                                    placeholder="Price"
                                                                    className="w-24 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const newOptions = editCustomSizeOptions.filter((_, i) => i !== index);
                                                                        setEditCustomSizeOptions(newOptions);
                                                                        if (newOptions.length === 0) {
                                                                            setEditOptionTypeSelected(null);
                                                                        }
                                                                    }}
                                                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                                                                >
                                                                    <Plus size={14} className="rotate-45" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {editCustomSizeOptions.length === 0 && (
                                                        <p className="text-xs text-gray-400 mt-1">No custom size options added</p>
                                                    )}

                                                    {/* Portion Options */}
                                                    <div className="space-y-2">
                                                        {editPortionOptions.map((option, index) => (
                                                            <div key={index} className="flex gap-2">
                                                                <select
                                                                    value={option.portion}
                                                                    onChange={(e) => {
                                                                        const newOptions = [...editPortionOptions];
                                                                        newOptions[index].portion = e.target.value;
                                                                        setEditPortionOptions(newOptions);
                                                                    }}
                                                                    className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                >
                                                                    <option value="">Select Portion</option>
                                                                    <option value="Normal Portion">Normal Portion</option>
                                                                    <option value="Full Portion">Full Portion</option>
                                                                </select>
                                                                <input
                                                                    type="number"
                                                                    step="0.01"
                                                                    value={option.price}
                                                                    onChange={(e) => {
                                                                        const newOptions = [...editPortionOptions];
                                                                        newOptions[index].price = e.target.value;
                                                                        setEditPortionOptions(newOptions);
                                                                    }}
                                                                    placeholder="Price"
                                                                    className="w-24 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const newOptions = editPortionOptions.filter((_, i) => i !== index);
                                                                        setEditPortionOptions(newOptions);
                                                                        if (newOptions.length === 0) {
                                                                            setEditOptionTypeSelected(null);
                                                                        }
                                                                    }}
                                                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                                                                >
                                                                    <Plus size={14} className="rotate-45" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {editPortionOptions.length === 0 && (
                                                        <p className="text-xs text-gray-400 mt-1">No portion options added</p>
                                                    )}
                                                </div>

                                                {/* Add-ons */}
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Add-ons / Extras
                                                        </label>
                                                        <button
                                                            type="button"
                                                            onClick={() => setEditAddons([...editAddons, { name: '', price: '' }])}
                                                            className="text-xs text-[#E05D36] hover:text-[#C8502D] font-medium flex items-center gap-1"
                                                        >
                                                            <Plus size={14} /> Add Extra
                                                        </button>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {editAddons.map((addon, index) => (
                                                            <div key={index} className="flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={addon.name}
                                                                    onChange={(e) => {
                                                                        const newAddons = [...editAddons];
                                                                        newAddons[index].name = e.target.value;
                                                                        setEditAddons(newAddons);
                                                                    }}
                                                                    placeholder="e.g., Extra Cheese"
                                                                    className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                />
                                                                <input
                                                                    type="number"
                                                                    step="0.01"
                                                                    value={addon.price}
                                                                    onChange={(e) => {
                                                                        const newAddons = [...editAddons];
                                                                        newAddons[index].price = e.target.value;
                                                                        setEditAddons(newAddons);
                                                                    }}
                                                                    placeholder="Price"
                                                                    className="w-24 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const newAddons = editAddons.filter((_, i) => i !== index);
                                                                        setEditAddons(newAddons);
                                                                    }}
                                                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                                                                >
                                                                    <Plus size={14} className="rotate-45" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {editAddons.length === 0 && (
                                                        <p className="text-xs text-gray-400 mt-1">No add-ons added</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-span-1 space-y-5">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                                        Base Price ($)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={editProductPrice}
                                                        onChange={(e) => setEditProductPrice(e.target.value)}
                                                        placeholder="e.g., 12.99"
                                                        className="w-full px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                    />
                                                </div>

                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Product Image
                                                </label>
                                                <div className="flex flex-col">
                                                    {editImagePreview ? (
                                                        <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-200 mb-3">
                                                            <img
                                                                src={editImagePreview}
                                                                alt="Preview"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="w-full aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center mb-3 bg-gray-50">
                                                            <Package size={40} className="text-gray-400 mb-2" />
                                                            <span className="text-sm text-gray-500 text-center px-4">
                                                                Drag and drop or click to upload
                                                            </span>
                                                        </div>
                                                    )}
                                                    <label className="w-full cursor-pointer">
                                                        <div className="flex items-center justify-center px-4 py-3 bg-[#E05D36] hover:bg-[#C8502D] text-white rounded-lg text-sm font-medium transition">
                                                            <Package size={18} className="mr-2" />
                                                            {editImagePreview ? 'Change Image' : 'Upload Image'}
                                                        </div>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    setEditProductImage(file);
                                                                    const reader = new FileReader();
                                                                    reader.onloadend = () => {
                                                                        setEditImagePreview(reader.result as string);
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                }
                                                            }}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                    {editImagePreview && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setEditProductImage(null);
                                                                setEditImagePreview(null);
                                                            }}
                                                            className="w-full mt-2 px-4 py-3 border border-red-200 text-red-500 hover:bg-red-50 rounded-lg text-sm font-medium transition"
                                                        >
                                                            Remove Image
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 pt-4 mt-6 border-t border-gray-100">
                                            <button
                                                type="button"
                                                onClick={() => setShowEditProduct(false)}
                                                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (editProductName.trim() && editProductPrice && editingProduct) {
                                                        const formData = new FormData();
                                                        formData.append('_method', 'PUT');
                                                        formData.append('name', editProductName);
                                                        formData.append('category', editProductCategory || 'Uncategorized');
                                                        formData.append('price', editProductPrice);
                                                        formData.append('description', editProductDescription);
                                                        formData.append('status', editingProduct.status);
                                                        // Combine size, custom size, and portion options
                                                        const allSizeOptions = [...editSizeOptions, ...editCustomSizeOptions];
                                                        if (editPortionOptions.length > 0) {
                                                            editPortionOptions.forEach((opt) => {
                                                                allSizeOptions.push({ size: opt.portion, price: opt.price });
                                                            });
                                                        }
                                                        // Always send size_options (even if empty array)
                                                        formData.append('size_options', JSON.stringify(allSizeOptions));
                                                        // Always send addons (even if empty array)
                                                        formData.append('addons', JSON.stringify(editAddons));
                                                        if (editProductImage) {
                                                            formData.append('image', editProductImage);
                                                        }

                                                        axios.post(`/api/products/${editingProduct.id}`, formData, {
                                                            headers: {
                                                                'Content-Type': 'multipart/form-data',
                                                            },
                                                        })
                                                        .then((response) => {
                                                            setProducts(products.map(p => p.id === editingProduct.id ? response.data : p));
                                                            setEditProductName('');
                                                            setEditProductPrice('');
                                                            setEditProductCategory('');
                                                            setEditProductDescription('');
                                                            setEditProductImage(null);
                                                            setEditImagePreview(null);
                                                            setEditSizeOptions([]);
                                                            setEditPortionOptions([]);
                                                            setEditCustomSizeOptions([]);
                                                            setEditOptionTypeSelected(null);
                                                            setEditAddons([]);
                                                            setEditingProduct(null);
                                                            setShowEditProduct(false);
                                                        })
                                                        .catch((error) => {
                                                            console.error('Error updating product:', error);
                                                        });
                                                    }
                                                }}
                                                className="flex-1 px-4 py-2.5 bg-[#E05D36] hover:bg-[#C8502D] text-white rounded-lg text-sm font-medium transition"
                                            >
                                                Update Product
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            </motion.div>
                        )}

                        {/* Edit Product Details Modal - With Toggle Switches */}
                        {showEditProductDetails && editingProductDetails && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                                onClick={() => setShowEditProductDetails(false)}
                            >
                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.95, opacity: 0 }}
                                    className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-lg font-bold text-gray-900">Edit Product Details</h2>
                                        <button
                                            onClick={() => setShowEditProductDetails(false)}
                                            className="text-gray-400 hover:text-gray-600 transition"
                                        >
                                            <Plus size={20} className="rotate-45" />
                                        </button>
                                    </div>

                                    <form>
                                        <div className="grid grid-cols-3 gap-8">
                                            <div className="col-span-2 space-y-4">
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Product Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={editProductNameDetails}
                                                            onChange={(e) => setEditProductNameDetails(e.target.value)}
                                                            placeholder="e.g., Artisan Burger"
                                                            className="w-full px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                            autoFocus
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Category
                                                        </label>
                                                        <select
                                                            value={editProductCategoryDetails}
                                                            onChange={(e) => setEditProductCategoryDetails(e.target.value)}
                                                            className="w-full px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                        >
                                                            <option value="">Select a category</option>
                                                            {categories.map((cat) => (
                                                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                                        Description
                                                    </label>
                                                    <textarea
                                                        value={editProductDescriptionDetails}
                                                        onChange={(e) => setEditProductDescriptionDetails(e.target.value)}
                                                        placeholder="Brief description of this product"
                                                        rows={3}
                                                        className="w-full px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs resize-none"
                                                    />
                                                </div>

                                                {/* Size Options with Toggle Switches */}
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Size Options
                                                        </label>
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setEditCustomSizeOptionsDetails([...editCustomSizeOptionsDetails, { size: '', price: '', enabled: true }]);
                                                                    setEditOptionTypeSelectedDetails('custom');
                                                                }}
                                                                disabled={editOptionTypeSelectedDetails === 'size' || editOptionTypeSelectedDetails === 'portion'}
                                                                className={`text-xs font-medium flex items-center gap-1 transition-all ${
                                                                    editOptionTypeSelectedDetails === 'size' || editOptionTypeSelectedDetails === 'portion'
                                                                        ? 'text-gray-400 cursor-not-allowed'
                                                                        : 'text-[#E05D36] hover:text-[#C8502D]'
                                                                }`}
                                                            >
                                                                <Plus size={14} /> Custom Size
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setEditPortionOptionsDetails([...editPortionOptionsDetails, { portion: '', price: '', enabled: true }]);
                                                                    setEditOptionTypeSelectedDetails('portion');
                                                                }}
                                                                disabled={editOptionTypeSelectedDetails === 'size' || editOptionTypeSelectedDetails === 'custom'}
                                                                className={`text-xs font-medium flex items-center gap-1 transition-all ${
                                                                    editOptionTypeSelectedDetails === 'size' || editOptionTypeSelectedDetails === 'custom'
                                                                        ? 'text-gray-400 cursor-not-allowed'
                                                                        : 'text-[#E05D36] hover:text-[#C8502D]'
                                                                }`}
                                                            >
                                                                <Plus size={14} /> Add Portion
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setEditSizeOptionsDetails([...editSizeOptionsDetails, { size: '', price: '', enabled: true }]);
                                                                    setEditOptionTypeSelectedDetails('size');
                                                                }}
                                                                disabled={editOptionTypeSelectedDetails === 'portion' || editOptionTypeSelectedDetails === 'custom'}
                                                                className={`text-xs font-medium flex items-center gap-1 transition-all ${
                                                                    editOptionTypeSelectedDetails === 'portion' || editOptionTypeSelectedDetails === 'custom'
                                                                        ? 'text-gray-400 cursor-not-allowed'
                                                                        : 'text-[#E05D36] hover:text-[#C8502D]'
                                                                }`}
                                                            >
                                                                <Plus size={14} /> Add Size
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {editSizeOptionsDetails.map((option, index) => (
                                                            <div key={index} className="flex gap-2 items-center">
                                                                <select
                                                                    value={option.size}
                                                                    onChange={(e) => {
                                                                        const newOptions = [...editSizeOptionsDetails];
                                                                        newOptions[index].size = e.target.value;
                                                                        setEditSizeOptionsDetails(newOptions);
                                                                    }}
                                                                    className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                >
                                                                    <option value="">Select Size</option>
                                                                    <option value="Small">Small</option>
                                                                    <option value="Medium">Medium</option>
                                                                    <option value="Large">Large</option>
                                                                </select>
                                                                <input
                                                                    type="number"
                                                                    step="0.01"
                                                                    value={option.price}
                                                                    onChange={(e) => {
                                                                        const newOptions = [...editSizeOptionsDetails];
                                                                        newOptions[index].price = e.target.value;
                                                                        setEditSizeOptionsDetails(newOptions);
                                                                    }}
                                                                    placeholder="Price"
                                                                    className="w-24 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                />
                                                                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={option.enabled}
                                                                        onChange={() => {
                                                                            const newOptions = [...editSizeOptionsDetails];
                                                                            newOptions[index].enabled = !newOptions[index].enabled;
                                                                            setEditSizeOptionsDetails(newOptions);
                                                                        }}
                                                                        className="sr-only peer"
                                                                    />
                                                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#E05D36]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#E05D36]"></div>
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {editSizeOptionsDetails.length === 0 && (
                                                        <p className="text-xs text-gray-400 mt-1">No size options added</p>
                                                    )}

                                                    {/* Custom Size Options */}
                                                    <div className="space-y-2">
                                                        {editCustomSizeOptionsDetails.map((option, index) => (
                                                            <div key={index} className="flex gap-2 items-center">
                                                                <input
                                                                    type="text"
                                                                    value={option.size}
                                                                    onChange={(e) => {
                                                                        const newOptions = [...editCustomSizeOptionsDetails];
                                                                        newOptions[index].size = e.target.value;
                                                                        setEditCustomSizeOptionsDetails(newOptions);
                                                                    }}
                                                                    placeholder="Enter custom size"
                                                                    className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                />
                                                                <input
                                                                    type="number"
                                                                    step="0.01"
                                                                    value={option.price}
                                                                    onChange={(e) => {
                                                                        const newOptions = [...editCustomSizeOptionsDetails];
                                                                        newOptions[index].price = e.target.value;
                                                                        setEditCustomSizeOptionsDetails(newOptions);
                                                                    }}
                                                                    placeholder="Price"
                                                                    className="w-24 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                />
                                                                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={option.enabled}
                                                                        onChange={() => {
                                                                            const newOptions = [...editCustomSizeOptionsDetails];
                                                                            newOptions[index].enabled = !newOptions[index].enabled;
                                                                            setEditCustomSizeOptionsDetails(newOptions);
                                                                        }}
                                                                        className="sr-only peer"
                                                                    />
                                                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#E05D36]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#E05D36]"></div>
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {editCustomSizeOptionsDetails.length === 0 && (
                                                        <p className="text-xs text-gray-400 mt-1">No custom size options added</p>
                                                    )}

                                                    {/* Portion Options */}
                                                    <div className="space-y-2">
                                                        {editPortionOptionsDetails.map((option, index) => (
                                                            <div key={index} className="flex gap-2 items-center">
                                                                <select
                                                                    value={option.portion}
                                                                    onChange={(e) => {
                                                                        const newOptions = [...editPortionOptionsDetails];
                                                                        newOptions[index].portion = e.target.value;
                                                                        setEditPortionOptionsDetails(newOptions);
                                                                    }}
                                                                    className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                >
                                                                    <option value="">Select Portion</option>
                                                                    <option value="Normal Portion">Normal Portion</option>
                                                                    <option value="Full Portion">Full Portion</option>
                                                                </select>
                                                                <input
                                                                    type="number"
                                                                    step="0.01"
                                                                    value={option.price}
                                                                    onChange={(e) => {
                                                                        const newOptions = [...editPortionOptionsDetails];
                                                                        newOptions[index].price = e.target.value;
                                                                        setEditPortionOptionsDetails(newOptions);
                                                                    }}
                                                                    placeholder="Price"
                                                                    className="w-24 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                />
                                                                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={option.enabled}
                                                                        onChange={() => {
                                                                            const newOptions = [...editPortionOptionsDetails];
                                                                            newOptions[index].enabled = !newOptions[index].enabled;
                                                                            setEditPortionOptionsDetails(newOptions);
                                                                        }}
                                                                        className="sr-only peer"
                                                                    />
                                                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#E05D36]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#E05D36]"></div>
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {editPortionOptionsDetails.length === 0 && (
                                                        <p className="text-xs text-gray-400 mt-1">No portion options added</p>
                                                    )}
                                                </div>

                                                {/* Add-ons with Toggle Switches */}
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Add-ons / Extras
                                                        </label>
                                                        <button
                                                            type="button"
                                                            onClick={() => setEditAddonsDetails([...editAddonsDetails, { name: '', price: '', enabled: true }])}
                                                            className="text-xs text-[#E05D36] hover:text-[#C8502D] font-medium flex items-center gap-1"
                                                        >
                                                            <Plus size={14} /> Add Extra
                                                        </button>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {editAddonsDetails.map((addon, index) => (
                                                            <div key={index} className="flex gap-2 items-center">
                                                                <input
                                                                    type="text"
                                                                    value={addon.name}
                                                                    onChange={(e) => {
                                                                        const newAddons = [...editAddonsDetails];
                                                                        newAddons[index].name = e.target.value;
                                                                        setEditAddonsDetails(newAddons);
                                                                    }}
                                                                    placeholder="e.g., Extra Cheese"
                                                                    className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                />
                                                                <input
                                                                    type="number"
                                                                    step="0.01"
                                                                    value={addon.price}
                                                                    onChange={(e) => {
                                                                        const newAddons = [...editAddonsDetails];
                                                                        newAddons[index].price = e.target.value;
                                                                        setEditAddonsDetails(newAddons);
                                                                    }}
                                                                    placeholder="Price"
                                                                    className="w-24 px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                                />
                                                                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={addon.enabled}
                                                                        onChange={() => {
                                                                            const newAddons = [...editAddonsDetails];
                                                                            newAddons[index].enabled = !newAddons[index].enabled;
                                                                            setEditAddonsDetails(newAddons);
                                                                        }}
                                                                        className="sr-only peer"
                                                                    />
                                                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#E05D36]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#E05D36]"></div>
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {editAddonsDetails.length === 0 && (
                                                        <p className="text-xs text-gray-400 mt-1">No add-ons added</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-span-1 space-y-5">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                                        Base Price ($)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={editProductPriceDetails}
                                                        onChange={(e) => setEditProductPriceDetails(e.target.value)}
                                                        placeholder="e.g., 12.99"
                                                        className="w-full px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E05D36]/20 focus:border-[#E05D36]/40 text-xs"
                                                    />
                                                </div>

                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Product Image
                                                </label>
                                                <div className="flex flex-col">
                                                    {editImagePreviewDetails ? (
                                                        <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-200 mb-3">
                                                            <img
                                                                src={editImagePreviewDetails}
                                                                alt="Preview"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="w-full aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center mb-3 bg-gray-50">
                                                            <Package size={40} className="text-gray-400 mb-2" />
                                                            <span className="text-sm text-gray-500 text-center px-4">
                                                                Drag and drop or click to upload
                                                            </span>
                                                        </div>
                                                    )}
                                                    <label className="w-full cursor-pointer">
                                                        <div className="flex items-center justify-center px-4 py-3 bg-[#E05D36] hover:bg-[#C8502D] text-white rounded-lg text-sm font-medium transition">
                                                            <Package size={18} className="mr-2" />
                                                            {editImagePreviewDetails ? 'Change Image' : 'Upload Image'}
                                                        </div>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    setEditProductImageDetails(file);
                                                                    const reader = new FileReader();
                                                                    reader.onloadend = () => {
                                                                        setEditImagePreviewDetails(reader.result as string);
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                }
                                                            }}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                    {editImagePreviewDetails && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setEditProductImageDetails(null);
                                                                setEditImagePreviewDetails(null);
                                                            }}
                                                            className="w-full mt-2 px-4 py-3 border border-red-200 text-red-500 hover:bg-red-50 rounded-lg text-sm font-medium transition"
                                                        >
                                                            Remove Image
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 pt-4 mt-6 border-t border-gray-100">
                                            <button
                                                type="button"
                                                onClick={() => setShowEditProductDetails(false)}
                                                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (editProductNameDetails.trim() && editProductPriceDetails && editingProductDetails) {
                                                        const formData = new FormData();
                                                        formData.append('_method', 'PUT');
                                                        formData.append('name', editProductNameDetails);
                                                        formData.append('category', editProductCategoryDetails || 'Uncategorized');
                                                        formData.append('price', editProductPriceDetails);
                                                        formData.append('description', editProductDescriptionDetails);
                                                        formData.append('status', editingProductDetails.status);
                                                        // Combine size, custom size, and portion options with enabled state
                                                        const allSizeOptions = [...editSizeOptionsDetails, ...editCustomSizeOptionsDetails];
                                                        if (editPortionOptionsDetails.length > 0) {
                                                            editPortionOptionsDetails.forEach((opt) => {
                                                                allSizeOptions.push({ size: opt.portion, price: opt.price, enabled: opt.enabled });
                                                            });
                                                        }
                                                        // Always send size_options (even if empty array)
                                                        formData.append('size_options', JSON.stringify(allSizeOptions));
                                                        // Always send addons (even if empty array)
                                                        formData.append('addons', JSON.stringify(editAddonsDetails));
                                                        if (editProductImageDetails) {
                                                            formData.append('image', editProductImageDetails);
                                                        }

                                                        axios.post(`/api/products/${editingProductDetails.id}`, formData, {
                                                            headers: {
                                                                'Content-Type': 'multipart/form-data',
                                                            },
                                                        })
                                                        .then((response) => {
                                                            setProducts(products.map(p => p.id === editingProductDetails.id ? response.data : p));
                                                            setEditProductNameDetails('');
                                                            setEditProductPriceDetails('');
                                                            setEditProductCategoryDetails('');
                                                            setEditProductDescriptionDetails('');
                                                            setEditProductImageDetails(null);
                                                            setEditImagePreviewDetails(null);
                                                            setEditSizeOptionsDetails([]);
                                                            setEditPortionOptionsDetails([]);
                                                            setEditCustomSizeOptionsDetails([]);
                                                            setEditOptionTypeSelectedDetails(null);
                                                            setEditAddonsDetails([]);
                                                            setEditingProductDetails(null);
                                                            setShowEditProductDetails(false);
                                                        })
                                                        .catch((error) => {
                                                            console.error('Error updating product:', error);
                                                        });
                                                    }
                                                }}
                                                className="flex-1 px-4 py-2.5 bg-[#E05D36] hover:bg-[#C8502D] text-white rounded-lg text-sm font-medium transition"
                                            >
                                                Update Product
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            </motion.div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}
