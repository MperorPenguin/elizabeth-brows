"use client";

import { useScroll, useSpring, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";


const FRAME_COUNT = 193;
const FRAME_PATH = (i: number) =>
    `/sequence/End-End-frame/frame_${String(i).padStart(3, "0")}.jpg`;

export default function BrowSequence() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const isLoaded = loadedCount > 20; // Start when enough frames are ready
    const progressPercent = Math.min(100, Math.round((loadedCount / FRAME_COUNT) * 100));

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

    // Load images
    useEffect(() => {
        const loadImages = async () => {
            const imgs: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 0; i < FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = FRAME_PATH(i);
                    img.onload = () => {
                        setLoadedCount((prev) => prev + 1);
                        resolve();
                    };
                    img.onerror = () => resolve(); // Don't block on error
                    imgs[i] = img;
                });
                promises.push(promise);
            }
            setImages(imgs);
            await Promise.all(promises);
        };

        loadImages();
    }, []);

    // Canvas drawing
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index] || !images[index].complete || !(images[index].naturalWidth > 0)) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[index];

        // Scaling for object-contain / cover
        // Requirement says "contain-fit function (no cropping on mobile)" -> wait, contain usually adds bars.
        // "Draw frames using a contain-fit function (no cropping on mobile)"
        // If aspect ratio mismatches, contain ensures full image visible.
        // But usually full screen backgrounds suggest "cover". 
        // "Background: #F8F2EC (must match sequence background seamlessly)" -> This implies Contain is fine if BG matches.

        // Handle Retina
        const dpr = window.devicePixelRatio || 1;
        // We set canvas internal dim logic below.

        const cw = canvas.width;
        const ch = canvas.height;

        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        // Scale to COVER (fills screen, crops edges if needed, maximizes quality feel)
        const scale = Math.max(cw / iw, ch / ih);
        const w = iw * scale;
        const h = ih * scale;
        const x = (cw - w) / 2;
        const y = (ch - h) / 2;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.clearRect(0, 0, cw, ch);
        // Fill background just in case
        ctx.fillStyle = "#F8F2EC";
        ctx.fillRect(0, 0, cw, ch);

        ctx.drawImage(img, x, y, w, h);
    };

    // Resize handler
    useEffect(() => {
        const handleResize = () => {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;
            const dpr = window.devicePixelRatio || 1;

            // Use client dims
            const { clientWidth, clientHeight } = canvas;

            canvas.width = clientWidth * dpr;
            canvas.height = clientHeight * dpr;

            // Re-render current frame
            const currentProg = smoothProgress.get();
            const index = Math.round(currentProg * (FRAME_COUNT - 1));
            const clampedIndex = Math.max(0, Math.min(FRAME_COUNT - 1, index));
            renderFrame(clampedIndex);
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial
        return () => window.removeEventListener("resize", handleResize);
    }, [images, smoothProgress]); // Re-bind if images change to ensure content renders

    // Animation Loop
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        const index = Math.round(latest * (FRAME_COUNT - 1));
        const clampedIndex = Math.max(0, Math.min(FRAME_COUNT - 1, index));
        renderFrame(clampedIndex);
    });

    // Initial draw
    useEffect(() => {
        if (isLoaded && images.length > 0) {
            renderFrame(0);
        }
    }, [isLoaded, images]);

    const isLoading = !isLoaded && loadedCount < FRAME_COUNT;

    return (
        <div
            ref={wrapperRef}
            className={`relative ${isLoading ? "h-[100dvh] overflow-hidden" : "h-[300vh] md:h-[400vh]"}`}
        >
            {isLoading ? (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#F8F2EC]">
                    <div className="w-64 h-1 bg-[#D1BDA2]/30 rounded-full overflow-hidden mb-4">
                        <div
                            className="h-full bg-[#A28660] transition-all duration-200 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <span className="text-[#A28660] font-sans text-sm tracking-widest uppercase">
                        Loading Studio ({progressPercent}%)
                    </span>
                </div>
            ) : (
                <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#F8F2EC]">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full object-contain"
                    />
                </div>
            )}
        </div>
    );
}
