import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function DishMenu() {
    return (
        <>
            <Head title="Our Menu - TasteNest" />

            <div className="min-h-screen bg-[#111315] text-white font-sans p-8">
                <h1 className="text-4xl font-serif mb-6">Dish Menu</h1>

                <p className="mb-8">Coming soon! Browse our selection of curated dishes.</p>

                <Link
                    href="/"
                    className="inline-block bg-[#E05D36] hover:bg-[#C8502D] text-white text-xs tracking-[0.2em] font-medium uppercase px-8 py-3 transition-colors rounded-sm"
                >
                    Back to Home
                </Link>
            </div>
        </>
    );
}
