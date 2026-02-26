import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';
import Layout from '@/Components/Layout';

export default function Home() {
    // Animation variants
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

    const navItemVariants: Variants = {
        hidden: { opacity: 0, y: -20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
    };

    return (
        <Layout>
            <Head title="Reserve Your Table - TasteNest">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
            </Head>

            <div className="relative h-screen min-h-[600px] w-full bg-[#111315] text-white font-sans overflow-hidden selection:bg-[#E05D36]/30 selection:text-white">
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

                {/* Dark Cinematic Overlays */}
                <div className="absolute inset-0 z-0 bg-black/60 backdrop-blur-[2px]" />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#111315] via-transparent to-black/80" />
                <div className="absolute inset-0 z-0 bg-noise opacity-30" />

                {/* Hero Center Content */}
                <main className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center">
                    <motion.div
                        variants={staggeredContainer}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col items-center"
                    >
                        {/* Subheader */}
                        <motion.div variants={fadeInUp} className="flex flex-col items-center mb-6">
                            <span className="w-8 h-[2px] bg-[#E05D36] mb-4" />
                            <span className="text-[#E05D36] text-xs md:text-sm tracking-[0.3em] font-semibold uppercase">
                                Hello, New Friend
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            variants={fadeInUp}
                            className="font-serif text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.05] tracking-tight text-white uppercase mb-12 max-w-5xl [text-shadow:0_0_40px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2)]"
                        >
                            Reserve Your <br className="hidden md:block" /> Table
                        </motion.h1>

                        {/* Action Buttons */}
                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6">
                            <button className="group relative border border-white bg-transparent px-10 py-4 text-xs md:text-sm tracking-[0.2em] font-semibold uppercase text-white transition-all duration-300 hover:text-black overflow-hidden rounded-sm">
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Book a Table</span>
                                <div className="absolute inset-0 bg-white transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out" />
                            </button>

                            <Link href="/menu" className="group relative border border-white bg-transparent px-10 py-4 text-xs md:text-sm tracking-[0.2em] font-semibold uppercase text-white transition-all duration-300 hover:text-black overflow-hidden rounded-sm">
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Open Menu</span>
                                <div className="absolute inset-0 bg-white transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </main>
            </div>

            {/* Cinematic About Section - Smaller Version */}
            <div className="relative w-full bg-[#0a0a0a] overflow-hidden py-20 px-6 lg:px-10 selection:bg-[#E05D36]/30">



                {/* Background Atmosphere */}
                <div className="absolute inset-0 z-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />
                <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#E05D36] rounded-full blur-[120px] opacity-[0.03] pointer-events-none translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-white rounded-full blur-[120px] opacity-[0.02] pointer-events-none -translate-x-1/3 translate-y-1/3" />

                <div className="relative z-10 max-w-5xl mx-auto">

                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 max-w-4xl mx-auto">

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-10 h-[1px] bg-[#E05D36]" />
                                <span className="font-sans text-[#E05D36] text-[9px] tracking-[0.35em] uppercase font-bold">
                                    The Heritage
                                </span>
                            </div>

                            <h2 className="font-serif text-4xl sm:text-6xl lg:text-[5rem] leading-[0.85] text-white uppercase tracking-tighter">
                                Culinary <br />
                                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
                                    Defiance
                                </span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            className="font-sans text-gray-400 text-xs md:text-sm leading-relaxed max-w-xs text-justify mt-10 md:mt-0"
                        >
                            We dissect the anatomy of the perfect burger. TasteNest is an exploration of texture, fire, and uncompromising quality. No shortcuts — only obsession.
                        </motion.p>
                    </div>

                    {/* Spatial Grid */}
                    <div className="relative min-h-[550px] grid grid-cols-1 md:grid-cols-12 gap-4 max-w-4xl mx-auto">

                        {/* Main Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.9 }}
                            className="md:col-span-8 md:row-span-2 relative h-[350px] md:h-[450px] overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-600 z-10 mix-blend-overlay pointer-events-none" />
                            <img
                                src="https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=2000&auto=format&fit=crop"
                                alt="Grill Fire"
                                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-900 ease-out"
                            />

                            {/* Label */}
                            <div className="absolute bottom-4 left-4 z-20">
                                <motion.div
                                    initial={{ y: 15, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4, duration: 0.45 }}
                                    className="bg-black/80 backdrop-blur-md px-4 py-2 border-l-2 border-[#E05D36]"
                                >
                                    <span className="font-sans text-[9px] text-white tracking-[0.2em] uppercase">
                                        Element 01 / Fire
                                    </span>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Secondary Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 70 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="md:col-span-4 md:col-start-9 relative h-[240px] md:h-[300px] overflow-hidden md:mt-16"
                        >
                            <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
                            <img
                                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop"
                                alt="Artisan Burger"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Text Card */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.4 }}
                            className="md:col-span-5 md:col-start-8 relative -mt-10 md:-mt-16 md:-ml-10 bg-[#111] p-6 md:p-8 border border-white/10 z-30"
                        >
                            <h3 className="font-serif text-2xl text-white mb-4 leading-tight">
                                Meticulously Sourced.<br />Savagely Prepared.
                            </h3>

                            <p className="font-sans text-gray-400 text-xs leading-relaxed mb-8">
                                Our ingredients aren’t just selected — they’re curated. From dry-aged brisket blends to house-fermented pickles, every element is engineered for maximum flavor impact.
                            </p>

                            <button className="flex items-center gap-3 group">
                                <span className="w-6 h-[1px] bg-white group-hover:w-10 transition-all duration-300" />
                                <span className="font-sans text-[10px] text-white tracking-[0.2em] uppercase font-semibold group-hover:text-[#E05D36] transition-colors">
                                    Discover Our Suppliers
                                </span>
                            </button>
                        </motion.div>

                    </div>
                </div>
            </div>

            {/* The Craft / Skills Section - Brutalist Luxury & Editorial (SMALLER VERSION) */}
            <div className="relative w-full bg-[#111315] py-20 lg:py-28 px-6 lg:px-10 overflow-hidden selection:bg-[#E05D36]/30 border-t border-white/5">

                <div className="flex flex-col items-center gap-3 mb-30"> <span className="font-sans text-[#E05D36] text-[9px] tracking-[0.35em] uppercase font-bold">About Us</span> <span className="w-10 h-[1px] bg-[#E05D36]" /> </div>

                {/* Background Textures */}
                <div className="absolute inset-0 z-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(224,93,54,0.05)_0%,transparent_60%)] pointer-events-none" />
                <div className="absolute top-1/2 left-0 w-[350px] h-[350px] bg-white rounded-full blur-[150px] opacity-[0.015] pointer-events-none transform -translate-x-1/2" />

                <div className="relative z-10 max-w-5xl mx-auto">

                    {/* Header */}


                    {/* Skills */}
                    <div className="flex flex-col gap-20 lg:gap-28">

                        {/* SKILL TEMPLATE — applied to all 3 */}
                        {[
                            {
                                num: "01",
                                title: "Prime Sourcing",
                                label: "THE SELECTION",
                                img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000&auto=format&fit=crop",
                                reverse: false,
                                desc: "We reject compromise. Every cut is meticulously vetted, dry-aged in-house, sourced from sustainable, generational farms."
                            },
                            {
                                num: "02",
                                title: "Fire & Smoke",
                                label: "THE ELEMENT",
                                img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop",
                                reverse: true,
                                desc: "Electricity is for appliances — we cook over raw fire. White oak and hickory define our primal, controlled flavor."
                            },
                            {
                                num: "03",
                                title: "Flavor Architecture",
                                label: "THE FINISH",
                                img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=2000&auto=format&fit=crop",
                                reverse: false,
                                desc: "Every burger is engineered: structural bun integrity, optimized fat-to-acid ratios, and sauces designed for balance."
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`relative flex flex-col md:flex-row ${item.reverse ? "md:flex-row-reverse" : ""} items-center gap-6 lg:gap-12 group`}
                            >
                                {/* Background Number (smaller) */}
                                <div className={`absolute -top-10 ${item.reverse ? "-right-4" : "-left-4"} text-[6rem] lg:text-[10rem] font-serif leading-none text-white/[0.03] select-none font-bold z-0`}>
                                    {item.num}
                                </div>

                                {/* Image (smaller) */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1 }}
                                    className="w-full md:w-1/2 relative h-[260px] lg:h-[380px] overflow-hidden z-10"
                                >
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                                    />
                                </motion.div>

                                {/* Text Card (smaller) */}
                                <motion.div
                                    initial={{ opacity: 0, x: item.reverse ? -40 : 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className={`w-full md:w-1/2 relative z-20 ${item.reverse ? "md:-mr-14" : "md:-ml-14"}`}
                                >
                                    <div className="bg-[#111]/90 backdrop-blur-md p-6 lg:p-8 border border-white/5 shadow-lg relative">
                                        <div className="text-[#E05D36] font-sans text-[9px] tracking-[0.25em] font-bold mb-3">
                                            {item.num} // {item.label}
                                        </div>

                                        <h3 className="font-serif text-2xl lg:text-4xl text-white mb-4 uppercase tracking-tight">
                                            {item.title}
                                        </h3>

                                        <p className="font-sans text-gray-400 text-xs leading-relaxed mb-6">
                                            {item.desc}
                                        </p>

                                        <button className="text-[9px] tracking-[0.2em] uppercase text-white hover:text-[#E05D36] transition">
                                            Learn More →
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            {/* Features Section - Crafted with Production-Grade Aesthetics */}
            <div className="relative w-full bg-[#111315] py-32 px-6 lg:px-12 overflow-hidden border-t border-white/5">
                {/* Background Textures */}
                <div className="absolute inset-0 z-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E05D36] rounded-full blur-[200px] opacity-[0.02] pointer-events-none" />
                {/* Subtle gradient overlay from About section */}
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0a] to-transparent h-40 opacity-50 pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center text-center mb-12"
                    >
                        <div className="flex flex-col items-center gap-3 mb-4">
                            <span className="font-sans text-[#E05D36] text-[9px] sm:text-xs tracking-[0.35em] uppercase font-bold">
                                Features
                            </span>
                            <span className="w-10 h-[1px] bg-[#E05D36]" />
                        </div>

                        <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4 tracking-tight font-medium">
                            Why people choose us?
                        </h2>

                        <p className="font-sans text-gray-400 text-xs md:text-sm max-w-xl text-center leading-relaxed font-light">
                            Lorem ipsum dolor sit amet consectetur. Dolor elit vitae nunc varius. Facilisis eget cras sit semper sit enim.
                        </p>
                    </motion.div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full mt-6">
                        {[
                            {
                                title: "MENU FOR EVERY TASTE",
                                desc: "Lorem ipsum dolor sit amet consectetur. Fells eget sit scelerisque vestibulum. Urna faucibus amet massa lacus lorem.",
                                icon: (
                                    <svg
                                        className="w-8 h-8 text-white transition-all duration-700 group-hover:text-[#E05D36] group-hover:scale-110"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 16h6M9 12h6" />
                                    </svg>
                                )
                            },
                            {
                                title: "ALWAYS QUALITY BEANS",
                                desc: "Lorem ipsum dolor sit amet consectetur. Fells eget sit scelerisque vestibulum. Urna faucibus amet massa lacus lorem.",
                                icon: (
                                    <svg
                                        className="w-8 h-8 text-white transition-all duration-700 group-hover:text-[#E05D36] group-hover:scale-110"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17C4.5 17 3 13.5 3 13.5s1.5-3.5 6-3.5c4.5 0 6 3.5 6 3.5s-1.5 3.5-6 3.5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 10c0 0 2.5 3.5 0 7" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 14c4.5 0 6-3.5 6-3.5s-1.5-3.5-6-3.5c-4.5 0-6 3.5-6 3.5s1.5 3.5 6 3.5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7c0 0-2.5 3.5 0 7" />
                                    </svg>
                                )
                            },
                            {
                                title: "EXPERIENCED BARISTA",
                                desc: "Lorem ipsum dolor sit amet consectetur. Fells eget sit scelerisque vestibulum. Urna faucibus amet massa lacus lorem.",
                                icon: (
                                    <svg
                                        className="w-8 h-8 text-white transition-all duration-700 group-hover:text-[#E05D36] group-hover:scale-110"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 16l2.5 2.5L12 16" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 16l-2.5 2.5L12 16" />
                                    </svg>
                                )
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="group flex flex-col items-center text-center px-3"
                            >
                                <div className="mb-6 relative flex justify-center text-center">
                                    {feature.icon}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-50 group-hover:scale-100" />
                                </div>

                                <h3 className="font-sans text-[11px] tracking-[0.15em] uppercase text-white font-bold mb-3">
                                    {feature.title}
                                </h3>

                                <p className="font-sans text-gray-400 text-[12px] leading-relaxed max-w-xs transition-colors duration-500 group-hover:text-gray-300 font-light">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Explore Foods Section - Meticulous & Brutalist */}
            <div className="relative w-full bg-[#0a0a0a] py-32 px-6 lg:px-12 overflow-hidden border-t border-white/5 selection:bg-[#E05D36]/30">
                <div className="absolute inset-0 z-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center text-center mb-12"
                    >
                        <div className="flex flex-col items-center gap-3 mb-4">
                            <span className="font-sans text-[#E05D36] text-[9px] tracking-[0.35em] uppercase font-bold">Menu</span>
                            <span className="w-10 h-[1px] bg-[#E05D36]" />
                        </div>

                        <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4 tracking-tight font-medium">
                            Explore Our Foods
                        </h2>

                        <p className="font-sans text-gray-400 text-xs md:text-sm max-w-xl text-center leading-relaxed font-light">
                            Lorem ipsum dolor sit amet consectetur. Dolor elit vitae nunc varius. Facilisis eget cras sit semper sit enim.
                        </p>
                    </motion.div>

                    {/* Food Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full cursor-crosshair">
                        {[
                            {
                                img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=800&auto=format&fit=crop",
                                title: "Raspberry French Toast",
                                time: "10 - 15 Minutes",
                                serves: "1",
                                price: "$12.50",
                                oldPrice: "$13.20"
                            },
                            {
                                img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
                                title: "Artisan Burger Board",
                                time: "10 - 15 Minutes",
                                serves: "1",
                                price: "$12.50",
                                oldPrice: "$13.20"
                            },
                            {
                                img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
                                title: "Roasted Beet Salad",
                                time: "10 - 15 Minutes",
                                serves: "1",
                                price: "$12.50",
                                oldPrice: "$13.20"
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative flex flex-col bg-[#111315] border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/20"
                            >
                                {/* Image */}
                                <div className="w-full h-[220px] overflow-hidden relative">
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover transform scale-105 group-hover:scale-100 grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000 ease-out"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#111315] to-transparent z-20" />
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow relative z-30 -mt-4">
                                    <h3 className="font-serif text-lg text-[#E05D36] mb-1 font-semibold tracking-wide group-hover:text-white transition-colors duration-500">
                                        {item.title}
                                    </h3>

                                    <div className="font-sans text-[10px] text-gray-500 tracking-wider mb-4 uppercase">
                                        Time: {item.time} | Serves: {item.serves}
                                    </div>

                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="font-sans text-lg text-white font-semibold">{item.price}</span>
                                        <span className="font-sans text-xs text-gray-500 line-through">{item.oldPrice}</span>
                                    </div>

                                    <button className="relative overflow-hidden group/btn bg-[#E05D36] text-white px-6 py-2 w-fit text-[10px] tracking-[0.2em] font-semibold uppercase transition-colors">
                                        <span className="relative z-10">Order Now</span>
                                        <div className="absolute inset-0 bg-[#C8502D] scale-x-0 origin-left group-hover/btn:scale-x-100 transition-transform duration-300" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Newsletter Section - Cinematic & Immersive */}
            <div className="relative w-full py-28 px-6 lg:px-40 overflow-hidden bg-[#111315] border-t border-white/10 selection:bg-[#E05D36]/30">
                {/* Background Image / Atmosphere */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        initial={{ scale: 1.05 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop')",
                        }}
                    />
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 z-0 bg-black/70 backdrop-blur-[2px]" />
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/95 via-[#111315]/80 to-transparent" />
                <div className="absolute inset-0 z-0 bg-noise opacity-30 mix-blend-overlay" />

                <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">

                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full md:w-1/2 flex flex-col items-start"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-8 h-[1px] bg-[#E05D36]" />
                            <span className="font-sans text-[#E05D36] text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold">
                                News Letter
                            </span>
                        </div>

                        <h2 className="font-serif text-4xl md:text-5xl lg:text-5xl text-white mb-6 tracking-tight leading-[1.1] font-medium">
                            Subscribe Our Newsletter
                        </h2>

                        <p className="font-sans text-gray-400 text-[13px] leading-relaxed max-w-md mb-8 font-light">
                            Lorem ipsum dolor sit amet consectetur. Dolor elit vitae nunc varius. Facilisis eget cras sit semper sit enim. Turpis aliquet id ac eu donec ut.
                        </p>
                    </motion.div>

                    {/* Right: Form Elements */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="w-full md:w-1/2 flex flex-col sm:flex-row gap-0 sm:gap-2 items-end sm:items-center max-w-lg mt-10 md:mt-0"
                    >
                        <form className="w-full flex flex-col sm:flex-row gap-0 shadow-2xl" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative flex-grow group">
                                <div className="absolute inset-0 bg-[#E05D36] opacity-0 group-focus-within:opacity-[0.15] transition-opacity blur-lg" />
                                <input
                                    type="email"
                                    placeholder="Type here"
                                    className="relative w-full h-[60px] bg-[#1a2322]/90 backdrop-blur-md border border-white/5 focus:border-[#E05D36]/50 text-white px-6 outline-none transition-all font-sans text-sm tracking-wide placeholder:text-gray-500 rounded-none sm:rounded-l-sm"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="relative overflow-hidden group bg-[#E05D36] border border-[#E05D36] text-white px-8 h-[60px] text-[11px] tracking-[0.2em] font-bold uppercase transition-all whitespace-nowrap rounded-none sm:rounded-r-sm hover:shadow-[0_0_20px_rgba(224,93,54,0.4)]"
                            >
                                <div className="absolute inset-0 bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out z-0" />
                                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Subscribe</span>
                            </button>
                        </form>
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
                                {/* SVG Logo Placeholder */}
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
                </div>
            </footer>
        </Layout>
    );
}