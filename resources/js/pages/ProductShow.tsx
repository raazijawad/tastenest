import { Head, Link } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Layout from '@/Components/Layout';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    category: string;
    price: string;
    description: string;
    image: string | null;
    status: string;
    size_options?: string | any[];
    addons?: string | any[];
}

interface SizeOption {
    size: string;
    price: string;
}

interface Addon {
    name: string;
    price: string;
}

interface Props {
    id: string;
}

export default function ProductShow({ id }: Props) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const [calculatedPrice, setCalculatedPrice] = useState<number>(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Parse size_options and addons from JSON string if needed
    const sizeOptions: SizeOption[] = Array.isArray(product?.size_options) 
        ? product.size_options 
        : product?.size_options ? JSON.parse(product.size_options) : [];
    
    const addons: Addon[] = Array.isArray(product?.addons) 
        ? product.addons 
        : product?.addons ? JSON.parse(product.addons) : [];

    // Calculate total price
    useEffect(() => {
        if (!product) return;

        let total = parseFloat(product.price);

        // Add size option price difference
        if (selectedSize) {
            const sizeOption = sizeOptions.find(opt => opt.size === selectedSize);
            if (sizeOption) {
                total = parseFloat(sizeOption.price);
            }
        }

        // Add selected addons prices
        selectedAddons.forEach(addonName => {
            const addon = addons.find(a => a.name === addonName);
            if (addon) {
                total += parseFloat(addon.price);
            }
        });

        setCalculatedPrice(total);
    }, [product, selectedSize, selectedAddons, sizeOptions, addons]);

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
    };

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen bg-[#111315] text-white flex items-center justify-center flex-col">
                    <div className="text-gray-400 text-sm">Loading...</div>
                </div>
            </Layout>
        );
    }

    if (!product || product.status !== 'Available') {
        return (
            <Layout>
                <div className="min-h-screen bg-[#111315] text-white flex items-center justify-center flex-col">
                    <h1 className="text-4xl font-serif text-[#E05D36] mb-4">Product Not Found</h1>
                    <Link href="/menu" className="text-xs tracking-[0.2em] uppercase hover:text-[#E05D36] transition-colors">Return to Menu</Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Head title={`${product.name} - TasteNest`} />

            <div className="relative min-h-screen w-full bg-[#111315] text-white overflow-hidden">
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-24">
                    <Link href="/menu" className="group inline-flex items-center gap-3 text-xs tracking-[0.2em] font-semibold uppercase text-gray-400 hover:text-white mb-12">
                        <span className="w-8 h-[1px] bg-gray-600 group-hover:bg-[#E05D36]" />
                        Back to Menu
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* IMAGE */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-square w-full lg:w-[75%] mx-auto rounded-sm overflow-hidden border border-white/5 shadow-2xl"
                        >
                            <motion.img
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                src={product.image ? `/storage/${product.image}` : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop'}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* RIGHT SIDE */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="show"
                            className="flex flex-col justify-center lg:max-w-[70%] xl:max-w-[60%]"
                        >
                            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-4">
                                <span className="text-xs tracking-[0.2em] uppercase text-[#E05D36] font-semibold">{product.category}</span>
                                <div className="h-[1px] w-10 bg-white/20" />
                            </motion.div>

                            <motion.h1 variants={fadeInUp} className="text-4xl lg:text-5xl font-serif leading-none tracking-tight mb-4">
                                {product.name}
                            </motion.h1>

                            <motion.div variants={fadeInUp} className="flex items-baseline gap-3 mb-6">
                                <span className="text-2xl lg:text-3xl font-semibold text-white">${calculatedPrice.toFixed(2)}</span>
                                {(selectedSize || selectedAddons.length > 0) && (
                                    <span className="text-sm text-gray-500 line-through">${parseFloat(product.price).toFixed(2)}</span>
                                )}
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-8 border-l border-[#E05D36] pl-6 py-2">
                                    {product.description || 'No description available'}
                                </p>
                            </motion.div>

                            {/* Size Options */}
                            {sizeOptions.length > 0 && (
                                <motion.div variants={fadeInUp} className="mb-6">
                                    <label className="text-xs tracking-[0.2em] uppercase text-[#E05D36] font-semibold mb-3 block">
                                        Size Options
                                    </label>
                                    <select
                                        value={selectedSize}
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#E05D36] transition-colors cursor-pointer appearance-none"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23E05D36'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
                                    >
                                        <option value="">Select a size</option>
                                        {sizeOptions.map((option, index) => (
                                            <option key={index} value={option.size}>
                                                {option.size} - ${parseFloat(option.price).toFixed(2)}
                                            </option>
                                        ))}
                                    </select>
                                </motion.div>
                            )}

                            {/* Add-ons / Extras */}
                            {addons.length > 0 && (
                                <motion.div variants={fadeInUp} className="mb-8">
                                    <label className="text-xs tracking-[0.2em] uppercase text-[#E05D36] font-semibold mb-3 block">
                                        Add-ons / Extras
                                    </label>
                                    <div className="space-y-2">
                                        {addons.map((addon, index) => (
                                            <label
                                                key={index}
                                                className="flex items-center justify-between p-3 border border-white/10 rounded-sm cursor-pointer hover:border-[#E05D36]/50 hover:bg-white/5 transition-all group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedAddons.includes(addon.name)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedAddons([...selectedAddons, addon.name]);
                                                            } else {
                                                                setSelectedAddons(selectedAddons.filter(name => name !== addon.name));
                                                            }
                                                        }}
                                                        className="w-4 h-4 accent-[#E05D36] cursor-pointer"
                                                    />
                                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                                        {addon.name}
                                                    </span>
                                                </div>
                                                <span className="text-sm text-[#E05D36] font-semibold">
                                                    +${parseFloat(addon.price).toFixed(2)}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Calculated Total Price */}
                            <motion.div variants={fadeInUp} className="mb-8 pb-8 border-b border-white/10">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs tracking-[0.2em] uppercase text-gray-400">Total Price</span>
                                    <span className="text-3xl font-semibold text-[#E05D36]">${calculatedPrice.toFixed(2)}</span>
                                </div>
                                {(selectedSize || selectedAddons.length > 0) && (
                                    <div className="mt-3 space-y-1 text-xs text-gray-500">
                                        <div className="flex justify-between">
                                            <span>Base Price</span>
                                            <span>${parseFloat(product.price).toFixed(2)}</span>
                                        </div>
                                        {selectedSize && (() => {
                                            const sizeOption = sizeOptions.find(opt => opt.size === selectedSize);
                                            return sizeOption ? (
                                                <div className="flex justify-between text-[#E05D36]">
                                                    <span>Size: {selectedSize}</span>
                                                    <span>${parseFloat(sizeOption.price).toFixed(2)}</span>
                                                </div>
                                            ) : null;
                                        })()}
                                        {selectedAddons.map(addonName => {
                                            const addon = addons.find(a => a.name === addonName);
                                            return addon ? (
                                                <div key={addonName} className="flex justify-between text-[#E05D36]">
                                                    <span>+ {addonName}</span>
                                                    <span>+${parseFloat(addon.price).toFixed(2)}</span>
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                )}
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-[#E05D36] text-white px-8 py-2 text-xs tracking-[0.2em] font-semibold uppercase flex-1 hover:bg-[#C8502D] transition-colors">
                                    Add to Order
                                </button>

                                <button className="border border-white/20 text-white px-8 py-4 text-xs tracking-[0.2em] font-semibold uppercase flex-1 hover:border-white transition-colors">
                                    Customize
                                </button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Footer Section */}
                <footer className="relative w-full bg-[#111315] pt-20 pb-10 px-6 lg:px-12 border-t border-white/5 font-sans selection:bg-[#E05D36]/30">
                    <div className="absolute inset-0 z-0 bg-noise opacity-20 mix-blend-overlay pointer-events-none" />

                    <div className="relative z-10 max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-16">
                            {/* Brand Column */}
                            <div className="col-span-1 md:col-span-1 flex flex-col">
                                <div className="font-serif text-xl tracking-[0.15em] font-bold text-white uppercase mb-6 flex items-center gap-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.43 4 16.05 4 12C4 7.95 7.05 4.57 11 4.07V19.93ZM13 4.07C16.95 4.57 20 7.95 20 12C20 16.05 16.95 19.43 13 19.93V4.07Z" fill="currentColor" />
                                    </svg>
                                    TasteNest
                                </div>
                                <p className="text-gray-400 text-xs leading-loose font-light max-w-[250px] text-justify">
                                    Lorem ipsum dolor sit amet consectetur. Tristique cursus morbi nibh nec et vulputate. Turpis tortor nisi imperdiet quis accumsan.
                                </p>
                                <div className="flex gap-4 mt-8">
                                    {[
                                        { name: "Fb", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" /></svg>, link: "#" },
                                        { name: "Tw", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>, link: "#" },
                                        { name: "Ig", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>, link: "#" },
                                        { name: "In", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>, link: "#" }
                                    ].map((social, i) => (
                                        <a key={i} href={social.link} aria-label={social.name} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#E05D36] hover:bg-[#E05D36] hover:text-white transition-colors duration-300">
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Opening Hours */}
                            <div className="col-span-1 md:col-span-1 flex flex-col">
                                <h4 className="text-white text-[13px] tracking-wider font-bold mb-6">Opening Restaurant</h4>
                                <div className="flex flex-col gap-4 text-xs text-gray-400 font-light">
                                    <p>Sa - We: 09:00am - 10:00pm</p>
                                    <p>Thu - We: 09:00am - 10:00pm</p>
                                    <p>Friday Closed</p>
                                </div>
                            </div>

                            {/* User Link */}
                            <div className="col-span-1 md:col-span-1 flex flex-col">
                                <h4 className="text-white text-[13px] tracking-wider font-bold mb-6">User Link</h4>
                                <ul className="flex flex-col gap-3 text-xs text-gray-400 font-light">
                                    {['About Us', 'Contact Us', 'Order Delivery', 'Payment & Tax', 'Terms of Services'].map((link, i) => (
                                        <li key={i}>
                                            <a href="#" className="hover:text-white transition-colors duration-300">{link}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact Us */}
                            <div className="col-span-1 md:col-span-1 flex flex-col">
                                <h4 className="text-white text-[13px] tracking-wider font-bold mb-6">Contact Us</h4>
                                <div className="flex flex-col gap-4 text-xs text-gray-400 font-light mb-6">
                                    <p>1243 Country Club Ave,<br />NC 27587, London, UK</p>
                                    <p>+1 257-854-1123</p>
                                </div>

                                {/* Small Subscribe Form in Footer */}
                                <form className="flex w-full mt-4" onSubmit={(e) => e.preventDefault()}>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full max-w-[150px] bg-white text-black px-4 py-3 text-xs outline-none placeholder:text-gray-500 rounded-l-sm"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="bg-[#E05D36] hover:bg-[#C8502D] text-white px-4 py-3 text-[10px] tracking-wider font-bold transition-colors rounded-r-sm whitespace-nowrap"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-gray-500 text-xs">© 2024 TasteNest. All rights reserved.</p>
                            <div className="flex gap-6 text-xs text-gray-500">
                                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </Layout>
    );
}
