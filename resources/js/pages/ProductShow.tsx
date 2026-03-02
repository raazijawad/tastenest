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
        image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop",
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
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop",
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
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=2000&auto=format&fit=crop",
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
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=2000&auto=format&fit=crop",
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
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=2000&auto=format&fit=crop",
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
        image: "https://images.unsplash.com/photo-1612874742237-6526221fcf16?q=80&w=2000&auto=format&fit=crop",
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
        image: "https://images.unsplash.com/photo-1645112917141-540bc8acbbec?q=80&w=2000&auto=format&fit=crop",
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
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
    };

    return (
        <Layout>
            <Head title={`${dish.title} - TasteNest`}>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
            </Head>
            <div className="relative min-h-screen w-full bg-[#111315] text-white font-sans overflow-hidden selection:bg-[#E05D36]/30">

                {/* Background Elements */}
                <div className="absolute inset-0 z-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#E05D36] rounded-full blur-[150px] opacity-[0.05] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#E05D36] rounded-full blur-[120px] opacity-[0.03] pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-24">

                    <Link href="/menu" className="group inline-flex items-center gap-3 text-xs tracking-[0.2em] font-semibold uppercase text-gray-400 hover:text-white transition-colors mb-12">
                        <span className="w-8 h-[1px] bg-gray-600 group-hover:bg-[#E05D36] transition-colors" />
                        Back to Menu
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Image Section */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                            className="relative aspect-square w-full rounded-sm overflow-hidden border border-white/5 shadow-2xl"
                        >
                            <motion.img
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                src={dish.image}
                                alt={dish.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111315]/80 via-transparent to-transparent" />

                            {dish.spicy && (
                                <div className="absolute top-6 right-6 bg-[#E05D36] text-white px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-sm shadow-xl">
                                    🌶️ Spicy
                                </div>
                            )}
                        </motion.div>

                        {/* Details Section */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="show"
                            className="flex flex-col justify-center"
                        >
                            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
                                <span className="text-xs tracking-[0.2em] uppercase text-[#E05D36] font-semibold">{dish.category}</span>
                                <div className="h-[1px] w-12 bg-white/20" />
                            </motion.div>

                            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-serif leading-none tracking-tight mb-6 mt-0">
                                {dish.title}
                            </motion.h1>

                            <motion.div variants={fadeInUp} className="flex items-baseline gap-4 mb-8">
                                <span className="text-3xl lg:text-4xl font-sans font-semibold text-white">{dish.price}</span>
                                <span className="text-lg text-gray-500 line-through">{dish.oldPrice}</span>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light border-l border-[#E05D36] pl-6 py-2">
                                    {dish.description}
                                </p>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-8 mb-12 py-8 border-y border-white/5">
                                <div>
                                    <h4 className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-2">Preparation Time</h4>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[#E05D36]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <p className="text-xl font-serif text-white">{dish.time}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-2">Serves</h4>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[#E05D36]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        <p className="text-xl font-serif text-white">{dish.serves}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                                <button className="group relative bg-[#E05D36] text-white px-10 py-5 text-xs tracking-[0.2em] font-semibold uppercase overflow-hidden flex-1 text-center">
                                    <span className="relative z-10">Add to Order</span>
                                    <div className="absolute inset-0 bg-[#C8502D] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                                </button>
                                <button className="group relative border border-white/20 bg-transparent text-white px-10 py-5 text-xs tracking-[0.2em] font-semibold uppercase hover:border-white transition-colors flex-1 text-center">
                                    Customize
                                </button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="relative z-10 border-t border-white/5 bg-[#111315] py-12 px-6 mt-10"
                >
                    <div className="max-w-7xl mx-auto flex flex-col items-center">
                        <div className="mb-6 mb-6">
                            <h2 className="font-serif text-xl tracking-widest text-[#E05D36]">TASTENEST</h2>
                        </div>
                        <p className="text-gray-500 text-sm">
                            © 2024 TasteNest. Engineering Flavor, One Bite at a Time.
                        </p>
                    </div>
                </motion.footer>
            </div>
        </Layout>
    );
}
