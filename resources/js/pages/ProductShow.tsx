import { Head, Link } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import React, { useMemo } from 'react';
import Layout from '@/Components/Layout';

const dishes = [
    {
        id: 1,
        title: "Classic Burger",
        name: "Classic Burger",
        category: "Burgers",
        price: "$18.00",
        oldPrice: "$22.00",
        time: "12 mins",
        serves: "1-2",
        description: "Dry-aged beef blend, house brioche, signature sauce, aged cheddar",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",
        spicy: false
    },
    {
        id: 2,
        title: "Cheese Burger",
        name: "Cheese Burger",
        category: "Burgers",
        price: "$17.50",
        oldPrice: "$20.50",
        time: "10 mins",
        serves: "1-2",
        description: "Melted cheddar, crispy lettuce, tomato, caramelized onions, house sauce",
        image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1000&auto=format&fit=crop",
        spicy: false
    },
    {
        id: 3,
        title: "Crispy Burger",
        name: "Crispy Burger",
        category: "Burgers",
        price: "$19.50",
        oldPrice: "$24.50",
        time: "14 mins",
        serves: "1-2",
        description: "Double fried patty, jalapeños, pepper jack, crispy onion strings",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop",
        spicy: true
    },
    {
        id: 4,
        title: "Truffle Luxe Burger",
        name: "Truffle Luxe Burger",
        category: "Burgers",
        price: "$24.00",
        oldPrice: "$32.00",
        time: "15 mins",
        serves: "2",
        description: "Black truffle aioli, wagyu beef, foie gras, aged gruyère, microgreens",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1000&auto=format&fit=crop",
        spicy: false
    },
    {
        id: 5,
        title: "Chicken Pasta",
        name: "Chicken Pasta",
        category: "Pasta",
        price: "$16.00",
        oldPrice: "$19.00",
        time: "18 mins",
        serves: "1-2",
        description: "Grilled chicken breast, linguine, garlic butter, parmesan crisps",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1000&auto=format&fit=crop",
        spicy: false
    },
    {
        id: 6,
        title: "Beef Pasta",
        name: "Beef Pasta",
        category: "Pasta",
        price: "$18.50",
        oldPrice: "$22.50",
        time: "20 mins",
        serves: "2",
        description: "Argentinian beef ragù, pappardelle, truffle oil, aged parmesan",
        image: "https://images.unsplash.com/photo-1603071051911-33f1b1b7a5d6?q=80&w=1000&auto=format&fit=crop",
        spicy: false
    },
    {
        id: 7,
        title: "Spicy Arrabbiata",
        name: "Spicy Arrabbiata",
        category: "Pasta",
        price: "$14.00",
        oldPrice: "$17.00",
        time: "16 mins",
        serves: "1-2",
        description: "Chili flakes, guanciale, tomatoes, pecorino romano, fresh pasta",
        image: "https://images.unsplash.com/photo-1612874742237-6526221fcf16?q=80&w=1000&auto=format&fit=crop",
        spicy: true
    },
    {
        id: 8,
        title: "Creamy Alfredo",
        name: "Creamy Alfredo",
        category: "Pasta",
        price: "$15.00",
        oldPrice: "$18.50",
        time: "17 mins",
        serves: "1-2",
        description: "Fettuccine, aged gruyère, butter, white wine, cracked black pepper",
        image: "https://images.unsplash.com/photo-1645112917141-540bc8acbbec?q=80&w=1000&auto=format&fit=crop",
        spicy: false
    },
    {
        id: 9,
        title: "Crispy Fries",
        name: "Crispy Fries",
        category: "Sides",
        price: "$6.00",
        oldPrice: "$8.00",
        time: "8 mins",
        serves: "2-3",
        description: "Hand-cut, double-fried, truffle salt & house sauce",
        image: "https://images.unsplash.com/photo-1585238341710-57acf2997b67?q=80&w=1000&auto=format&fit=crop",
        spicy: false
    },
    {
        id: 10,
        title: "Charred Jalapeño Poppers",
        name: "Charred Jalapeño Poppers",
        category: "Sides",
        price: "$8.00",
        oldPrice: "$10.50",
        time: "10 mins",
        serves: "2-3",
        description: "Cream cheese stuffed, crispy panko, cooling ranch dip",
        image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b5?q=80&w=1000&auto=format&fit=crop",
        spicy: true
    },
    {
        id: 11,
        title: "Classic Milkshake",
        name: "Classic Milkshake",
        category: "Beverages",
        price: "$5.50",
        oldPrice: "$7.00",
        time: "5 mins",
        serves: "1",
        description: "Vanilla, Chocolate, Strawberry - 16oz premium shake",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1000&auto=format&fit=crop",
        spicy: false
    }
];

interface Props {
    id: string;
}

export default function ProductShow({ id }: Props) {
    const dish = useMemo(() => dishes.find(d => d.id.toString() === id.toString()), [id]);

    if (!dish) {
        return (
            <Layout>
                <div className="min-h-screen bg-[#111315] text-white flex items-center justify-center flex-col">
                    <h1 className="text-4xl font-serif text-[#E05D36] mb-4">Dish Not Found</h1>
                    <Link href="/menu" className="text-xs tracking-[0.2em] uppercase hover:text-[#E05D36] transition-colors">Return to Menu</Link>
                </div>
            </Layout>
        );
    }

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
    };

    return (
        <Layout>
            <Head title={`${dish.title} - TasteNest`} />

            <div className="relative min-h-screen w-full bg-[#111315] text-white overflow-hidden">

                <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-12">

                    <Link href="/menu" className="group inline-flex items-center gap-3 text-xs tracking-[0.2em] font-semibold uppercase text-gray-400 hover:text-white mt-12 mb-8">
                        <span className="w-8 h-[1px] bg-gray-600 group-hover:bg-[#E05D36]" />
                        Back to Menu
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-add  items-center">

                        {/* IMAGE */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-square w-full lg:w-[75%]  mx-auto rounded-sm overflow-hidden border border-white/5 shadow-2xl"
                        >
                            <motion.img
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                src={dish.image}
                                alt={dish.name}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* RIGHT SIDE — SHRUNK */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="show"
                            className="flex flex-col justify-center lg:max-w-[70%] xl:max-w-[60%]"
                        >
                            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-4">
                                <span className="text-xs tracking-[0.2em] uppercase text-[#E05D36] font-semibold">{dish.category}</span>
                                <div className="h-[1px] w-10 bg-white/20" />
                            </motion.div>

                            <motion.h1 variants={fadeInUp} className="text-4xl lg:text-5xl font-serif leading-none tracking-tight mb-4">
                                {dish.title}
                            </motion.h1>

                            <motion.div variants={fadeInUp} className="flex items-baseline gap-3 mb-6">
                                <span className="text-2xl lg:text-3xl font-semibold text-white">{dish.price}</span>
                                <span className="text-base text-gray-500 line-through">{dish.oldPrice}</span>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-8 border-l border-[#E05D36] pl-6 py-2">
                                    {dish.description}
                                </p>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-6 mb-10 py-2 border-y border-white/5">
                                <div>
                                    <h4 className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-2">Preparation Time</h4>
                                    <p className="text-lg lg:text-xl font-serif">{dish.time}</p>
                                </div>

                                <div>
                                    <h4 className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-2">Serves</h4>
                                    <p className="text-lg lg:text-xl font-serif">{dish.serves}</p>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-[#E05D36] text-white px-8 py-2 text-xs tracking-[0.2em] font-semibold uppercase flex-1">
                                    Add to Order
                                </button>

                                <button className="border border-white/20 text-white px-8 py-4 text-xs tracking-[0.2em] font-semibold uppercase flex-1 hover:border-white">
                                    Customize
                                </button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Footer Section - Minimal & Structural */}
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
                                    Lorem ipsum dolor sit amet consectetur. Tristique cursus morbi nibh nec et vulputate. Turpis tortor nisi imperdiet quis accumsan. Ligula netus amet leo ultricies. Neque venenatis magnis amet eget sagittis leo enim.
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
