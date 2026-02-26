import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FRAME_COUNT = 240;

export default function BurgerSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Preload images state
    const [images, setImages] = useState<(HTMLImageElement | null)[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(0);

    // Track scroll within this 400vh container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Determine the current frame based on scroll (1 to 240)
    const currentFrame = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

    useEffect(() => {
        // Preload all 240 frames
        const loadedImages: (HTMLImageElement | null)[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            // Expected path: /burger/ezgif-frame-001.jpg
            const paddedIndex = String(i).padStart(3, '0');
            img.src = `/burger/ezgif-frame-${paddedIndex}.jpg`;

            img.onload = () => {
                loadedImages[i] = img;
                loadedCount++;
                setImagesLoaded(loadedCount);
            };
            img.onerror = () => {
                // If missing, we leave it null. We'll draw a dummy placeholder.
                loadedImages[i] = null;
                loadedCount++;
                setImagesLoaded(loadedCount);
            };
        }
        setImages(loadedImages);
    }, []);

    // Draw the correct frame when scroll changes
    useEffect(() => {
        const unsubscribe = currentFrame.on("change", (latestFrame) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const frameIndex = Math.max(1, Math.min(FRAME_COUNT, Math.round(latestFrame)));
            const img = images[frameIndex];

            // Setup canvas bounds
            const width = canvas.width;
            const height = canvas.height;

            if (img) {
                // Draw real image, object-cover style mapping
                const imgAspect = img.width / img.height;
                const canvasAspect = width / height;
                let drawWidth, drawHeight, offsetX, offsetY;

                if (imgAspect > canvasAspect) {
                    drawHeight = height;
                    drawWidth = height * imgAspect;
                    offsetY = 0;
                    offsetX = (width - drawWidth) / 2;
                } else {
                    drawWidth = width;
                    drawHeight = width / imgAspect;
                    offsetX = 0;
                    offsetY = (height - drawHeight) / 2;
                }

                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            } else {
                // Dummy fallback drawing to prove the tech stack works!
                ctx.fillStyle = '#050505';
                ctx.fillRect(0, 0, width, height);

                // Draw a pulsing "Burger Diagram"
                const cx = width / 2;
                const cy = height / 2;
                const progress = frameIndex / FRAME_COUNT;

                // Explode factor: 0 -> 1 -> 0
                const explode = Math.sin(progress * Math.PI);

                ctx.fillStyle = '#151515';
                ctx.beginPath();
                ctx.arc(cx, cy, 300, 0, Math.PI * 2);
                ctx.fill();

                ctx.textAlign = 'center';
                ctx.font = 'bold 2rem sans-serif';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.fillText(`[ Missing Image Sequence: ezgif-frame-${String(frameIndex).padStart(3, '0')}.jpg ]`, cx, cy - 250);

                ctx.font = 'bold 3rem SF Pro Display, Inter, sans-serif';

                // Mock elements expanding
                ctx.fillStyle = '#D10000'; // Red
                ctx.fillText('TOMATO', cx, cy - 100 - (explode * 150));

                ctx.fillStyle = '#FFB000'; // Amber/Cheese
                ctx.fillText('CHEESE', cx, cy - (explode * 50));

                ctx.fillStyle = '#6b5035'; // Patty
                ctx.fillText('PATTY', cx, cy + 50 + (explode * 50));

                ctx.fillStyle = '#e8d2b2'; // Bun
                ctx.fillText('BUN', cx, cy + 150 + (explode * 150));
            }
        });

        // Trigger initial draw
        currentFrame.set(currentFrame.get());
        return () => unsubscribe();
    }, [images, currentFrame]);

    // Resize observer to keep canvas sharp
    useEffect(() => {
        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                // Use window's true dimensions
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                // Force a redraw
                currentFrame.set(currentFrame.get());
            }
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        return () => window.removeEventListener('resize', resizeCanvas);
    }, [currentFrame]);


    // TEXT OPACITY MAPPINGS
    // 0–15% — HERO / INTRO
    const opacityIntro = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.15], [0, 1, 1, 0]);
    const yIntro = useTransform(scrollYProgress, [0, 0.05, 0.15], [30, 0, -30]);

    // 15–40% — INGREDIENT REVEAL
    const opacityReveal = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
    const yReveal = useTransform(scrollYProgress, [0.15, 0.2, 0.4], [30, 0, -30]);

    // 40–65% — FLAVOR ENGINEERING
    const opacityEngineering = useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.65], [0, 1, 1, 0]);
    const yEngineering = useTransform(scrollYProgress, [0.4, 0.45, 0.65], [30, 0, -30]);

    // 65–85% — CULINARY IMMERSION
    const opacityImmersion = useTransform(scrollYProgress, [0.65, 0.7, 0.8, 0.85], [0, 1, 1, 0]);
    const yImmersion = useTransform(scrollYProgress, [0.65, 0.7, 0.85], [30, 0, -30]);

    // 85–100% — REASSEMBLY & CTA
    const opacityOutro = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);
    const yOutro = useTransform(scrollYProgress, [0.85, 0.9, 1], [30, 0, 0]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-[#050505] selection:bg-[#D10000]/30 selection:text-white">

            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">

                {/* Canvas playing the image sequence */}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />

                {/* Subtle Gradient Backing optionally behind hero text */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(21,10,5,0.4)_0%,transparent_60%)] z-10 pointer-events-none" />

                {/* SCROLLING TEXT BEATS */}
                <div className="absolute inset-0 w-full h-full flex z-20 pointer-events-none px-6 md:px-16 container mx-auto">

                    {/* 0-15: Hero */}
                    <motion.div
                        style={{ opacity: opacityIntro, y: yIntro }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                    >
                        <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-bold text-white/90 tracking-tighter mb-6 leading-none">
                            Signature <br /> Gourmet Burger
                        </h2>
                        <p className="text-xl md:text-2xl text-white/60 font-light mb-4">
                            Crafted to perfection.
                        </p>
                        <p className="text-sm md:text-base text-white/40 tracking-widest uppercase">
                            An iconic build, reimagined for true food lovers.
                        </p>
                    </motion.div>

                    {/* 15-40: Ingredient Reveal (Left) */}
                    <motion.div
                        style={{ opacity: opacityReveal, y: yReveal }}
                        className="absolute inset-y-0 left-0 md:left-24 flex flex-col justify-center max-w-sm"
                    >
                        <h3 className="text-3xl md:text-5xl font-bold text-white/90 tracking-tight mb-6">
                            Precision-crafted <br />layers.
                        </h3>
                        <div className="space-y-4 text-white/60 text-lg font-light leading-relaxed">
                            <p>Every ingredient selected for balance and depth.</p>
                            <p>Textures engineered for crunch, juiciness, and melt.</p>
                            <p>A composition built for flavor harmony.</p>
                        </div>
                    </motion.div>

                    {/* 40-65: Flavor Engineering (Right) */}
                    <motion.div
                        style={{ opacity: opacityEngineering, y: yEngineering }}
                        className="absolute inset-y-0 right-0 md:right-24 flex flex-col justify-center max-w-sm text-right"
                    >
                        <h3 className="text-3xl md:text-5xl font-bold text-white/90 tracking-tight mb-6">
                            Flavor, <br />perfected by <br />technique.
                        </h3>
                        <div className="space-y-4 text-white/60 text-lg font-light leading-relaxed">
                            <p>Chef-level sear creates signature umami.</p>
                            <p>Sauces blended for heat, sweetness, and depth.</p>
                            <p>Fresh layers balanced for crunch and contrast.</p>
                        </div>
                    </motion.div>

                    {/* 65-85: Culinary Immersion (Left/Center) */}
                    <motion.div
                        style={{ opacity: opacityImmersion, y: yImmersion }}
                        className="absolute inset-y-0 left-0 md:left-24 flex flex-col justify-center max-w-sm"
                    >
                        <h3 className="text-3xl md:text-5xl font-bold text-white/90 tracking-tight mb-6">
                            An immersive <br />tasting <br />experience.
                        </h3>
                        <div className="space-y-4 text-white/60 text-lg font-light leading-relaxed">
                            <p>Rich, layered flavors in every bite.</p>
                            <p>Ingredients chosen for aroma, freshness, and mouthfeel.</p>
                            <p>A crafted culinary profile that feels alive.</p>
                        </div>
                    </motion.div>

                    {/* 85-100: Outro & CTA (Center) */}
                    <motion.div
                        style={{ opacity: opacityOutro, y: yOutro }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-auto"
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-bold text-white/90 tracking-tighter mb-6 leading-[1.1]">
                            Taste everything. <br />Forget everything else.
                        </h2>
                        <p className="text-xl md:text-2xl text-white/60 font-light mb-12">
                            The Signature Gourmet Burger. Built for flavor, crafted with passion.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
