import { FormEvent, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Layout from '@/Components/Layout';

export default function Login() {
    const { data, setData, post, errors, processing } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <Layout>
            <Head title="Login - TasteNest" />

            <div className="relative min-h-screen w-full bg-[#111315] text-white flex items-center justify-center px-4 py-12">
                {/* Background Image with Dark Overlay */}
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
                    className="relative z-10 w-full max-w-md"
                >
                    <div className="bg-gray-900/80 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-gray-800">
                        <h1 className="text-3xl font-bold text-white mb-2 text-center font-serif tracking-wide">
                            Welcome Back
                        </h1>
                        <p className="text-gray-400 text-center mb-8">Sign in to your TasteNest account</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E05D36] transition"
                                    placeholder="you@example.com"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E05D36] transition"
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-2">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 bg-gray-800 border border-gray-700 rounded cursor-pointer"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-400 cursor-pointer">
                                    Remember me
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#E05D36] hover:bg-[#C8502D] text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
                            >
                                {processing ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center">
                            <div className="flex-1 h-px bg-gray-700" />
                            <span className="px-4 text-gray-500 text-sm">or</span>
                            <div className="flex-1 h-px bg-gray-700" />
                        </div>

                        {/* Sign Up Link */}
                        <p className="text-center text-gray-400">
                            Don't have an account?{' '}
                            <Link
                                href="/register"
                                className="text-[#E05D36] hover:text-[#C8502D] font-semibold transition"
                            >
                                Create one
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
}
