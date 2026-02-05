"use client";

import { useTransform, motion, MotionValue } from "framer-motion";

interface BrowOverlaysProps {
    scrollYProgress: MotionValue<number>;
}

export default function BrowOverlays({ scrollYProgress }: BrowOverlaysProps) {
    // Helper to create fade in/out and Y movement
    // Enter: 20 -> 0 px
    // Exit: 0 -> -20 px

    // Beat timings based on rough equal distribution or specific emphasis
    // Beat 1: Intro (0.0 - 0.2)
    const beat1Op = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]);
    const beat1Y = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [20, 0, 0, -20]);

    // Beat 2: Precision (0.25 - 0.45)
    const beat2Op = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
    const beat2Y = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [20, 0, 0, -20]);

    // Beat 3: Wax/Tint (0.5 - 0.7)
    const beat3Op = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
    const beat3Y = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.7], [20, 0, 0, -20]);

    // Beat 4: CTA (0.75 - 0.95)
    const beat4Op = useTransform(scrollYProgress, [0.75, 0.8, 0.9, 0.95], [0, 1, 1, 0]);
    const beat4Y = useTransform(scrollYProgress, [0.75, 0.8, 0.9, 0.95], [20, 0, 0, -20]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10">
            {/* Beat A: Start (Intro) */}
            <motion.div
                style={{ opacity: beat1Op, y: beat1Y }}
                className="absolute top-[25%] left-1/2 -translate-x-1/2 text-center md:text-left md:left-[15%] md:translate-x-0 max-w-lg p-8 rounded-3xl border border-white/30 bg-[#F8F2EC]/30 backdrop-blur-md shadow-sm"
            >
                <h2 className="text-5xl md:text-7xl font-light text-[#1B1B1B] mb-4 tracking-tighter drop-shadow-sm">
                    Sculpted Brows.
                </h2>
                <p className="text-[#1B1B1B]/70 text-xl md:text-2xl font-light tracking-wide uppercase">Your natural beauty, refined.</p>
            </motion.div>

            {/* Beat B: Left (Precision) */}
            <motion.div
                style={{ opacity: beat2Op, y: beat2Y }}
                className="absolute top-1/2 left-[10%] md:left-[15%] -translate-y-1/2 max-w-md text-left p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10"
            >
                <h2 className="text-3xl md:text-4xl font-light text-[#1B1B1B] mb-2">Precision Brows — £30</h2>
                <p className="text-[#1B1B1B]/80 font-light">Meticulous shaping for perfect symmetry.</p>
            </motion.div>

            {/* Beat C: Right (Wax/Tint) */}
            <motion.div
                style={{ opacity: beat3Op, y: beat3Y }}
                className="absolute top-1/2 right-[10%] md:right-[15%] -translate-y-1/2 max-w-md text-right p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10"
            >
                <h2 className="text-3xl md:text-4xl font-light text-[#1B1B1B] mb-2">Wax — £15 • Tint — £15</h2>
                <p className="text-[#1B1B1B]/80 font-light">Depth and definition that lasts.</p>
            </motion.div>

            {/* Beat D: Center (CTA) */}
            <motion.div
                style={{ opacity: beat4Op, y: beat4Y }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full"
            >
                <h2 className="text-4xl md:text-6xl font-light text-[#1B1B1B] mb-8">Ready to transform?</h2>
                <a href="#book" className="pointer-events-auto inline-block bg-[#1B1B1B] text-[#F8F2EC] px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#A28660] transition-colors duration-300">
                    Book your appointment
                </a>
            </motion.div>
        </div>
    );
}
