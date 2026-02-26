import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Layout from '@/Components/Layout';

export default function Dashboard({ auth }: any) {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'reservations', label: 'Reservations', icon: '📅' },
        { id: 'orders', label: 'Orders', icon: '🍔' },
        { id: 'reviews', label: 'Reviews', icon: '⭐' },
    ];

    return (
        <Layout>
            <Head title="Dashboard - TasteNest" />

            <div className="relative min-h-screen w-full bg-[#111315] text-white pt-32 pb-20 px-4">
                {/* Background */}
                <motion.div
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop')",
                    }}
                />
                <div className="absolute inset-0 z-0 bg-black/70 backdrop-blur-sm" />

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 max-w-7xl mx-auto"
                >
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-white font-serif mb-2">Dashboard</h1>
                        <p className="text-gray-400">Welcome back, <span className="text-[#E05D36]">{auth.user.name}</span></p>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
                        {/* User Info Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-1 bg-gray-900/80 backdrop-blur-md rounded-lg p-6 border border-gray-800"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E05D36] to-[#C8502D] flex items-center justify-center text-white text-5xl font-bold mb-4">
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-1">{auth.user.name}</h3>
                                <p className="text-sm text-gray-400 mb-4">{auth.user.email}</p>
                                <div className="w-full pt-4 border-t border-gray-700">
                                    <p className="text-xs text-gray-500">Member Since</p>
                                    <p className="text-sm text-white font-medium">
                                        {new Date(auth.user.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Stats Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-gray-900/80 backdrop-blur-md rounded-lg p-6 border border-gray-800"
                        >
                            <div className="text-4xl mb-2">📅</div>
                            <div className="text-3xl font-bold text-[#E05D36] mb-1">12</div>
                            <p className="text-gray-400 text-sm">Total Reservations</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-gray-900/80 backdrop-blur-md rounded-lg p-6 border border-gray-800"
                        >
                            <div className="text-4xl mb-2">🍔</div>
                            <div className="text-3xl font-bold text-[#E05D36] mb-1">28</div>
                            <p className="text-gray-400 text-sm">Total Orders</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-gray-900/80 backdrop-blur-md rounded-lg p-6 border border-gray-800"
                        >
                            <div className="text-4xl mb-2">⭐</div>
                            <div className="text-3xl font-bold text-[#E05D36] mb-1">8</div>
                            <p className="text-gray-400 text-sm">Total Reviews</p>
                        </motion.div>
                    </div>

                    {/* Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-gray-900/80 backdrop-blur-md rounded-lg border border-gray-800 overflow-hidden"
                    >
                        {/* Tab Navigation */}
                        <div className="border-b border-gray-800 overflow-x-auto">
                            <div className="flex">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all whitespace-nowrap ${
                                            activeTab === tab.id
                                                ? 'border-[#E05D36] text-[#E05D36]'
                                                : 'border-transparent text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        <span className="text-lg">{tab.icon}</span>
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="p-8">
                            {activeTab === 'overview' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h3 className="text-xl font-semibold text-white mb-6">Account Overview</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gray-800/50 rounded-lg p-6">
                                            <h4 className="text-lg font-semibold text-white mb-4">Personal Information</h4>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                                    <span className="text-gray-400">Full Name</span>
                                                    <span className="text-white font-medium">{auth.user.name}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                                    <span className="text-gray-400">Email</span>
                                                    <span className="text-white font-medium">{auth.user.email}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2">
                                                    <span className="text-gray-400">Account Status</span>
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                                                        Active
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-800/50 rounded-lg p-6">
                                            <h4 className="text-lg font-semibold text-white mb-4">Quick Actions</h4>
                                            <div className="space-y-3">
                                                <button className="w-full bg-[#E05D36] hover:bg-[#C8502D] text-white font-medium py-2 rounded-lg transition uppercase text-sm tracking-wide">
                                                    Edit Profile
                                                </button>
                                                <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition uppercase text-sm tracking-wide">
                                                    Change Password
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'reservations' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h3 className="text-xl font-semibold text-white mb-6">My Reservations</h3>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="bg-gray-800/50 rounded-lg p-6 flex justify-between items-center hover:bg-gray-800 transition">
                                                <div>
                                                    <h4 className="text-white font-semibold mb-2">Reservation #{i}</h4>
                                                    <p className="text-gray-400 text-sm">Date: March {15 + i}, 2024 at 7:00 PM</p>
                                                    <p className="text-gray-400 text-sm">Party of 4 • Premium Table</p>
                                                </div>
                                                <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-blue-500/20 text-blue-400">
                                                    Confirmed
                                                </span>
                                            </div>
                                        ))}
                                        {[1, 2, 3].length === 0 && (
                                            <p className="text-gray-400 text-center py-8">No reservations yet. Book a table today!</p>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'orders' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h3 className="text-xl font-semibold text-white mb-6">My Orders</h3>
                                    <div className="space-y-4">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="bg-gray-800/50 rounded-lg p-6 flex justify-between items-center hover:bg-gray-800 transition">
                                                <div>
                                                    <h4 className="text-white font-semibold mb-2">Order #{12340 + i}</h4>
                                                    <p className="text-gray-400 text-sm">Artisan Burger × 2, Fries × 2, Milkshake × 1</p>
                                                    <p className="text-gray-400 text-sm">Total: ${23.50 + i * 2}</p>
                                                </div>
                                                <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-green-500/20 text-green-400">
                                                    Delivered
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'reviews' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h3 className="text-xl font-semibold text-white mb-6">My Reviews</h3>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800 transition">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h4 className="text-white font-semibold">Artisan Burger Board</h4>
                                                    <div className="flex gap-1">
                                                        {[...Array(5)].map((_, j) => (
                                                            <span key={j} className={j < (5 - i) ? 'text-yellow-400' : 'text-gray-600'}>
                                                                ★
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-gray-400 text-sm">
                                                    Amazing food quality and presentation. The burger was cooked to perfection and the customer service was outstanding. Would definitely recommend!
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </Layout>
    );
}
