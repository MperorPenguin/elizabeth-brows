"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="h-screen w-full flex items-center justify-center bg-[#F8F2EC] relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center z-10"
            >
                <h1 className="text-6xl md:text-8xl font-light text-[#1B1B1B] mb-4 tracking-tighter">
                    SCULPT
                </h1>
                <p className="text-[#1B1B1B]/60 text-xl tracking-widest uppercase">
                    By Elizabeth
                </p>
            </motion.div>
        </section>
    );
}
