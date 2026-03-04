import { Head, useForm } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import Layout from '@/Components/Layout';
import { useState } from 'react';

export default function Reservation() {
    const [currentStep, setCurrentStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        occasion: '',
        special_requests: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reservation', {
            onSuccess: () => {
                setSubmitted(true);
            },
        });
    };

    const staggeredContainer: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.3,
            },
        },
    };

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 45,
                damping: 18,
            },
        },
    };

    const timeSlots = [
        '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
        '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
        '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM',
        '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM',
    ];

    const occasions = [
        'Birthday Celebration',
        'Anniversary',
        'Business Dinner',
        'Date Night',
        'Family Gathering',
        'Friends Reunion',
        'Other',
    ];

    return (
        <Layout>
            <Head title="Reserve Your Table - TasteNest">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
            </Head>

            {/* Hero Section */}
            <div className="relative min-h-screen bg-[#111315] text-white overflow-hidden selection:bg-[#E05D36]/30 selection:text-white">
                {/* Background Image with Dark Overlay */}
                <motion.div
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')",
                    }}
                />

                {/* Dark Cinematic Overlays */}
                <div className="absolute inset-0 z-0 bg-black/70 backdrop-blur-[2px]" />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#111315] via-[#111315]/80 to-black/80" />
                <div className="absolute inset-0 z-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />

                {/* Ambient Light Effects */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E05D36] rounded-full blur-[150px] opacity-[0.08] pointer-events-none translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-[150px] opacity-[0.03] pointer-events-none -translate-x-1/3 translate-y-1/3" />

                <main className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
                    <motion.div
                        variants={staggeredContainer}
                        initial="hidden"
                        animate="show"
                        className="w-full max-w-6xl mx-auto"
                    >
                        {/* Header Section */}
                        <motion.div variants={fadeInUp} className="text-center mb-10">
                            <div className="flex items-center justify-center gap-3 mb-2">
                                <span className="w-10 h-[1px] bg-[#E05D36]" />
                                <span className="font-sans text-[#E05D36] text-[10px] tracking-[0.35em] uppercase font-bold">
                                    Book Your Experience
                                </span>
                                <span className="w-10 h-[1px] bg-[#E05D36]" />
                            </div>

                            <motion.h1
                                variants={fadeInUp}
                                className="font-serif text-5xl md:text-4xl lg:text-[3rem] leading-[1.05] tracking-tight text-white uppercase  [text-shadow:0_0_40px_rgba(255,255,255,0.3),0_0_20px_rgba(255,255,255,0.15)]"
                            >
                                Reserve Your Table
                            </motion.h1>

                            <motion.p
                                variants={fadeInUp}
                                className="font-sans text-gray-400 text-xs md:text-xs max-w-2xl mx-auto leading-relaxed font-light"
                            >
                                Secure your spot at TasteNest. Whether it's a special occasion or simply a craving for excellence, we're ready to serve you.
                            </motion.p>
                        </motion.div>

                        {/* Reservation Form Container */}
                        <motion.div
                            variants={fadeInUp}
                            className="relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-sm overflow-hidden shadow-2xl"
                        >
                            {/* Form Header Bar */}
                            <div className="relative h-1 bg-gradient-to-r from-[#E05D36] via-[#E05D36] to-transparent" />

                            {/* Progress Indicator */}
                            <div className="flex items-center justify-center gap-2 py-4 px-4 border-b border-white/5">
                                {[1, 2, 3].map((step) => (
                                    <div key={step} className="flex items-center">
                                        <div
                                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold tracking-widest transition-all duration-500 ${
                                                currentStep >= step
                                                    ? 'bg-[#E05D36] text-white shadow-[0_0_20px_rgba(224,93,54,0.4)]'
                                                    : 'bg-white/5 text-gray-500 border border-white/10'
                                            }`}
                                        >
                                            {step}
                                        </div>
                                        {step < 3 && (
                                            <div
                                                className={`w-12 md:w-24 h-[2px] mx-2 transition-all duration-500 ${
                                                    currentStep > step ? 'bg-[#E05D36]' : 'bg-white/10'
                                                }`}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Form Content */}
                            <div className="p-8 md:p-12">
                                {submitted ? (
                                    /* Success State */
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center py-20"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
                                            className="w-24 h-24 rounded-full bg-[#E05D36] flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(224,93,54,0.5)]"
                                        >
                                            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </motion.div>

                                        <motion.h3
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="font-serif text-3xl md:text-4xl text-white uppercase tracking-tight mb-4"
                                        >
                                            Reservation Confirmed
                                        </motion.h3>

                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="font-sans text-gray-400 text-sm text-center max-w-md mb-8 font-light"
                                        >
                                            We've sent a confirmation email to <span className="text-white font-medium">{data.email}</span>. We look forward to hosting you!
                                        </motion.p>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                            className="flex flex-col sm:flex-row gap-4"
                                        >
                                            <button
                                                onClick={() => (window.location.href = '/')}
                                                className="group relative border border-white bg-transparent px-10 py-4 text-xs tracking-[0.2em] font-semibold uppercase text-white transition-all duration-300 hover:text-black overflow-hidden rounded-sm"
                                            >
                                                <span className="relative z-10">Back to Home</span>
                                                <div className="absolute inset-0 bg-white transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out" />
                                            </button>
                                        </motion.div>
                                    </motion.div>
                                ) : (
                                    /* Form Steps */
                                    <form onSubmit={handleSubmit}>
                                        {/* Step 1: Date & Time */}
                                        {currentStep === 1 && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-8"
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* Date */}
                                                    <div className="relative group">
                                                        <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-3">
                                                            Select Date
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                type="date"
                                                                value={data.date}
                                                                onChange={(e) => setData('date', e.target.value)}
                                                                className="w-full h-[60px] bg-[#1a1a1a] border border-white/10 focus:border-[#E05D36] text-white px-5 outline-none transition-all font-sans text-sm tracking-wide rounded-sm"
                                                                required
                                                            />
                                                            <div className="absolute inset-0 bg-[#E05D36] opacity-0 group-focus-within:opacity-[0.08] transition-opacity blur-lg pointer-events-none" />
                                                        </div>
                                                        {errors.date && <p className="text-[#E05D36] text-xs mt-2">{errors.date}</p>}
                                                    </div>

                                                    {/* Time */}
                                                    <div className="relative group">
                                                        <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-3">
                                                            Select Time
                                                        </label>
                                                        <select
                                                            value={data.time}
                                                            onChange={(e) => setData('time', e.target.value)}
                                                            className="w-full h-[60px] bg-[#1a1a1a] border border-white/10 focus:border-[#E05D36] text-white px-5 outline-none transition-all font-sans text-sm tracking-wide rounded-sm appearance-none cursor-pointer"
                                                            required
                                                        >
                                                            <option value="">Choose a time slot</option>
                                                            {timeSlots.map((slot) => (
                                                                <option key={slot} value={slot}>
                                                                    {slot}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                        <div className="absolute inset-0 bg-[#E05D36] opacity-0 group-focus-within:opacity-[0.08] transition-opacity blur-lg pointer-events-none" />
                                                        {errors.time && <p className="text-[#E05D36] text-xs mt-2">{errors.time}</p>}
                                                    </div>
                                                </div>

                                                {/* Time Slots Grid */}
                                                <div>
                                                    <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-4">
                                                        Available Time Slots
                                                    </label>
                                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                                        {timeSlots.map((slot) => (
                                                            <button
                                                                key={slot}
                                                                type="button"
                                                                onClick={() => setData('time', slot)}
                                                                className={`h-[50px] text-[10px] tracking-[0.1em] font-semibold uppercase transition-all duration-300 rounded-sm ${
                                                                    data.time === slot
                                                                        ? 'bg-[#E05D36] text-white shadow-[0_0_15px_rgba(224,93,54,0.4)]'
                                                                        : 'bg-[#1a1a1a] text-gray-400 border border-white/5 hover:border-[#E05D36]/50 hover:text-white'
                                                                }`}
                                                            >
                                                                {slot}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Guests */}
                                                <div className="relative group">
                                                    <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-3">
                                                        Number of Guests
                                                    </label>
                                                    <div className="flex gap-3">
                                                        {[1, 2, 3, 4, 5, 6, '7+'].map((num) => (
                                                            <button
                                                                key={num}
                                                                type="button"
                                                                onClick={() => setData('guests', num.toString())}
                                                                className={`flex-1 h-[55px] text-sm font-semibold transition-all duration-300 rounded-sm ${
                                                                    data.guests === num.toString()
                                                                        ? 'bg-[#E05D36] text-white shadow-[0_0_15px_rgba(224,93,54,0.4)]'
                                                                        : 'bg-[#1a1a1a] text-gray-400 border border-white/5 hover:border-[#E05D36]/50 hover:text-white'
                                                                }`}
                                                            >
                                                                {num}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Next Button */}
                                                <div className="flex justify-end pt-6">
                                                    <button
                                                        type="button"
                                                        onClick={() => setCurrentStep(2)}
                                                        disabled={!data.date || !data.time}
                                                        className="group relative bg-[#E05D36] border border-[#E05D36] px-12 py-4 text-xs tracking-[0.2em] font-semibold uppercase text-white transition-all duration-300 overflow-hidden rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_25px_rgba(224,93,54,0.5)]"
                                                    >
                                                        <span className="relative z-10 flex items-center gap-3">
                                                            Next Step
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                            </svg>
                                                        </span>
                                                        <div className="absolute inset-0 bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Step 2: Personal Information */}
                                        {currentStep === 2 && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* Name */}
                                                    <div className="relative group">
                                                        <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-3">
                                                            Full Name
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                value={data.name}
                                                                onChange={(e) => setData('name', e.target.value)}
                                                                placeholder="John Doe"
                                                                className="w-full h-[60px] bg-[#1a1a1a] border border-white/10 focus:border-[#E05D36] text-white px-5 outline-none transition-all font-sans text-sm tracking-wide placeholder:text-gray-600 rounded-sm"
                                                                required
                                                            />
                                                            <div className="absolute inset-0 bg-[#E05D36] opacity-0 group-focus-within:opacity-[0.08] transition-opacity blur-lg pointer-events-none" />
                                                        </div>
                                                        {errors.name && <p className="text-[#E05D36] text-xs mt-2">{errors.name}</p>}
                                                    </div>

                                                    {/* Email */}
                                                    <div className="relative group">
                                                        <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-3">
                                                            Email Address
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                type="email"
                                                                value={data.email}
                                                                onChange={(e) => setData('email', e.target.value)}
                                                                placeholder="john@example.com"
                                                                className="w-full h-[60px] bg-[#1a1a1a] border border-white/10 focus:border-[#E05D36] text-white px-5 outline-none transition-all font-sans text-sm tracking-wide placeholder:text-gray-600 rounded-sm"
                                                                required
                                                            />
                                                            <div className="absolute inset-0 bg-[#E05D36] opacity-0 group-focus-within:opacity-[0.08] transition-opacity blur-lg pointer-events-none" />
                                                        </div>
                                                        {errors.email && <p className="text-[#E05D36] text-xs mt-2">{errors.email}</p>}
                                                    </div>
                                                </div>

                                                {/* Phone */}
                                                <div className="relative group">
                                                    <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-3">
                                                        Phone Number
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="tel"
                                                            value={data.phone}
                                                            onChange={(e) => setData('phone', e.target.value)}
                                                            placeholder="+1 (555) 000-0000"
                                                            className="w-full h-[60px] bg-[#1a1a1a] border border-white/10 focus:border-[#E05D36] text-white px-5 outline-none transition-all font-sans text-sm tracking-wide placeholder:text-gray-600 rounded-sm"
                                                            required
                                                        />
                                                        <div className="absolute inset-0 bg-[#E05D36] opacity-0 group-focus-within:opacity-[0.08] transition-opacity blur-lg pointer-events-none" />
                                                    </div>
                                                    {errors.phone && <p className="text-[#E05D36] text-xs mt-2">{errors.phone}</p>}
                                                </div>

                                                {/* Occasion */}
                                                <div className="relative group">
                                                    <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-3">
                                                        Special Occasion (Optional)
                                                    </label>
                                                    <div className="relative">
                                                        <select
                                                            value={data.occasion}
                                                            onChange={(e) => setData('occasion', e.target.value)}
                                                            className="w-full h-[60px] bg-[#1a1a1a] border border-white/10 focus:border-[#E05D36] text-white px-5 outline-none transition-all font-sans text-sm tracking-wide rounded-sm appearance-none cursor-pointer"
                                                        >
                                                            <option value="">Select an occasion</option>
                                                            {occasions.map((occ) => (
                                                                <option key={occ} value={occ}>
                                                                    {occ}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                        <div className="absolute inset-0 bg-[#E05D36] opacity-0 group-focus-within:opacity-[0.08] transition-opacity blur-lg pointer-events-none" />
                                                    </div>
                                                </div>

                                                {/* Navigation Buttons */}
                                                <div className="flex justify-between pt-6 gap-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => setCurrentStep(1)}
                                                        className="group relative border border-white bg-transparent px-10 py-4 text-xs tracking-[0.2em] font-semibold uppercase text-white transition-all duration-300 hover:text-black overflow-hidden rounded-sm"
                                                    >
                                                        <span className="relative z-10 flex items-center gap-3">
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                            </svg>
                                                            Back
                                                        </span>
                                                        <div className="absolute inset-0 bg-white transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => setCurrentStep(3)}
                                                        disabled={!data.name || !data.email || !data.phone}
                                                        className="group relative bg-[#E05D36] border border-[#E05D36] px-12 py-4 text-xs tracking-[0.2em] font-semibold uppercase text-white transition-all duration-300 overflow-hidden rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_25px_rgba(224,93,54,0.5)]"
                                                    >
                                                        <span className="relative z-10 flex items-center gap-3">
                                                            Next Step
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                            </svg>
                                                        </span>
                                                        <div className="absolute inset-0 bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Step 3: Special Requests & Confirmation */}
                                        {currentStep === 3 && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-8"
                                            >
                                                {/* Reservation Summary */}
                                                <div className="bg-[#1a1a1a] border border-white/5 p-6 rounded-sm">
                                                    <h4 className="font-serif text-lg text-white uppercase tracking-wide mb-4 flex items-center gap-3">
                                                        <svg className="w-5 h-5 text-[#E05D36]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                        </svg>
                                                        Reservation Summary
                                                    </h4>
                                                    <div className="grid grid-cols-2 gap-4 text-xs">
                                                        <div>
                                                            <span className="text-gray-500 block mb-1">Date</span>
                                                            <span className="text-white font-medium">{data.date || '—'}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500 block mb-1">Time</span>
                                                            <span className="text-white font-medium">{data.time || '—'}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500 block mb-1">Guests</span>
                                                            <span className="text-white font-medium">{data.guests} people</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500 block mb-1">Occasion</span>
                                                            <span className="text-white font-medium">{data.occasion || '—'}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Special Requests */}
                                                <div className="relative group">
                                                    <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-3">
                                                        Special Requests (Optional)
                                                    </label>
                                                    <div className="relative">
                                                        <textarea
                                                            value={data.special_requests}
                                                            onChange={(e) => setData('special_requests', e.target.value)}
                                                            placeholder="Dietary restrictions, allergies, seating preferences, or any special requests..."
                                                            rows={5}
                                                            className="w-full bg-[#1a1a1a] border border-white/10 focus:border-[#E05D36] text-white px-5 py-4 outline-none transition-all font-sans text-sm tracking-wide placeholder:text-gray-600 rounded-sm resize-none"
                                                        />
                                                        <div className="absolute inset-0 bg-[#E05D36] opacity-0 group-focus-within:opacity-[0.08] transition-opacity blur-lg pointer-events-none" />
                                                    </div>
                                                </div>

                                                {/* Terms */}
                                                <div className="flex items-start gap-3">
                                                    <input
                                                        type="checkbox"
                                                        id="terms"
                                                        className="mt-1 w-4 h-4 bg-[#1a1a1a] border border-white/10 text-[#E05D36] focus:ring-[#E05D36] focus:ring-offset-0 rounded-sm cursor-pointer"
                                                        required
                                                    />
                                                    <label htmlFor="terms" className="font-sans text-[10px] text-gray-400 leading-relaxed">
                                                        I agree to the{' '}
                                                        <a href="#" className="text-[#E05D36] hover:text-white transition-colors">
                                                            Terms & Conditions
                                                        </a>{' '}
                                                        and{' '}
                                                        <a href="#" className="text-[#E05D36] hover:text-white transition-colors">
                                                            Privacy Policy
                                                        </a>
                                                        . I understand that my reservation will be held for 15 minutes past the reserved time.
                                                    </label>
                                                </div>

                                                {/* Navigation Buttons */}
                                                <div className="flex justify-between pt-6 gap-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => setCurrentStep(2)}
                                                        className="group relative border border-white bg-transparent px-10 py-4 text-xs tracking-[0.2em] font-semibold uppercase text-white transition-all duration-300 hover:text-black overflow-hidden rounded-sm"
                                                    >
                                                        <span className="relative z-10 flex items-center gap-3">
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                            </svg>
                                                            Back
                                                        </span>
                                                        <div className="absolute inset-0 bg-white transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out" />
                                                    </button>

                                                    <button
                                                        type="submit"
                                                        disabled={processing}
                                                        className="group relative bg-[#E05D36] border border-[#E05D36] px-12 py-4 text-xs tracking-[0.2em] font-semibold uppercase text-white transition-all duration-300 overflow-hidden rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_25px_rgba(224,93,54,0.5)]"
                                                    >
                                                        <span className="relative z-10 flex items-center gap-3">
                                                            {processing ? (
                                                                <>
                                                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                                    </svg>
                                                                    Processing...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    Confirm Reservation
                                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                </>
                                                            )}
                                                        </span>
                                                        <div className="absolute inset-0 bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </form>
                                )}
                            </div>
                        </motion.div>

                        {/* Additional Info */}
                        <motion.div
                            variants={fadeInUp}
                            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
                        >
                            {[
                                {
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    ),
                                    title: 'Instant Confirmation',
                                    desc: 'Receive immediate booking confirmation via email',
                                },
                                {
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    ),
                                    title: 'Safe Dining',
                                    desc: 'We follow strict hygiene and safety protocols',
                                },
                                {
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    ),
                                    title: '24/7 Support',
                                    desc: 'Contact us anytime for modifications or questions',
                                },
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 + idx * 0.1 }}
                                    className="flex flex-col items-center gap-3 p-4"
                                >
                                    <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-[#E05D36]">
                                        {item.icon}
                                    </div>
                                    <h4 className="font-sans text-[10px] tracking-[0.15em] uppercase text-white font-bold">
                                        {item.title}
                                    </h4>
                                    <p className="font-sans text-gray-500 text-[11px] leading-relaxed font-light">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </main>
            </div>
        </Layout>
    );
}
