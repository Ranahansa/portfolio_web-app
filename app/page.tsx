'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Caveat } from 'next/font/google';
import moonImage from '../public/moon.jpg';
import hero from '../public/superhero.png';
import cloudImage from '../public/cloud1.png';
import { saveAs } from 'file-saver';

const caveat = Caveat({ subsets: ["latin"], weight: "700" });

// Deterministic pseudo-random values so server and client render identical
// markup (Math.random() here would cause a hydration mismatch).
const seeded = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const STARS = Array.from({ length: 50 }).map((_, i) => ({
  top: `${(seeded(i + 1) * 100).toFixed(2)}%`,
  left: `${(seeded(i + 101) * 100).toFixed(2)}%`,
  size: `${(2 + seeded(i + 201) * 4).toFixed(1)}px`,
  delay: `${(seeded(i + 301) * 3).toFixed(2)}s`,
  duration: `${(1.2 + seeded(i + 401) * 1.8).toFixed(2)}s`,
}));

const Home = () => {
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleResumeDownload = () => {
    if (loading) return;
    setLoading(true);
    saveAs('/resume.pdf', 'Pathum-Ranahansa-Resume.pdf');
    timeoutRef.current = setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 md:px-12">
      <section className="relative bg-gray-900 text-white py-16 md:py-32 rounded-2xl mt-3 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={moonImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-50"
            priority
          />
        </div>

        <div className="stars" aria-hidden="true">
          {STARS.map((star, index) => (
            <div
              key={index}
              className="star"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                animationDelay: star.delay,
                animationDuration: star.duration,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Pathum <span className="text-blue-500">Ranahansa</span>
              </h1>
              <p className="text-lg md:text-xl mb-10">
                Discover the power of our cutting-edge portfolio solutions and
                transform your digital footprint.
              </p>
              <button
                type="button"
                className={`inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleResumeDownload}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loader" aria-hidden="true"></span>
                    <span className="ml-2">Downloading...</span>
                  </>
                ) : (
                  'Download Resume'
                )}
              </button>
            </div>

            {/* mt-16 on mobile leaves room for the dialogue cloud above the image */}
            <div className="relative flex justify-center mt-16 md:mt-0">
              <motion.div
                className="relative w-full max-w-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                {/* Offset backdrop card */}
                <div
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-gradient-to-r from-gray-800 to-gray-600 opacity-60"
                  aria-hidden="true"
                />
                <div className="relative z-10">
                  <Image
                    src={hero}
                    alt="Illustration of a developer working on a laptop"
                    className="w-full h-auto drop-shadow-xl"
                    sizes="(min-width: 768px) 28rem, 100vw"
                    priority
                  />
                  <div className="absolute -top-14 md:-top-[70px] right-0 md:-right-4 w-40 md:w-48 aspect-[800/679] pointer-events-none">
                    <Image
                      src={cloudImage}
                      alt=""
                      fill
                      sizes="12rem"
                      className="object-contain"
                    />
                    <motion.div
                      className={`absolute inset-x-0 top-[12%] h-[52%] flex items-center justify-center whitespace-nowrap text-black text-xl md:text-2xl font-extrabold ${caveat.className}`}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      🖐🏿 Hi There..!
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
