import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';
import React from 'react';

export default function DishMenu() {
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 15
            }
        }
    };

    const staggeredContainer: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    };

    const dishes = [
        {
            id: 1,
            name: "Classic Burger",
            category: "Main",
            price: "$18.00",
            description: "Dry-aged beef blend, house brioche, signature sauce, aged cheddar",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",
            spicy: false
        },
        {
            id: 2,
            name: "Inferno Burger",
            category: "Main",
            price: "$19.50",
            description: "Spicy habanero mayo, crispy bacon, ghost pepper cheddar, jalapeños",
            image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop",
            spicy: true
        },
        {
            id: 3,
            name: "Smoked BBQ Burger",
            category: "Main",
            price: "$20.00",
            description: "Hickory smoke, caramelized onions, crispy bacon, smoked cheddar, house BBQ",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop",
            spicy: false
        },
        {
            id: 4,
            name: "Truffle Luxe Burger",
            category: "Main",
            price: "$24.00",
            description: "Black truffle aioli, wagyu beef, foie gras, aged gruyère, microgreens",
            image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=2000&auto=format&fit=crop",
            spicy: false
        },
        {
            id: 5,
            name: "Crispy Fries",
            category: "Sides",
            price: "$6.00",
            description: "Hand-cut, double-fried, truffle salt & house sauce",
            image: "https://images.unsplash.com/photo-1585238341710-57acf2997b67?q=80&w=1000&auto=format&fit=crop",
            spicy: false
        },
        {
            id: 6,
            name: "Charred Jalapeño Poppers",
            category: "Sides",
            price: "$8.00",
            description: "Cream cheese stuffed, crispy panko, cooling ranch dip",
            image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b5?q=80&w=1000&auto=format&fit=crop",
            spicy: true
        },
        {
            id: 7,
            name: "Classic Milkshake",
            category: "Beverages",
            price: "$5.50",
            description: "Vanilla, Chocolate, Strawberry - 16oz premium shake",
            image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1000&auto=format&fit=crop",
            spicy: false
        },
        {
            id: 8,
            name: "Fire Wings Challenge",
            category: "Main",
            price: "$16.00",
            description: "Ghost pepper sauce, 12 wings, certified challenge",
            image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1000&auto=format&fit=crop",
            spicy: true
        }
    ];

    const categories = ["All", "Main", "Sides", "Beverages"];
    const [selectedCategory, setSelectedCategory] = React.useState("All");

    const filteredDishes = selectedCategory === "All"
        ? dishes
        : dishes.filter(dish => dish.category === selectedCategory);

    return (
        <>
            <Head title="Menu - TasteNest">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
            </Head>

            <div className="relative min-h-screen w-full bg-[#111315] text-white font-sans overflow-hidden selection:bg-[#E05D36]/30">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />
                <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#E05D36] rounded-full blur-[120px] opacity-[0.03] pointer-events-none translate-x-1/3 -translate-y-1/3" />

                {/* Navbar */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-40 px-6 py-6 lg:px-12 lg:py-8 flex justify-between items-center border-b border-white/5"
                >
                    <Link href="/" className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
                        <span className="font-serif text-2xl tracking-[0.15em] font-bold text-white uppercase">
                            TasteNest
                        </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <nav className="hidden md:flex items-center space-x-8">
                            {['Home', 'Menu', 'Order', 'Contact'].map((link) => (
                                <a
                                    key={link}
                                    href={link === 'Home' ? '/' : '#'}
                                    className={`text-sm tracking-widest font-medium uppercase transition-colors ${link === 'Menu' ? 'text-[#E05D36]' : 'text-gray-400 hover:text-white'}`}
                                >
                                    {link}
                                </a>
                            ))}
                        </nav>

                        <Link href="/" className="md:hidden">
                            <button className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </motion.header>

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 py-20">
                    {/* Header */}
                    <motion.div
                        variants={staggeredContainer}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col items-center text-center mb-16"
                    >
                        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-3 mb-6">
                            <span className="w-10 h-px bg-[#E05D36]" />
                            <span className="font-sans text-[#E05D36] text-sm tracking-[0.35em] uppercase font-bold">
                                Explore
                            </span>
                            <span className="w-10 h-px bg-[#E05D36]" />
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="font-serif text-5xl lg:text-6xl leading-tight text-white uppercase mb-4 tracking-tight"
                        >
                            Our Culinary Craft
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="font-sans text-gray-400 text-lg max-w-2xl leading-relaxed"
                        >
                            Each dish is meticulously engineered for maximum flavor impact. From prime sourcing to fire-cooked perfection, discover why TasteNest is obsession.
                        </motion.p>
                    </motion.div>

                    {/* Category Filter */}
                    <motion.div
                        variants={staggeredContainer}
                        initial="hidden"
                        animate="show"
                        className="flex flex-wrap justify-center gap-4 mb-16"
                    >
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                variants={fadeInUp}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 text-xs tracking-[0.2em] font-semibold uppercase transition-all duration-300 ${
                                    selectedCategory === category
                                        ? 'bg-[#E05D36] text-white'
                                        : 'border border-white/20 text-white hover:border-white/40'
                                }`}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Menu Grid */}
                    <motion.div
                        variants={staggeredContainer}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                    >
                        {filteredDishes.map((dish, idx) => (
                            <motion.div
                                key={dish.id}
                                variants={fadeInUp}
                                className="group relative overflow-hidden bg-[#1a1a1a] border border-white/5 hover:border-[#E05D36]/50 transition-all duration-500"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={dish.image}
                                        alt={dish.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

                                    {dish.spicy && (
                                        <div className="absolute top-3 right-3 bg-[#E05D36] text-white px-2 py-1 text-xs font-bold tracking-widest">
                                            SPICY
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="font-serif text-lg text-white mb-2 uppercase tracking-tight">
                                        {dish.name}
                                    </h3>

                                    <p className="font-sans text-xs text-gray-400 mb-3 leading-relaxed">
                                        {dish.description}
                                    </p>

                                    <div className="flex justify-between items-center">
                                        <span className="font-sans text-[#E05D36] font-bold text-sm tracking-wide">
                                            {dish.price}
                                        </span>

                                        <button className="text-gray-400 hover:text-[#E05D36] transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        variants={staggeredContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="text-center py-16 border-t border-white/5"
                    >
                        <motion.div variants={fadeInUp} className="mb-6">
                            <h2 className="font-serif text-3xl text-white uppercase mb-4">
                                Ready to Experience?
                            </h2>

                            <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8">
                                Reserve your table now and let us craft an unforgettable dining experience.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="group relative border border-[#E05D36] bg-[#E05D36] px-10 py-4 text-xs tracking-[0.2em] font-semibold uppercase text-white transition-all duration-300 hover:bg-transparent overflow-hidden rounded-sm">
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#E05D36]">Make Reservation</span>
                            </button>

                            <Link href="/" className="group relative border border-white bg-transparent px-10 py-4 text-xs tracking-[0.2em] font-semibold uppercase text-white transition-all duration-300 hover:text-black overflow-hidden rounded-sm">
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Back Home</span>
                                <div className="absolute inset-0 bg-white transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="relative z-10 border-t border-white/5 bg-black/20 backdrop-blur-sm py-12 px-6 mt-16"
                >
                    <div className="max-w-6xl mx-auto text-center">
                        <p className="text-gray-500 text-sm">
                            © 2024 TasteNest. Engineering Flavor, One Bite at a Time.
                        </p>
                    </div>
                </motion.footer>
            </div>
        </>
    );
}
