import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';
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
    size_options?: string;
    addons?: string;
}

interface Category {
    id: number;
    name: string;
    description: string;
    status: string;
}

export default function DishMenu() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    axios.get('/api/products', {
                        headers: {
                            'Cache-Control': 'no-cache',
                            'Pragma': 'no-cache'
                        },
                        params: {
                            _t: Date.now() // Cache busting
                        }
                    }),
                    axios.get('/api/categories', {
                        headers: {
                            'Cache-Control': 'no-cache',
                            'Pragma': 'no-cache'
                        },
                        params: {
                            _t: Date.now() // Cache busting
                        }
                    })
                ]);

                // Filter only available products and deduplicate by id
                const availableProducts = productsRes.data
                    .filter((p: Product) => p.status === 'Available')
                    .filter((p: Product, index: number, self: Product[]) => 
                        index === self.findIndex((p2) => p2.id === p.id)
                    );
                setProducts(availableProducts);
                
                // Deduplicate categories
                const uniqueCategories = categoriesRes.data
                    .filter((c: Category) => c.status === 'Active')
                    .filter((c: Category, index: number, self: Category[]) =>
                        index === self.findIndex((c2) => c2.id === c.id)
                    );
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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

    // Group products by category
    const groupedProducts = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {} as Record<string, Product[]>);

    // Get unique categories from products, ordered by admin categories order field
    const productCategories = Object.keys(groupedProducts);
    const sortedCategories = categories
        .sort((a, b) => (a.order || 0) - (b.order || 0)) // Sort by order field
        .filter(c => productCategories.includes(c.name))
        .map(c => c.name);
    
    // Add any categories that exist in products but not in admin categories (fallback)
    productCategories.forEach(cat => {
        if (!sortedCategories.includes(cat)) {
            sortedCategories.push(cat);
        }
    });

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
                    {/* Page Header */}
                    <motion.div
                        variants={staggeredContainer}
                        initial="hidden"
                        animate="show"
                        className="text-center mb-16"
                    >
                        <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-[1px] w-12 bg-[#E05D36]" />
                            <span className="text-[#E05D36] text-xs tracking-[0.3em] font-semibold uppercase">
                                Discover Our Flavors
                            </span>
                            <div className="h-[1px] w-12 bg-[#E05D36]" />
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="font-serif text-4xl md:text-5xl text-white uppercase tracking-tight mb-4"
                        >
                            Our Menu
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-gray-400 text-sm max-w-xl mx-auto">
                            Crafted with passion, served with pride. Explore our carefully curated selection of dishes.
                        </motion.p>
                    </motion.div>

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

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-gray-400 text-sm">Loading menu...</div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="text-gray-400 text-sm">No products available at the moment.</div>
                        </div>
                    ) : (
                        /* Categorized Menu */
                        <div id="menu" className="space-y-20">
                            {sortedCategories.map((category) => (
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
                                            <h2 className="font-serif text-3xl text-white uppercase tracking-tight">
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
                                        {groupedProducts[category].map((product) => (
                                            <motion.div
                                                key={product.id}
                                                variants={fadeInUp}
                                                className="group relative overflow-hidden bg-[#1a1a1a] border border-white/5 hover:border-[#E05D36]/50 transition-all duration-500 h-full"
                                            >
                                                {/* Image */}
                                                <div className="relative h-48 overflow-hidden">
                                                    {product.image ? (
                                                        <img
                                                            src={`/storage/${product.image}`}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                                                            <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                                                </div>

                                                {/* Content */}
                                                <div className="p-6 flex flex-col flex-grow relative z-30 -mt-4">
                                                    <h3 className="font-serif text-lg text-[#E05D36] mb-1 font-semibold tracking-wide group-hover:text-white transition-colors duration-500">
                                                        {product.name}
                                                    </h3>

                                                    <p className="font-sans text-xs text-gray-500 mb-4 line-clamp-2">
                                                        {product.description || 'No description available'}
                                                    </p>

                                                    <div className="flex items-center gap-2 mb-6">
                                                        <span className="font-sans text-lg text-white font-semibold">${parseFloat(product.price).toFixed(2)}</span>
                                                    </div>

                                                    <Link href={`/product/${product.id}`} className="relative overflow-hidden group/btn bg-[#E05D36] text-white px-6 py-2 w-fit text-[10px] tracking-[0.2em] font-semibold uppercase transition-colors block text-center">
                                                        <span className="relative z-10">View Details</span>
                                                        <div className="absolute inset-0 bg-[#C8502D] scale-x-0 origin-left group-hover/btn:scale-x-100 transition-transform duration-300" />
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    )}

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
