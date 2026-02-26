import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';

export default function Navbar() {
    const { auth } = usePage().props as any;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const staggeredContainer: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.4,
            }
        }
    };

    const navItemVariants: Variants = {
        hidden: { opacity: 0, y: -20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
    };

    const navLinks = ['Home', 'Menu', 'About', 'Contact'];

    return (
        <motion.header
            variants={staggeredContainer}
            initial="hidden"
            animate="show"
            className="absolute top-0 inset-x-0 z-40 px-6 py-6 lg:px-12 lg:py-8 flex justify-between items-center"
        >
            {/* Logo */}
            <motion.div variants={navItemVariants} className="flex items-center space-x-2 cursor-pointer">
                <Link href="/" className="font-serif text-2xl tracking-[0.15em] font-bold text-white uppercase hover:text-gray-300 transition">
                    TasteNest
                </Link>
            </motion.div>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center space-x-10">
                {navLinks.map((link) => (
                    <motion.div key={link} variants={navItemVariants} className="relative group">
                        <a
                            href="#"
                            className="text-sm tracking-widest font-medium uppercase text-gray-400 hover:text-white transition-colors"
                        >
                            {link}
                        </a>
                    </motion.div>
                ))}
            </nav>

            {/* Auth Section */}
            <motion.div variants={navItemVariants} className="flex items-center space-x-4">
                {auth.user ? (
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-300">
                            Hello, <span className="font-semibold text-white">{auth.user.name}</span>
                        </span>
                        <div className="relative group">
                            <button className="w-10 h-10 rounded-full bg-[#E05D36] flex items-center justify-center text-white font-semibold hover:bg-[#C8502D] transition">
                                {auth.user.name.charAt(0).toUpperCase()}
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <Link
                                    href={auth.user.role === 'admin' ? '/admin-dashboard' : '/dashboard'}
                                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-t-lg transition"
                                >
                                    {auth.user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
                                </Link>
                                <Link
                                    href="/profile"
                                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition"
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-b-lg transition"
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/login"
                            className="text-sm tracking-widest font-medium uppercase text-gray-400 hover:text-white transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="bg-[#E05D36] hover:bg-[#C8502D] text-white text-xs tracking-[0.2em] font-medium uppercase px-6 py-2 transition-colors rounded-sm"
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-white text-2xl"
                >
                    ☰
                </button>
            </div>
        </motion.header>
    );
}
