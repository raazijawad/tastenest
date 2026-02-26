import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Layout from '@/Components/Layout';

export default function Profile({ auth }: any) {
    return (
        <Layout>
            <Head title="My Profile - TasteNest" />

            <div className="relative min-h-screen w-full bg-[#111315] text-white py-20 px-4">
                {/* Background Image */}
                <motion.div
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop')",
                    }}
                />

                {/* Dark Overlays */}
                <div className="absolute inset-0 z-0 bg-black/70 backdrop-blur-sm" />

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 w-full max-w-2xl mx-auto pt-20"
                >
                    <div className="bg-gray-900/80 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-gray-800">
                        {/* Profile Header */}
                        <div className="flex items-center space-x-6 mb-8">
                            <div className="w-20 h-20 rounded-full bg-[#E05D36] flex items-center justify-center text-white text-4xl font-bold">
                                {auth.user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white font-serif tracking-wide">
                                    {auth.user.name}
                                </h1>
                                <p className="text-gray-400">{auth.user.email}</p>
                            </div>
                        </div>

                        {/* Profile Information */}
                        <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
                            <h2 className="text-xl font-semibold text-white mb-4">Account Information</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                                    <span className="text-gray-400">Name</span>
                                    <span className="text-white font-medium">{auth.user.name}</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                                    <span className="text-gray-400">Email</span>
                                    <span className="text-white font-medium">{auth.user.email}</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                                    <span className="text-gray-400">Member Since</span>
                                    <span className="text-white font-medium">
                                        {new Date(auth.user.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Status</span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400">
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-[#E05D36]">0</div>
                                <div className="text-sm text-gray-400 mt-1">Reservations</div>
                            </div>
                            <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-[#E05D36]">0</div>
                                <div className="text-sm text-gray-400 mt-1">Orders</div>
                            </div>
                            <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-[#E05D36]">0</div>
                                <div className="text-sm text-gray-400 mt-1">Reviews</div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition uppercase tracking-wider text-sm">
                                Edit Profile
                            </button>
                            <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition uppercase tracking-wider text-sm">
                                Change Password
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
}
