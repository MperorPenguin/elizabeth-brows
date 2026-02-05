"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Show loading for a fixed duration to ensure animation plays
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500); // 2.5 seconds total load time

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F8F2EC]"
                >
                    <span className="loader"></span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
