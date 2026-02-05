"use client";

import { useScroll, useSpring, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";


export default function BrowVideoFallback() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [duration, setDuration] = useState(0);

    // Scroll linkage
    const { scrollYProgress } = useScroll({
        target: wrapperRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Sync video time
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        if (videoRef.current && duration > 0) {
            const time = latest * duration;
            // Clamp time safely
            videoRef.current.currentTime = Math.max(0, Math.min(duration - 0.01, time));
        }
    });

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    return (
        <div ref={wrapperRef} className="h-[400vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F8F2EC]">
                <video
                    ref={videoRef}
                    src="/video/sequence.mp4"
                    poster="/sequence/End-End-frame/frame_000.jpg"
                    className="w-full h-full object-cover" // Video usually covers or contains? "contain-fit function" for sequence. Falback should match. Object-contain?
                    // "Canvas quality + scaling: ... contain-fit function (no cropping on mobile)"
                    // So video should also be object-contain.
                    playsInline
                    muted
                    preload="auto"
                    onLoadedMetadata={handleLoadedMetadata}
                    style={{ objectFit: "contain" }}
                />



            </div>
        </div>
    );
}
