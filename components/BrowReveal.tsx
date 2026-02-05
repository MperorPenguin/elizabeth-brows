"use client";

import { useEffect, useState } from "react";
import BrowSequence from "./BrowSequence";
import BrowVideoFallback from "./BrowVideoFallback";

export default function BrowReveal() {
    const [useFallback, setUseFallback] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Simple iOS detection
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        // Also check for low power mode if possible (often related to 'hardwareConcurrency' or just simplify to iOS for now)

        if (isIOS) {
            setUseFallback(true);
        }
    }, []);

    if (!isMounted) return null; // Avoid hydration mismatch

    return useFallback ? <BrowVideoFallback /> : <BrowSequence />;
}
