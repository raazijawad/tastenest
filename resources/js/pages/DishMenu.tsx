import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';
import React from 'react';
import Layout from '@/Components/Layout';

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
            category: "Burgers",
            price: "$18.00",
            description: "Dry-aged beef blend, house brioche, signature sauce, aged cheddar",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",
            spicy: false
        },
        {
            id: 2,
            name: "Cheese Burger",
            category: "Burgers",
            price: "$17.50",
            description: "Melted cheddar, crispy lettuce, tomato, caramelized onions, house sauce",
            image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop",
            spicy: false
        },
        {
            id: 3,
            name: "Crispy Burger",
            category: "Burgers",
            price: "$19.50",
            description: "Double fried patty, jalapeños, pepper jack, crispy onion strings",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop",
            spicy: true
        },
        {
            id: 4,
            name: "Truffle Luxe Burger",
            category: "Burgers",
            price: "$24.00",
            description: "Black truffle aioli, wagyu beef, foie gras, aged gruyère, microgreens",
            image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=2000&auto=format&fit=crop",
            spicy: false
        },
        {
            id: 5,
            name: "Chicken Pasta",
            category: "Pasta",
            price: "$16.00",
            description: "Grilled chicken breast, linguine, garlic butter, parmesan crisps",
            image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=2000&auto=format&fit=crop",
            spicy: false
        },
        {
            id: 6,
            name: "Beef Pasta",
            category: "Pasta",
            price: "$18.50",
            description: "Argentinian beef ragù, pappardelle, truffle oil, aged parmesan",
            image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=2000&auto=format&fit=crop",
            spicy: false
        },
        {
            id: 7,
            name: "Spicy Arrabbiata",
            category: "Pasta",
            price: "$14.00",
            description: "Chili flakes, guanciale, tomatoes, pecorino romano, fresh pasta",
            image: "https://images.unsplash.com/photo-1612874742237-6526221fcf16?q=80&w=2000&auto=format&fit=crop",
            spicy: true
        },
        {
            id: 8,
            name: "Creamy Alfredo",
            category: "Pasta",
            price: "$15.00",
            description: "Fettuccine, aged gruyère, butter, white wine, cracked black pepper",
            image: "https://images.unsplash.com/photo-1645112917141-540bc8acbbec?q=80&w=2000&auto=format&fit=crop",
            spicy: false
        },
        {
            id: 9,
            name: "Crispy Fries",
            category: "Sides",
            price: "$6.00",
            description: "Hand-cut, double-fried, truffle salt & house sauce",
            image: "https://images.unsplash.com/photo-1585238341710-57acf2997b67?q=80&w=1000&auto=format&fit=crop",
            spicy: false
        },
        {
            id: 10,
            name: "Charred Jalapeño Poppers",
            category: "Sides",
            price: "$8.00",
            description: "Cream cheese stuffed, crispy panko, cooling ranch dip",
            image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b5?q=80&w=1000&auto=format&fit=crop",
            spicy: true
        },
        {
            id: 11,
            name: "Classic Milkshake",
            category: "Beverages",
            price: "$5.50",
            description: "Vanilla, Chocolate, Strawberry - 16oz premium shake",
            image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1000&auto=format&fit=crop",
            spicy: false
        }
    ];

    // Group dishes by category
    const groupedDishes = dishes.reduce((acc, dish) => {
        if (!acc[dish.category]) {
            acc[dish.category] = [];
        }
        acc[dish.category].push(dish);
        return acc;
    }, {} as Record<string, typeof dishes>);

    const categories = Object.keys(groupedDishes);
    const categoryOrder = ["Burgers", "Pasta", "Sides", "Beverages"];
    const sortedCategories = categoryOrder.filter(cat => categories.includes(cat));

    return (
        <Layout>
            <Head title="Menu - TasteNest">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
            </Head>

            <div className="relative min-h-screen w-full bg-[#111315] text-white font-sans overflow-hidden selection:bg-[#E05D36]/30">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />
                <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#E05D36] rounded-full blur-[120px] opacity-[0.03] pointer-events-none translate-x-1/3 -translate-y-1/3" />

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 py-20">


                    {/* Category Filter */}
                    <motion.div
                        variants={staggeredContainer}
                        initial="hidden"
                        animate="show"
                        className="mb-6 flex justify-center"
                    >
                        <motion.a
                            variants={fadeInUp}
                            href="#menu"
                            className="px-6 py-2 text-xs tracking-[0.2em] font-semibold uppercase bg-[#E05D36] text-white hover:bg-[#C8502D] transition-colors"
                        >
                            Jump to Menu
                        </motion.a>
                    </motion.div>

                    {/* Categorized Menu */}
                    <div id="menu" className="space-y-20">
                        {sortedCategories.map((category, categoryIndex) => (
                            <motion.div
                                key={category}
                                variants={staggeredContainer}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-100px" }}
                                className="scroll-mt-40"
                            >
                                {/* Category Title */}
                                <motion.div
                                    variants={fadeInUp}
                                    className="mb-12 relative"
                                >
                                    <div className="flex items-center gap-4 mb-8">
                                        <h2 className="font-serif text-4xl lg:text-5xl text-white uppercase tracking-tight">
                                            {category}
                                        </h2>
                                        <div className="flex-grow h-px bg-gradient-to-r from-[#E05D36] to-transparent" />
                                    </div>
                                </motion.div>

                                {/* Products Grid for Category */}
                                <motion.div
                                    variants={staggeredContainer}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
                                >
                                    {groupedDishes[category].map((dish) => (
                                        <motion.div
                                            key={dish.id}
                                            variants={fadeInUp}
                                            className="group relative overflow-hidden bg-[#1a1a1a] border border-white/5 hover:border-[#E05D36]/50 transition-all duration-500 h-full"
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
                                            <div className="p-4 flex flex-col h-full">
                                                <h3 className="font-serif text-lg text-white mb-2 uppercase tracking-tight">
                                                    {dish.name}
                                                </h3>

                                                <p className="font-sans text-xs text-gray-400 mb-3 leading-relaxed flex-grow">
                                                    {dish.description}
                                                </p>

                                                <div className="flex justify-between items-center mt-auto pt-3 border-t border-white/5">
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
                            </motion.div>
                        ))}
                    </div>

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
        </Layout>
    );
}
